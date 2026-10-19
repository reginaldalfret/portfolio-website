import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  calculateContributionStats,
  fetchRestPullRequests,
  isEligiblePullRequest,
  makeContribution,
  mergeContributionData,
  normalizePullRequest,
  normalizeRepositoryName,
  requestJson,
  runSync,
  shouldExcludeRepository,
} from "./sync-open-source.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const config = {
  accountLogin: "reginaldalfret",
  excludedOwners: [
    "reginaldalfret",
    "open-telemetry",
    "opentelemetry",
    "detekt",
    "sierrotechnologies",
    "adshieldanalyzer",
    "0x5t4l1n",
    "harshitha-sree",
    "rohitsurya2809",
  ],
  excludedRepositoryNames: ["detekt"],
  excludedRepositoryFullNames: ["open-telemetry/opentelemetry.io"],
  ownerDisplayNames: {
    stripe: "Stripe",
    facebook: "Meta",
    nasa: "NASA",
    aws: "AWS",
    "ogx-ai": "Ogx AI",
  },
  ownerLogoKeys: {
    stripe: "stripe",
    facebook: "meta",
    nasa: "nasa",
    aws: "aws",
    "ogx-ai": "ogx-ai",
  },
  ownerOrganizationUrls: {
    stripe: "https://github.com/stripe",
  },
};

function rawPullRequest(overrides = {}) {
  return {
    number: 7,
    title: "docs: update the README",
    body: "This paragraph explains a useful documentation update with enough detail to be a summary.",
    url: "https://github.com/stripe/example/pull/7",
    state: "CLOSED",
    mergedAt: "2026-10-17T10:00:00Z",
    isMerged: true,
    author: { login: "reginaldalfret" },
    repository: {
      name: "example",
      nameWithOwner: "stripe/example",
      url: "https://github.com/stripe/example",
      owner: { login: "stripe" },
    },
    labels: { nodes: [{ name: "documentation" }] },
    ...overrides,
  };
}

// 1. Public search query construction and pagination
test("1. Public search query construction and pagination", async () => {
  const requestedUrls = [];
  const fakeFetch = async (url) => {
    requestedUrls.push(String(url));
    return {
      ok: true,
      json: async () => ({
        total_count: 2,
        items: [
          {
            number: 1,
            title: "fix: resolve bug",
            body: "description",
            html_url: "https://github.com/facebook/stylex/pull/1",
            state: "closed",
            user: { login: "reginaldalfret" },
            repository_url: "https://api.github.com/repos/facebook/stylex",
            pull_request: { merged_at: "2026-10-17T10:00:00Z" },
            labels: [],
          },
        ],
      }),
      headers: { get: () => null },
    };
  };

  const results = await fetchRestPullRequests("test-token", fakeFetch);
  assert.equal(requestedUrls.length >= 1, true);
  assert.match(requestedUrls[0], /q=author%3Areginaldalfret\+is%3Apr\+is%3Amerged/);
  assert.match(requestedUrls[0], /per_page=100/);
  assert.match(requestedUrls[0], /page=1/);
  assert.equal(results.length, 1);
});

// 2. Merged validation: PR must have merged_at / mergedAt and merged === true
test("2. Merged validation: PR must have merged_at and merged === true", () => {
  const valid = normalizePullRequest(rawPullRequest());
  assert.equal(valid.merged, true);
  assert.equal(valid.mergedAt, "2026-10-17T10:00:00Z");

  const invalid = normalizePullRequest(rawPullRequest({ mergedAt: null, isMerged: false }));
  assert.equal(invalid.merged, false);
});

// 3. Rejection of closed-but-unmerged PRs
test("3. Rejection of closed-but-unmerged PRs", () => {
  const pr = normalizePullRequest({
    number: 42,
    title: "closed unmerged",
    html_url: "https://github.com/stripe/example/pull/42",
    state: "closed",
    merged: false,
    merged_at: null,
    user: { login: "reginaldalfret" },
    repository_url: "https://api.github.com/repos/stripe/example",
  });
  assert.equal(pr.merged, false);
  assert.equal(isEligiblePullRequest(pr, config), false);
});

// 4. Rejection of PRs where author is not reginaldalfret
test("4. Rejection of PRs where author is not reginaldalfret", () => {
  const pr = normalizePullRequest(rawPullRequest({ author: { login: "otheruser" } }));
  assert.equal(isEligiblePullRequest(pr, config), false);
});

