import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateContributionStats,
  fetchRestPullRequests,
  isEligiblePullRequest,
  mergeContributionData,
  normalizePullRequest,
  shouldExcludeRepository,
} from "./sync-open-source.mjs";

const config = {
  accountLogin: "reginaldalfret",
  excludedOwners: ["reginaldalfret", "open-telemetry", "opentelemetry", "detekt", "sierrotechnologies"],
  excludedRepositoryNames: ["detekt"],
  excludedRepositoryFullNames: ["open-telemetry/opentelemetry.io"],
  ownerDisplayNames: { stripe: "Stripe", facebook: "Meta" },
  ownerLogoKeys: { stripe: "stripe", facebook: "meta" },
  ownerOrganizationUrls: {},
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

test("normalizes pull-request data and preserves authoritative merge time", () => {
  const normalized = normalizePullRequest(rawPullRequest());
  assert.equal(normalized.repositoryFullName, "stripe/example");
  assert.equal(normalized.number, 7);
  assert.equal(normalized.merged, true);
  assert.equal(normalized.mergedAt, "2026-10-17T10:00:00Z");
  assert.deepEqual(normalized.labels, ["documentation"]);
});

test("only merged pull requests authored by the configured account are eligible", () => {
  assert.equal(isEligiblePullRequest(normalizePullRequest(rawPullRequest()), config), true);
  assert.equal(isEligiblePullRequest(normalizePullRequest(rawPullRequest({ mergedAt: null, isMerged: false })), config), false);
  assert.equal(isEligiblePullRequest(normalizePullRequest(rawPullRequest({ author: { login: "someone-else" } })), config), false);
  assert.equal(isEligiblePullRequest(normalizePullRequest(rawPullRequest({ state: "OPEN" })), config), false);
});

test("excludes own repositories and the configured OpenTelemetry/detekt display exclusions", () => {
  assert.equal(shouldExcludeRepository("reginaldalfret/demo", config), true);
  assert.equal(shouldExcludeRepository("open-telemetry/opentelemetry.io", config), true);
  assert.equal(shouldExcludeRepository("detekt/detekt", config), true);
  assert.equal(shouldExcludeRepository("sierrotechnologies/truprove-v2", config), true);
  assert.equal(shouldExcludeRepository("stripe/example", config), false);
});

test("merges duplicate PR results without duplicate cards and normalizes the organization label", () => {
  const normalized = normalizePullRequest(rawPullRequest());
  const { contributions, added } = mergeContributionData([], [normalized, normalized], config);
  assert.equal(contributions.length, 1);
  assert.equal(added, 1);
  assert.equal(contributions[0].organization, "Stripe");
  assert.equal(contributions[0].url, "https://github.com/stripe/example/pull/7");
  assert.equal(contributions[0].status, "merged");
  assert.equal(contributions[0].mergedAt, "2026-10-17T10:00:00.000Z");
});

test("retains curated descriptions, themes and IDs while refreshing authoritative metadata", () => {
  const existing = [{
    id: "stripe-example-7",
    organization: "Stripe",
    orgKey: "stripe",
    repository: "stripe/example",
    prNumber: 7,
    title: "old title",
    url: "https://github.com/stripe/example/pull/7",
    status: "merged",
    statusLabel: "Merged",
    category: "DOCS",
    contribution: "Curated contribution summary",
    date: "2026-10-16T10:00:00Z",
    displayDate: "Oct 16, 2026",
    theme: { accent: "#fff", borderGlow: "#fff", gradient: "none", textColor: "text-white", badgeBg: "bg-white" },
  }];
  const { contributions, updated } = mergeContributionData(existing, [normalizePullRequest(rawPullRequest())], config);
  assert.equal(contributions.length, 1);
  assert.equal(contributions[0].id, "stripe-example-7");
  assert.equal(contributions[0].title, "docs: update the README");
  assert.equal(contributions[0].contribution, "Curated contribution summary");
  assert.deepEqual(contributions[0].theme, existing[0].theme);
  assert.equal(updated, 1);
});

test("calculates distinct merged pull requests, repositories and ecosystems separately", () => {
  const { contributions } = mergeContributionData([], [
    normalizePullRequest(rawPullRequest()),
    normalizePullRequest(rawPullRequest({ number: 8, url: "https://github.com/stripe/example/pull/8" })),
    normalizePullRequest(rawPullRequest({
      number: 9,
      url: "https://github.com/facebook/stylex/pull/9",
      repository: { name: "stylex", nameWithOwner: "facebook/stylex", url: "https://github.com/facebook/stylex", owner: { login: "facebook" } },
    })),
  ], config);
  assert.deepEqual(calculateContributionStats(contributions), {
    mergedPullRequests: 3,
    repositories: 2,
    ecosystems: 2,
  });
});

test("REST search follows pagination, uses merged_at, authenticates, and does not fetch PRs one-by-one", async () => {
  const seenRequests = [];
  const makeSearchItem = (number, { mergedAt = "2026-10-17T10:00:00Z" } = {}) => ({
    number,
    title: `docs: update repository guide ${number}`,
    body: "This is a useful summary paragraph for a merged upstream pull request.",
    html_url: `https://github.com/stripe/example/pull/${number}`,
    state: "closed",
    user: { login: "reginaldalfret" },
    repository_url: "https://api.github.com/repos/stripe/example",
    pull_request: { merged_at: mergedAt },
    labels: [{ name: "documentation" }],
  });
  const firstPage = Array.from({ length: 100 }, (_, index) => makeSearchItem(index + 1));
  const secondPage = [makeSearchItem(101), makeSearchItem(102, { mergedAt: null })];
  const payloads = [
    { total_count: 102, items: firstPage },
    { total_count: 102, items: secondPage },
  ];
  const fakeFetch = async (url, options) => {
    seenRequests.push({ url: String(url), options });
    const payload = payloads.shift();
    return {
      ok: true,
      json: async () => payload,
      text: async () => "",
      headers: { get: () => null },
    };
  };

  const result = await fetchRestPullRequests("fake-token", fakeFetch);
  assert.equal(seenRequests.length, 2, "should perform one API request per search page, not one request per PR");
  assert.match(seenRequests[0].url, /page=1/);
  assert.match(seenRequests[1].url, /page=2/);
  assert.equal(seenRequests[0].options.headers.Authorization, "Bearer fake-token");
  assert.equal(result.length, 101, "the missing merged_at record must be ignored");
  assert.equal(normalizePullRequest(result[0]).merged, true);
  assert.equal(normalizePullRequest(result[0]).repositoryFullName, "stripe/example");
  assert.equal(normalizePullRequest(result[0]).mergedAt, "2026-10-17T10:00:00Z");
});

test("REST-style closed-but-unmerged records are rejected", () => {
  const normalized = normalizePullRequest({
    number: 12,
    title: "closed but not merged",
    html_url: "https://github.com/stripe/example/pull/12",
    state: "closed",
    merged: false,
    merged_at: null,
    user: { login: "reginaldalfret" },
    base: { repo: { full_name: "stripe/example", owner: { login: "stripe" } } },
  });
  assert.equal(normalized.merged, false);
  assert.equal(isEligiblePullRequest(normalized, config), false);
});
