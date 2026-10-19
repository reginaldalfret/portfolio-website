import contributionData from "@/data/open-source-contributions.json";

export type ContributionStatus = "merged" | "incorporated";
export type ContributionCategory = "DOCS" | "BUG FIX" | "TEST" | "INFRA" | "BUILD" | "MAINTENANCE";

export interface OpenSourceContribution {
  id: string;
  organization: string;
  organizationUrl?: string;
  orgKey: string;
  repository: string;
  repositoryUrl?: string;
  prNumber: number;
  title: string;
  url: string;
  status: ContributionStatus;
  statusLabel: string;
  incorporatedInto?: { prNumber: number; url: string; description: string };
  category: ContributionCategory;
  contribution: string;
  description?: string;
  labels?: string[];
  date: string;
  mergedAt?: string;
  displayDate: string;
  isFeatured?: boolean;
  theme: { accent: string; borderGlow: string; gradient: string; textColor: string; badgeBg: string };
}

// This JSON file is refreshed by scripts/sync-open-source.mjs and committed by GitHub Actions.
// Keeping it checked in gives the static portfolio a reliable last-known-good fallback if GitHub is unavailable.
export const OPEN_SOURCE_CONTRIBUTIONS = contributionData as OpenSourceContribution[];
const mergedContributions = OPEN_SOURCE_CONTRIBUTIONS.filter((item) => item.status === "merged");

export const OPEN_SOURCE_METRICS = {
  mergedCount: mergedContributions.length,
  incorporatedCount: OPEN_SOURCE_CONTRIBUTIONS.filter((item) => item.status === "incorporated").length,
  totalContributions: OPEN_SOURCE_CONTRIBUTIONS.length,
  totalRepositories: new Set(mergedContributions.map((item) => item.repository.toLowerCase())).size,
  totalOrganizations: new Set(mergedContributions.map((item) => item.organization)).size,
  summaryStatement: `${mergedContributions.length} merged upstream pull requests across ${new Set(mergedContributions.map((item) => item.repository.toLowerCase())).size} repositories and ${new Set(mergedContributions.map((item) => item.organization)).size} ecosystems`,
};