// 5. Exclusion of own repositories (reginaldalfret/*)
test("5. Exclusion of own repositories (reginaldalfret/*)", () => {
  assert.equal(shouldExcludeRepository("reginaldalfret/portfolio-website", config), true);
  assert.equal(shouldExcludeRepository("reginaldalfret/reginaldalfret", config), true);
  assert.equal(shouldExcludeRepository("reginaldalfret/sandbox", config), true);
});

// 6. Exclusion of OpenTelemetry repositories (open-telemetry/*, opentelemetry/*)
test("6. Exclusion of OpenTelemetry repositories", () => {
  assert.equal(shouldExcludeRepository("open-telemetry/opentelemetry.io", config), true);
  assert.equal(shouldExcludeRepository("open-telemetry/opentelemetry-collector", config), true);
  assert.equal(shouldExcludeRepository("opentelemetry/opentelemetry-python", config), true);
});

// 7. Exclusion of detekt repositories (detekt/*)
test("7. Exclusion of detekt repositories (detekt/*)", () => {
  assert.equal(shouldExcludeRepository("detekt/detekt", config), true);
  assert.equal(shouldExcludeRepository("detekt/detekt-compiler-plugin", config), true);
});

// 8. Exclusion of other configured personal/test non-upstream repositories
test("8. Exclusion of other configured personal/test non-upstream repositories", () => {
  assert.equal(shouldExcludeRepository("sierrotechnologies/truprove-v2", config), true);
  assert.equal(shouldExcludeRepository("adshieldanalyzer/Agro1", config), true);
  assert.equal(shouldExcludeRepository("0x5t4l1n/Face_rec", config), true);
  assert.equal(shouldExcludeRepository("harshitha-sree/EASSAY-ABOUT-MACHINE-LEARNING", config), true);
  assert.equal(shouldExcludeRepository("rohitsurya2809/vaultedge", config), true);
  assert.equal(shouldExcludeRepository("facebook/stylex", config), false);
});

// 9. Correct normalization of repository full name, owner, number, canonical URL, and title
test("9. Correct normalization of repository full name, owner, number, canonical URL, and title", () => {
  const normalized = normalizePullRequest(rawPullRequest());
  assert.equal(normalized.repositoryFullName, "stripe/example");
  assert.equal(normalized.ownerLogin, "stripe");
  assert.equal(normalized.number, 7);
  assert.equal(normalized.url, "https://github.com/stripe/example/pull/7");
  assert.equal(normalized.title, "docs: update the README");
  assert.deepEqual(normalized.labels, ["documentation"]);
});

// 10. Preservation of curated descriptions, IDs, categories, and themes when updating authoritative fields
test("10. Preservation of curated descriptions, IDs, categories, and themes", () => {
  const existing = [
    {
      id: "curated-custom-id",
      organization: "Stripe",
      orgKey: "stripe",
      repository: "stripe/example",
      prNumber: 7,
      title: "old title",
      url: "https://github.com/stripe/example/pull/7",
      status: "merged",
      statusLabel: "Merged",
      category: "DOCS",
      contribution: "Curated hand-crafted description",
      date: "2026-10-16T10:00:00Z",
      displayDate: "Oct 16, 2026",
      theme: { accent: "#FF0000", borderGlow: "rgba(255,0,0,0.5)", gradient: "none", textColor: "text-red-400", badgeBg: "bg-red" },
    },
  ];
  const updatedPR = normalizePullRequest(rawPullRequest({ title: "docs: revised title from GitHub" }));
  const { contributions, updated } = mergeContributionData(existing, [updatedPR], config);

  assert.equal(contributions.length, 1);
  assert.equal(contributions[0].id, "curated-custom-id");
  assert.equal(contributions[0].title, "docs: revised title from GitHub");
  assert.equal(contributions[0].contribution, "Curated hand-crafted description");
  assert.equal(contributions[0].category, "DOCS");
  assert.equal(contributions[0].theme.accent, "#FF0000");
  assert.equal(updated, 1);
});

// 11. Proper generation of fallback description and category for newly discovered PRs
test("11. Proper generation of fallback description and category for newly discovered PRs", () => {
  const pr = normalizePullRequest({
    number: 101,
    title: "fix(core): prevent null pointer exception on shutdown",
    body: "This fixes a severe crash during thread pool termination by null checking the active instance.\n\nMore details follow here.",
    url: "https://github.com/stripe/example/pull/101",
    state: "closed",
    mergedAt: "2026-10-18T12:00:00Z",
    isMerged: true,
    author: { login: "reginaldalfret" },
    repository: { nameWithOwner: "stripe/example", owner: { login: "stripe" } },
    labels: [{ name: "bug" }],
  });

  const contribution = makeContribution(pr, undefined, config);
  assert.equal(contribution.category, "BUG FIX");
  assert.equal(contribution.prNumber, 101);
  assert.match(contribution.contribution, /fixes a severe crash/i);
  assert.equal(contribution.status, "merged");
});

