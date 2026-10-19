#!/usr/bin/env node
import { readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_FILE = path.join(ROOT, "data", "open-source-contributions.json");
const CONFIG_FILE = path.join(ROOT, "scripts", "open-source-organizations.json");
const REST_URL = "https://api.github.com";
const ACCOUNT_LOGIN = "reginaldalfret";
const API_VERSION = "2022-11-28";

const DEFAULT_THEME = {
  accent: "#67E8F9",
  borderGlow: "rgba(103,232,249,0.28)",
  gradient: "from-cyan-500/10 via-sky-600/5 to-transparent",
  textColor: "text-cyan-300",
  badgeBg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function headersFor(token, extra = {}) {
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": API_VERSION,
    "User-Agent": "reginaldalfret-portfolio-open-source-sync",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

export async function requestJson(url, options = {}, { token = "", fetchImpl = fetch, retries = 3 } = {}) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetchImpl(url, {
        ...options,
        headers: headersFor(token, options.headers ?? {}),
        signal: options.signal ?? AbortSignal.timeout(20_000),
      });
      if (response.ok) return await response.json();

      const remaining = response.headers?.get?.("x-ratelimit-remaining");
      const body = await response.text().catch(() => "");
      const error = new Error(
        response.status === 403 && remaining === "0"
          ? "GitHub API rate limit reached. Use a token with public-repository read access or retry after the reset."
          : `GitHub API request failed (${response.status}): ${body.slice(0, 300)}`
      );
      error.rateLimited = response.status === 429 || (response.status === 403 && remaining === "0");
      error.retryable = error.rateLimited || response.status >= 500;
      lastError = error;
      if (!error.retryable || attempt === retries) throw error;

      const retryAfter = Number(response.headers?.get?.("retry-after"));
      const delay = Number.isFinite(retryAfter) && retryAfter > 0
        ? Math.min(retryAfter * 1000, 10_000)
        : Math.min(750 * (2 ** attempt), 5_000);
      await sleep(delay);
    } catch (error) {
      if (error?.name === "AbortError" || error?.name === "TimeoutError") {
        lastError = new Error("GitHub API request timed out.");
      } else {
        lastError = error;
      }
      if (error?.rateLimited || error?.retryable === false) throw error;
      if (attempt === retries) throw lastError;
      await sleep(Math.min(500 * (2 ** attempt), 3_000));
    }
  }
  throw lastError ?? new Error("GitHub API request failed.");
}

