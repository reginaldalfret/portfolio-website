import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateContributionStats,
  fetchGraphQLPullRequests,
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

test("normalizes GraphQL pull-request data and preserves authoritative merge time", () => {
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

test("GraphQL pagination follows cursors and deduplicates nothing prematurely", async () => {
  const seenBodies = [];
  const pages = [
    { data: { search: { issueCount: 2, pageInfo: { hasNextPage: true, endCursor: "cursor-1" }, nodes: [{ number: 1 }] } } },
    { data: { search: { issueCount: 2, pageInfo: { hasNextPage: false, endCursor: null }, nodes: [{ number: 2 }] } } },
  ];
  const fakeFetch = async (_url, options) => {
    seenBodies.push(JSON.parse(options.body));
    const payload = pages.shift();
    return { ok: true, json: async () => payload, headers: { get: () => null } };
  };
  const result = await fetchGraphQLPullRequests("fake-token", fakeFetch);
  assert.equal(result.length, 2);
  assert.equal(seenBodies.length, 2);
  assert.equal(seenBodies[1].variables.after, "cursor-1");
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