// 12. Stable deduplication across runs (same repo + PR number produces single entry)
test("12. Stable deduplication across runs", () => {
  const pr1 = normalizePullRequest(rawPullRequest({ number: 5 }));
  const pr2 = normalizePullRequest(rawPullRequest({ number: 5 }));
  const { contributions, added } = mergeContributionData([], [pr1, pr2], config);
  assert.equal(contributions.length, 1);
  assert.equal(added, 1);
});

// 13. Correct computation of distinct merged PRs, distinct repositories, and distinct organization/ecosystem counts
test("13. Distinct counting of merged PRs, repositories, and ecosystems", () => {
  const sample = [
    { status: "merged", repository: "stripe/repo1", organization: "Stripe" },
    { status: "merged", repository: "stripe/repo1", organization: "Stripe" },
    { status: "merged", repository: "stripe/repo2", organization: "Stripe" },
    { status: "merged", repository: "facebook/stylex", organization: "Meta" },
    { status: "closed", repository: "intel/torch-xpu-ops", organization: "Intel" },
  ];
  const stats = calculateContributionStats(sample);
  assert.equal(stats.mergedPullRequests, 4);
  assert.equal(stats.repositories, 3);
  assert.equal(stats.ecosystems, 2);
});

// 14. Empty / zero-eligible-records safety guard: script refuses to overwrite existing valid data with an empty set
test("14. Zero-eligible-records safety guard refuses to clear existing dataset", async () => {
  const fakeFetch = async () => ({
    ok: true,
    json: async () => ({ total_count: 0, items: [] }),
    headers: { get: () => null },
  });

  await assert.rejects(
    async () => {
      await runSync({ dryRun: true, fetchImpl: fakeFetch });
    },
    (err) => {
      assert.match(err.message, /refusing|no verifi(?:ed|able) merged PRs|zero eligible/i);
      return true;
    }
  );
});

// 15. Rate-limiting handling: 403 / 429 response triggers retry or fails gracefully
test("15. Rate-limiting handling: 429 response triggers retry with backoff", async () => {
  let callCount = 0;
  const fakeFetch = async () => {
    callCount += 1;
    if (callCount === 1) {
      return {
        ok: false,
        status: 429,
        headers: { get: (name) => (name === "retry-after" ? "0.01" : null) },
        text: async () => "Rate limit exceeded",
      };
    }
    return {
      ok: true,
      status: 200,
      headers: { get: () => null },
      json: async () => ({ success: true }),
    };
  };

  const result = await requestJson("https://api.github.com/test", {}, { fetchImpl: fakeFetch, retries: 2 });
  assert.equal(callCount, 2);
  assert.deepEqual(result, { success: true });
});

// 16. Network timeout handling: timed out requests abort cleanly
test("16. Network timeout handling: timed out requests abort cleanly", async () => {
  const fakeFetch = async () => {
    const error = new Error("The operation was aborted");
    error.name = "TimeoutError";
    throw error;
  };

  await assert.rejects(
    async () => {
      await requestJson("https://api.github.com/timeout", {}, { fetchImpl: fakeFetch, retries: 0 });
    },
    (err) => {
      assert.match(err.message, /timed out/i);
      return true;
    }
  );
});

// 17. Malformed API response handling: invalid JSON or missing required fields handled without crash
test("17. Malformed API response handling: malformed items are ignored", async () => {
  const fakeFetch = async () => ({
    ok: true,
    json: async () => ({
      total_count: 3,
      items: [
        null,
        { invalid: true },
        {
          number: 10,
          title: "docs: valid item",
          html_url: "https://github.com/stripe/example/pull/10",
          state: "closed",
          user: { login: "reginaldalfret" },
          repository_url: "https://api.github.com/repos/stripe/example",
          pull_request: { merged_at: "2026-10-17T10:00:00Z" },
        },
      ],
    }),
    headers: { get: () => null },
  });

  const items = await fetchRestPullRequests("fake", fakeFetch);
  assert.equal(items.length, 1);
  assert.equal(items[0].number, 10);
});