export function normalizeRepositoryName(value = "") {
  return String(value).trim().replace(/^https?:\/\/github\.com\//i, "").replace(/\.git$/i, "").replace(/^\/+|\/+$/g, "").toLowerCase();
}

export function shouldExcludeRepository(repositoryFullName, config) {
  const normalized = normalizeRepositoryName(repositoryFullName);
  const [owner = "", repoName = ""] = normalized.split("/");
  const excludedOwners = (config.excludedOwners ?? []).map((item) => item.toLowerCase());
  const excludedNames = (config.excludedRepositoryNames ?? []).map((item) => item.toLowerCase());
  const excludedRepositories = (config.excludedRepositoryFullNames ?? []).map(normalizeRepositoryName);
  return (
    owner === (config.accountLogin ?? ACCOUNT_LOGIN).toLowerCase() ||
    excludedOwners.includes(owner) ||
    excludedNames.includes(repoName) ||
    excludedRepositories.includes(normalized)
  );
}

export function normalizePullRequest(raw) {
  const repositoryFullName =
    raw?.repository?.nameWithOwner ??
    raw?.base?.repo?.full_name ??
    raw?.base?.repo?.fullName ??
    raw?.repository_full_name ??
    "";
  const [ownerFromName = ""] = String(repositoryFullName).split("/");
  const ownerLogin =
    raw?.repository?.owner?.login ??
    raw?.base?.repo?.owner?.login ??
    ownerFromName;
  const authorLogin = raw?.author?.login ?? raw?.user?.login ?? "";
  const mergedAt = raw?.mergedAt ?? raw?.merged_at ?? null;
  const state = String(raw?.state ?? "").toLowerCase();
  const mergedFlag = typeof raw?.isMerged === "boolean"
    ? raw.isMerged
    : typeof raw?.merged === "boolean"
      ? raw.merged
      : Boolean(mergedAt);
  const labelSource = raw?.labels?.nodes ?? raw?.labels ?? [];
  const labels = Array.isArray(labelSource)
    ? labelSource.map((label) => typeof label === "string" ? label : label?.name).filter(Boolean)
    : [];
  const number = Number(raw?.number ?? raw?.issue_number ?? 0);
  const url = raw?.url?.startsWith?.("https://github.com/")
    ? raw.url
    : raw?.html_url ?? raw?.display_url ?? "";

  return {
    number,
    title: String(raw?.title ?? "").trim(),
    body: typeof raw?.body === "string" ? raw.body : "",
    url,
    state,
    merged: mergedFlag && Boolean(mergedAt),
    mergedAt,
    authorLogin: String(authorLogin),
    repositoryFullName: String(repositoryFullName),
    repositoryUrl: raw?.repository?.url ?? `https://github.com/${repositoryFullName}`,
    ownerLogin: String(ownerLogin),
    labels,
  };
}

export function isEligiblePullRequest(pr, config) {
  return Boolean(
    pr &&
    Number.isInteger(pr.number) &&
    pr.number > 0 &&
    pr.title &&
    pr.url &&
    pr.merged &&
    pr.mergedAt &&
    pr.state === "closed" &&
    pr.authorLogin.toLowerCase() === (config.accountLogin ?? ACCOUNT_LOGIN).toLowerCase() &&
    pr.repositoryFullName.includes("/") &&
    !shouldExcludeRepository(pr.repositoryFullName, config)
  );
}

function slug(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "open-source";
}

function displayNameFor(pr, config) {
  const repositoryKey = normalizeRepositoryName(pr.repositoryFullName);
  const ownerKey = pr.ownerLogin.toLowerCase();
  return config.repositoryDisplayNames?.[repositoryKey] ??
    config.repositoryDisplayNames?.[pr.repositoryFullName] ??
    config.ownerDisplayNames?.[ownerKey] ??
    ownerKey.split("-").filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function logoKeyFor(pr, config) {
  return config.ownerLogoKeys?.[pr.ownerLogin.toLowerCase()] ?? slug(pr.ownerLogin);
}

function organizationUrlFor(pr, config) {
  return config.ownerOrganizationUrls?.[pr.ownerLogin.toLowerCase()] ??
    `https://github.com/${encodeURIComponent(pr.ownerLogin)}`;
}

function categoryFor(title, labels = []) {
  const text = `${title} ${labels.join(" ")}`.toLowerCase();
  if (/\b(doc|docs|documentation|readme|typo|wording)\b/.test(text)) return "DOCS";
  if (/\b(fix|bug|regression|crash|exception|error|incorrect|false positive)\b/.test(text)) return "BUG FIX";
  if (/\b(test|tests|testing|spec|assertion|unit test)\b/.test(text)) return "TEST";
  if (/\b(infra|infrastructure|ci|workflow|pipeline|deploy|docker|environment|runner)\b/.test(text)) return "INFRA";
  if (/\b(build|packag|dependency|dependencies|wheel|nuget|release|version|podspec)\b/.test(text)) return "BUILD";
  return "MAINTENANCE";
}

function descriptionFromBody(body, title) {
  const candidates = String(body ?? "")
    .replace(/\r/g, "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph
      .replace(/^\s{0,3}#{1,6}\s*/gm, "")
      .replace(/<!--[^]*?-->/g, " ")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_`>#]/g, "")
      .replace(/^\s*[-*+]\s+/gm, "")
      .replace(/\s+/g, " ")
      .trim())
    .filter((paragraph) =>
      paragraph.length >= 35 &&
      !/^(description|summary|related issue|checklist|what does this pr do\??|pr checklist)\s*$/i.test(paragraph) &&
      !/^[-=*_]{3,}$/.test(paragraph)
    );
  const description = candidates[0] ?? title;
  return description.length > 220 ? `${description.slice(0, 217).trimEnd()}…` : description;
}

function displayDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function identityKey(repository, number) {
  return `${normalizeRepositoryName(repository)}#${Number(number)}`;
}

function findExistingRecord(records, pr) {
  const exact = records.findIndex((item) => identityKey(item.repository, item.prNumber) === identityKey(pr.repositoryFullName, pr.number));
  if (exact >= 0) return exact;

  // Repositories can be transferred. Match a transferred PR only when both its number and title match.
  const title = pr.title.trim().toLowerCase();
  return records.findIndex((item) =>
    Number(item.prNumber) === pr.number &&
    String(item.title).trim().toLowerCase() === title &&
    String(item.url).endsWith(`/pull/${pr.number}`)
  );
}

export function makeContribution(pr, previous, config) {
  const [owner = "", repoName = ""] = pr.repositoryFullName.split("/");
  const repoKey = normalizeRepositoryName(pr.repositoryFullName);
  const canonicalUrl = pr.url || `https://github.com/${pr.repositoryFullName}/pull/${pr.number}`;
  const mergedAt = new Date(pr.mergedAt).toISOString();
  const description = previous?.contribution ?? previous?.description ?? descriptionFromBody(pr.body, pr.title);
  return {
    ...(previous ?? {}),
    id: previous?.id ?? `${slug(owner)}-${slug(repoName)}-${pr.number}`,
    organization: previous?.organization ?? displayNameFor(pr, config),
    orgKey: previous?.orgKey ?? logoKeyFor(pr, config),
    organizationUrl: previous?.organizationUrl ?? organizationUrlFor(pr, config),
    repository: pr.repositoryFullName,
    repositoryUrl: pr.repositoryUrl || `https://github.com/${pr.repositoryFullName}`,
    prNumber: pr.number,
    title: pr.title,
    url: canonicalUrl,
    status: "merged",
    statusLabel: "Merged",
    category: previous?.category ?? categoryFor(pr.title, pr.labels),
    contribution: description,
    description,
    labels: pr.labels,
    date: mergedAt,
    mergedAt,
    displayDate: displayDate(mergedAt),
    isFeatured: Boolean(previous?.isFeatured),
    theme: previous?.theme ?? DEFAULT_THEME,
  };
}

export function mergeContributionData(existing, pullRequests, config) {
  const contributions = existing.filter((item) => !shouldExcludeRepository(item.repository, config));
  const merged = new Map(contributions.map((item) => [identityKey(item.repository, item.prNumber), { ...item }]));
  let added = 0;
  let updated = 0;
  let excluded = 0;

  const eligible = [];
  for (const raw of pullRequests) {
    const pr = raw?.repositoryFullName ? raw : normalizePullRequest(raw);
    if (shouldExcludeRepository(pr.repositoryFullName, config)) {
      excluded += 1;
      continue;
    }
    if (!isEligiblePullRequest(pr, config)) continue;
    eligible.push(pr);
  }

  const seen = new Set();
  for (const pr of eligible) {
    const exactKey = identityKey(pr.repositoryFullName, pr.number);
    if (seen.has(exactKey)) continue;
    seen.add(exactKey);

    const currentRecords = [...merged.values()];
    const existingIndex = findExistingRecord(currentRecords, pr);
    const previous = existingIndex >= 0 ? currentRecords[existingIndex] : undefined;
    const result = makeContribution(pr, previous, config);

    if (previous) {
      const previousKey = identityKey(previous.repository, previous.prNumber);
      merged.delete(previousKey);
      merged.set(exactKey, result);
      if (JSON.stringify(previous) !== JSON.stringify(result)) updated += 1;
    } else {
      merged.set(exactKey, result);
      added += 1;
    }
  }

  const result = [...merged.values()].sort((a, b) =>
    new Date(b.mergedAt ?? b.date).getTime() - new Date(a.mergedAt ?? a.date).getTime()
  );
  return { contributions: result, added, updated, excluded, apiRecords: eligible.length };
}

export function calculateContributionStats(contributions) {
  const merged = contributions.filter((item) => item.status === "merged");
  return {
    mergedPullRequests: merged.length,
    repositories: new Set(merged.map((item) => normalizeRepositoryName(item.repository))).size,
    ecosystems: new Set(merged.map((item) => item.organization)).size,
  };
}

export async function fetchRestPullRequests(token = "", fetchImpl = fetch) {
  const searchItems = [];
  let expectedTotal = 0;
  let pagesFetched = 0;

  // Search results already expose pull_request.merged_at. Use authoritative
  // merge metadata instead of issuing one follow-up request per PR.
  for (let page = 1; page <= 10; page += 1) {
    const searchUrl = new URL(`${REST_URL}/search/issues`);
    searchUrl.searchParams.set("q", `author:${ACCOUNT_LOGIN} is:pr is:merged`);
    searchUrl.searchParams.set("per_page", "100");
    searchUrl.searchParams.set("page", String(page));

    const payload = await requestJson(searchUrl.toString(), {}, { token, fetchImpl });
    expectedTotal = Number(payload.total_count ?? 0);
    pagesFetched = page;
    const items = Array.isArray(payload.items) ? payload.items : [];
    searchItems.push(...items);

    if (items.length < 100 || searchItems.length >= expectedTotal) break;
    if (page === 10 && expectedTotal > searchItems.length) {
      console.warn("REST search reached the 1,000-result API ceiling.");
    }
  }

  const results = [];
  let missingMergeTime = 0;
  let invalidRecords = 0;
  for (const item of searchItems) {
    const repositoryMatch = String(item?.repository_url ?? "").match(/\/repos\/([^/]+\/[^/]+)\/?$/i);
    const repositoryFullName = repositoryMatch?.[1] ?? "";
    const mergedAt = item?.pull_request?.merged_at ?? null;
    const authorLogin = item?.user?.login ?? "";

    if (!mergedAt) {
      missingMergeTime += 1;
      continue;
    }
    if (
      authorLogin.toLowerCase() !== ACCOUNT_LOGIN ||
      !repositoryFullName.includes("/") ||
      !Number(item?.number) ||
      !item?.html_url ||
      !String(item.html_url).startsWith("https://github.com/")
    ) {
      invalidRecords += 1;
      continue;
    }

    const [owner = ""] = repositoryFullName.split("/");
    results.push({
      number: Number(item.number),
      title: item.title ?? "",
      body: item.body ?? "",
      html_url: item.html_url,
      state: item.state ?? "closed",
      merged: true,
      merged_at: mergedAt,
      user: { login: authorLogin },
      repository_full_name: repositoryFullName,
      repository_url: `https://github.com/${repositoryFullName}`,
      base: {
        repo: {
          full_name: repositoryFullName,
          owner: { login: owner },
        },
      },
      labels: Array.isArray(item.labels) ? item.labels : [],
    });
  }

  console.log(`REST merged-PR search retrieved ${results.length} verified records from ${searchItems.length} search results across ${pagesFetched} page(s).`);
  if (missingMergeTime > 0) console.warn(`Ignored ${missingMergeTime} search result(s) without an authoritative pull_request.merged_at timestamp.`);
  if (invalidRecords > 0) console.warn(`Ignored ${invalidRecords} malformed search result(s).`);
  if (expectedTotal > searchItems.length) {
    console.warn(`GitHub reports ${expectedTotal} matching PRs; retrieved ${searchItems.length}. Search results are capped at 1,000 items.`);
  }
  return results;
}

export async function runSync({ token = process.env.GITHUB_TOKEN ?? "", dryRun = false, fetchImpl = fetch } = {}) {
  const config = JSON.parse(await readFile(CONFIG_FILE, "utf8"));
  const existing = JSON.parse(await readFile(DATA_FILE, "utf8"));
  if (!Array.isArray(existing)) throw new Error("Existing contribution JSON must be an array.");

  // Prefer the unauthenticated REST search: it queries public GitHub contributions globally
  // instead of being restricted to repositories accessible to the workflow's installation token.
  let pullRequests;
  let searchSource = "public unauthenticated search";
  try {
    pullRequests = await fetchRestPullRequests("", fetchImpl);
    if (pullRequests.length === 0 && existing.length > 0) {
      throw new Error("Public GitHub search returned no verified merged PRs.");
    }
  } catch (publicError) {
    if (!token) throw publicError;
    console.warn(`Public GitHub search failed (${publicError.message}); trying the authenticated REST search as a fallback.`);
    pullRequests = await fetchRestPullRequests(token, fetchImpl);
    searchSource = "authenticated fallback search";
  }

  if (pullRequests.length === 0 && existing.length > 0) {
    throw new Error("GitHub returned no verifiable merged PRs. Refusing to replace the last-known-good contribution dataset.");
  }

  const normalized = pullRequests.map(normalizePullRequest);
  let mergeResult = mergeContributionData(existing, normalized, config);

  // A non-empty search result can still contain only configured exclusions. Try the token
  // search once as a fallback, but never clear a valid dataset on a zero-eligible result.
  if (mergeResult.apiRecords === 0 && existing.length > 0 && token && searchSource === "public unauthenticated search") {
    console.warn("Public search returned no eligible upstream PRs after display exclusions; retrying with the authenticated REST search.");
    const fallbackPullRequests = await fetchRestPullRequests(token, fetchImpl);
    const fallbackResult = mergeContributionData(existing, fallbackPullRequests.map(normalizePullRequest), config);
    if (fallbackResult.apiRecords > 0) {
      pullRequests = fallbackPullRequests;
      mergeResult = fallbackResult;
      searchSource = "authenticated fallback search";
    }
  }

  const { contributions, added, updated, excluded, apiRecords } = mergeResult;
  if (apiRecords === 0 && existing.length > 0) {
    throw new Error("GitHub returned zero eligible upstream merged PRs. Refusing to report a successful refresh or overwrite the last-known-good dataset.");
  }
  if (!contributions.length && existing.length) {
    throw new Error("The refresh would remove every existing record. Refusing to overwrite the dataset.");
  }

  const output = JSON.stringify(contributions, null, 2) + "\n";
  const current = JSON.stringify(existing, null, 2) + "\n";
  const stats = calculateContributionStats(contributions);
  console.log(`Search source: ${searchSource}.`);
  console.log(`GitHub sync summary: ${stats.mergedPullRequests} merged PRs, ${stats.repositories} repositories, ${stats.ecosystems} ecosystems.`);
  console.log(`API records: ${apiRecords}; added: ${added}; updated: ${updated}; excluded by display configuration: ${excluded}.`);

  if (dryRun) {
    console.log("Dry run selected; no file was written.");
    return { changed: output !== current, contributions, stats, added, updated, searchSource };
  }
  if (output === current) {
    console.log("No data change detected; leaving the generated file untouched.");
    return { changed: false, contributions, stats, added, updated, searchSource };
  }

  const tempFile = `${DATA_FILE}.tmp`;
  await writeFile(tempFile, output, "utf8");
  await rename(tempFile, DATA_FILE);
  console.log(`Updated ${path.relative(ROOT, DATA_FILE)} atomically.`);
  return { changed: true, contributions, stats, added, updated, searchSource };
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) {
  runSync({ dryRun: process.argv.includes("--check") })
    .then((result) => {
      if (process.argv.includes("--check") && result.changed) {
        console.log("The generated data would change; re-run without --check to write it.");
      }
    })
    .catch((error) => {
      console.error(`Open Source sync failed: ${error.message}`);
      process.exitCode = 1;
    });
}
