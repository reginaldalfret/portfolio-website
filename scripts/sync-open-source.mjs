#!/usr/bin/env node
import { readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_FILE = path.join(ROOT, "data", "open-source-contributions.json");
const CONFIG_FILE = path.join(ROOT, "scripts", "open-source-organizations.json");
const GRAPHQL_URL = "https://api.github.com/graphql";
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

const GRAPHQL_QUERY = `
  query MergedContributionSearch($query: String!, $after: String) {
    search(query: $query, type: ISSUE, first: 100, after: $after) {
      issueCount
      pageInfo { hasNextPage endCursor }
      nodes {
        ... on PullRequest {
          number
          title
          body
          url
          state
          isDraft
          mergedAt
          author { login }
          repository {
            name
            nameWithOwner
            url
            owner { login }
          }
          labels(first: 20) { nodes { name } }
        }
      }
    }
  }
`;

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
      if (error?.rateLimited) throw error;
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

export async function fetchGraphQLPullRequests(token, fetchImpl = fetch) {
  let cursor = null;
  const all = [];
  let page = 0;
  let reportedTotal = 0;

  do {
    page += 1;
    const payload = await requestJson(
      GRAPHQL_URL,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: GRAPHQL_QUERY,
          variables: { query: `author:${ACCOUNT_LOGIN} is:pr is:merged`, after: cursor },
        }),
      },
      { token, fetchImpl }
    );
    if (payload.errors?.length) {
      throw new Error(`GitHub GraphQL returned errors: ${payload.errors.map((item) => item.message).join("; ").slice(0, 400)}`);
    }
    const search = payload.data?.search;
    if (!search || !Array.isArray(search.nodes)) throw new Error("GitHub GraphQL response did not contain contribution search results.");

    reportedTotal = Number(search.issueCount ?? 0);
    all.push(...search.nodes.filter((node) => node && node.number));
    cursor = search.pageInfo?.hasNextPage ? search.pageInfo.endCursor : null;

    if (page >= 10 && cursor) {
      console.warn("GitHub search reached its 1,000-result pagination ceiling; the API cannot return further search hits in this query.");
      break;
    }
  } while (cursor);

  if (reportedTotal > all.length) {
    console.warn(`GitHub search reports ${reportedTotal} matches; this run retrieved ${all.length}. The checked-in dataset will be retained and augmented rather than cleared.`);
  }
  return all;
}

function parseRepositoryAndNumber(item) {
  const apiUrl = item?.pull_request?.url ?? item?.url ?? "";
  const match = apiUrl.match(/\/repos\/([^/]+\/[^/]+)\/(?:pulls|issues)\/(\d+)/i);
  if (match) return { repositoryFullName: match[1], number: Number(match[2]), apiUrl };
  const html = item?.html_url ?? item?.display_url ?? "";
  const htmlMatch = html.match(/github\.com\/([^/]+\/[^/]+)\/pull\/(\d+)/i);
  return htmlMatch ? { repositoryFullName: htmlMatch[1], number: Number(htmlMatch[2]), apiUrl: "" } : null;
}

async function mapWithConcurrency(items, limit, worker) {
  const output = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const index = next++;
      if (index >= items.length) return;
      output[index] = await worker(items[index], index);
    }
  });
  await Promise.all(workers);
  return output;
}

export async function fetchRestPullRequests(token = "", fetchImpl = fetch) {
  const searchItems = [];
  let expectedTotal = 0;
  for (let page = 1; page <= 10; page += 1) {
    const searchUrl = new URL(`${REST_URL}/search/issues`);
    searchUrl.searchParams.set("q", `author:${ACCOUNT_LOGIN} is:pr is:merged`);
    searchUrl.searchParams.set("per_page", "100");
    searchUrl.searchParams.set("page", String(page));
    const payload = await requestJson(searchUrl.toString(), {}, { token, fetchImpl });
    expectedTotal = Number(payload.total_count ?? 0);
    searchItems.push(...(payload.items ?? []));
    if ((payload.items ?? []).length < 100 || searchItems.length >= expectedTotal) break;
    if (page === 10 && expectedTotal > searchItems.length) {
      console.warn("REST search reached the 1,000-result API ceiling.");
    }
  }

  let rateLimited = false;
  const detailResults = await mapWithConcurrency(searchItems, 4, async (item) => {
    if (rateLimited) return null;
    const parsed = parseRepositoryAndNumber(item);
    if (!parsed) return null;
    try {
      return await requestJson(
        parsed.apiUrl || `${REST_URL}/repos/${parsed.repositoryFullName}/pulls/${parsed.number}`,
        {},
        { token, fetchImpl }
      );
    } catch (error) {
      if (error?.rateLimited) rateLimited = true;
      console.warn(`Skipped one PR detail because GitHub could not be reached: ${parsed.repositoryFullName}#${parsed.number} (${error.message})`);
      return null;
    }
  });

  const results = detailResults.filter(Boolean);
  if (rateLimited || results.length < searchItems.length) {
    console.warn(`Partial REST refresh: verified details for ${results.length} of ${searchItems.length} search results; existing valid records will be preserved.`);
  }
  if (expectedTotal > searchItems.length) {
    console.warn(`GitHub reports ${expectedTotal} matching PRs; retrieved ${searchItems.length}. Search results are capped at 1,000 items.`);
  }
  return results;
}

export async function runSync({ token = process.env.GITHUB_TOKEN ?? "", dryRun = false, fetchImpl = fetch } = {}) {
  const config = JSON.parse(await readFile(CONFIG_FILE, "utf8"));
  const existing = JSON.parse(await readFile(DATA_FILE, "utf8"));
  if (!Array.isArray(existing)) throw new Error("Existing contribution JSON must be an array.");

  const pullRequests = token
    ? await fetchGraphQLPullRequests(token, fetchImpl)
    : await fetchRestPullRequests("", fetchImpl);

  if (pullRequests.length === 0 && existing.length > 0) {
    throw new Error("GitHub returned no verifiable merged PRs. Refusing to replace the last-known-good contribution dataset.");
  }

  const normalized = pullRequests.map(normalizePullRequest);
  const { contributions, added, updated, excluded, apiRecords } = mergeContributionData(existing, normalized, config);
  if (!contributions.length && existing.length) {
    throw new Error("The refresh would remove every existing record. Refusing to overwrite the dataset.");
  }

  const output = JSON.stringify(contributions, null, 2) + "\n";
  const current = JSON.stringify(existing, null, 2) + "\n";
  const stats = calculateContributionStats(contributions);
  console.log(`GitHub sync summary: ${stats.mergedPullRequests} merged PRs, ${stats.repositories} repositories, ${stats.ecosystems} ecosystems.`);
  console.log(`API records: ${apiRecords}; added: ${added}; updated: ${updated}; excluded by display configuration: ${excluded}.`);

  if (dryRun) {
    console.log("Dry run selected; no file was written.");
    return { changed: output !== current, contributions, stats, added, updated };
  }
  if (output === current) {
    console.log("No data change detected; leaving the generated file untouched.");
    return { changed: false, contributions, stats, added, updated };
  }

  const tempFile = `${DATA_FILE}.tmp`;
  await writeFile(tempFile, output, "utf8");
  await rename(tempFile, DATA_FILE);
  console.log(`Updated ${path.relative(ROOT, DATA_FILE)} atomically.`);
  return { changed: true, contributions, stats, added, updated };
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