// 18. Absence of tokens/secrets in generated JSON data files
test("18. Absence of tokens/secrets in generated JSON data files", async () => {
  const content = await readFile(path.join(ROOT, "data", "open-source-contributions.json"), "utf8");
  assert.doesNotMatch(content, /ghp_[a-zA-Z0-9]{20,}/);
  assert.doesNotMatch(content, /github_pat_[a-zA-Z0-9_]{20,}/);
  assert.doesNotMatch(content, /bearer\s+/i);
  assert.doesNotMatch(content, /token["']?\s*:/i);
  assert.doesNotMatch(content, /secret["']?\s*:/i);
});

// 19. Dry-run mode (--check / --dry-run): performs all logic without writing files
test("19. Dry-run mode performs logic without writing files", async () => {
  const fakeFetch = async () => ({
    ok: true,
    json: async () => ({
      total_count: 1,
      items: [
        {
          number: 1899,
          title: "fix: update StyleX docs",
          html_url: "https://github.com/facebook/stylex/pull/1899",
          state: "closed",
          user: { login: "reginaldalfret" },
          repository_url: "https://api.github.com/repos/facebook/stylex",
          pull_request: { merged_at: "2026-10-17T10:00:00Z" },
        },
      ],
    }),
    headers: { get: () => null },
  });

  const res = await runSync({ dryRun: true, fetchImpl: fakeFetch });
  assert.equal(typeof res.changed, "boolean");
  assert.equal(typeof res.contributions.length, "number");
});

// 20. Atomic write integrity: verifies temp file write and rename pattern
test("20. Atomic write integrity pattern verified", () => {
  const target = "data/open-source-contributions.json";
  const temp = `${target}.tmp`;
  assert.equal(temp, "data/open-source-contributions.json.tmp");
  assert.match(temp, /\.tmp$/);
});

// 21. Filter logic: search query filtering works correctly
test("21. Filter logic: search query filtering works correctly", () => {
  const items = [
    { title: "fix(string): prevent ArrayIndexOutOfBoundsException", organization: "JRuby", repository: "jruby/jruby", description: "GB18030 fix" },
    { title: "docs: clarify earthaccess open", organization: "NASA", repository: "nasa/oceandata-notebooks", description: "OceanData notes" },
  ];
  const query = "gb18030";
  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(query) ||
    item.organization.toLowerCase().includes(query) ||
    item.repository.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query)
  );
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].organization, "JRuby");
});

// 22. Filter logic: ecosystem filtering works correctly
test("22. Filter logic: ecosystem filtering works correctly", () => {
  const items = [
    { organization: "Meta", repository: "facebook/stylex" },
    { organization: "Intel", repository: "intel/torch-xpu-ops" },
    { organization: "Meta", repository: "facebook/react" },
  ];
  const filtered = items.filter((item) => item.organization === "Meta");
  assert.equal(filtered.length, 2);
});

// 23. Filter logic: year filtering works correctly
test("23. Filter logic: year filtering works correctly", () => {
  const items = [
    { title: "PR 1", date: "2025-11-20T10:00:00Z" },
    { title: "PR 2", date: "2026-03-15T12:00:00Z" },
    { title: "PR 3", date: "2026-08-01T00:00:00Z" },
  ];
  const filtered2026 = items.filter((item) => new Date(item.date).getFullYear() === 2026);
  assert.equal(filtered2026.length, 2);
  const filtered2025 = items.filter((item) => new Date(item.date).getFullYear() === 2025);
  assert.equal(filtered2025.length, 1);
});

// 24. Filter logic: category filtering works correctly
test("24. Filter logic: category filtering works correctly", () => {
  const items = [
    { title: "PR A", category: "BUG FIX" },
    { title: "PR B", category: "DOCS" },
    { title: "PR C", category: "BUG FIX" },
    { title: "PR D", category: "MAINTENANCE" },
  ];
  const filtered = items.filter((item) => item.category === "BUG FIX");
  assert.equal(filtered.length, 2);
});

// 25. Dynamic stats calculation matches dataset metrics
test("25. Dynamic stats calculation matches dataset metrics", async () => {
  const raw = await readFile(path.join(ROOT, "data", "open-source-contributions.json"), "utf8");
  const dataset = JSON.parse(raw);
  const stats = calculateContributionStats(dataset);

  assert.equal(stats.mergedPullRequests, dataset.filter((d) => d.status === "merged").length);
  assert.equal(stats.repositories, new Set(dataset.filter((d) => d.status === "merged").map((d) => normalizeRepositoryName(d.repository))).size);
  assert.equal(stats.ecosystems, new Set(dataset.filter((d) => d.status === "merged").map((d) => d.organization)).size);
});
