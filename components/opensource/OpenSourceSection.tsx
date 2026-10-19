"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  OPEN_SOURCE_CONTRIBUTIONS,
  OPEN_SOURCE_METRICS,
  OpenSourceContribution,
} from "@/lib/openSourceContributions";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { OrgLogo } from "./OrgLogos";
import { trackOpenSourceClick } from "@/lib/analytics";
import {
  GitPullRequest,
  CheckCircle2,
  Building2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Code2,
  Terminal,
} from "lucide-react";

type FilterKey = "all" | "docs" | "bug-fix" | "test" | "infra" | "build" | "maintenance";

// Featured subset for the high-impact spotlight strip
const FEATURED_PR_IDS = [
  "apple-swift-numerics-355",
  "nvidia-cuda-quantum-5560",
  "nasa-oceandata-208",
  "aws-powertools-8542",
  "adobe-skills-445",
  "meta-stylex-1899",
  "cli-cli-14592",
  "intel-torch-5518",
  "cloudflare-vinext-3469",
];

export function OpenSourceSection() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [viewMode, setViewMode] = useState<"all" | "featured" | "recent">("all");

  const mergedContributions = useMemo(
    () => OPEN_SOURCE_CONTRIBUTIONS.filter((item) => item.status === "merged"),
    []
  );

  const organizationOptions = useMemo(
    () => Array.from(new Set(mergedContributions.map((item) => item.organization))).sort((a, b) => a.localeCompare(b)),
    [mergedContributions]
  );

  const yearOptions = useMemo(
    () => Array.from(new Set(mergedContributions.map((item) => new Date(item.mergedAt ?? item.date).getUTCFullYear().toString()))).sort((a, b) => Number(b) - Number(a)),
    [mergedContributions]
  );

  const organizationLineup = useMemo(
    () => Array.from(new Map(mergedContributions.map((item) => [item.organization, item])).values()).sort((a, b) => a.organization.localeCompare(b.organization)),
    [mergedContributions]
  );

  const filteredContributions = useMemo(() => {
    let results = mergedContributions.filter((item) => {
      const categoryMatches =
        activeFilter === "all" ||
        (activeFilter === "docs" && item.category === "DOCS") ||
        (activeFilter === "bug-fix" && item.category === "BUG FIX") ||
        (activeFilter === "test" && item.category === "TEST") ||
        (activeFilter === "infra" && item.category === "INFRA") ||
        (activeFilter === "build" && item.category === "BUILD") ||
        (activeFilter === "maintenance" && item.category === "MAINTENANCE");
      if (!categoryMatches) return false;

      const term = searchQuery.trim().toLowerCase();
      if (term && !`${item.title} ${item.repository} ${item.organization} #${item.prNumber}`.toLowerCase().includes(term)) return false;
      if (selectedOrganization !== "all" && item.organization !== selectedOrganization) return false;
      if (selectedYear !== "all" && new Date(item.mergedAt ?? item.date).getUTCFullYear().toString() !== selectedYear) return false;
      if (viewMode === "featured" && !FEATURED_PR_IDS.includes(item.id) && !item.isFeatured) return false;
      return true;
    });

    results = results.sort((a, b) => new Date(b.mergedAt ?? b.date).getTime() - new Date(a.mergedAt ?? a.date).getTime());
    return viewMode === "recent" ? results.slice(0, 10) : results;
  }, [activeFilter, mergedContributions, searchQuery, selectedOrganization, selectedYear, viewMode]);

  const featuredContributions = useMemo(
    () => [...mergedContributions]
      .filter((item) => FEATURED_PR_IDS.includes(item.id) || item.isFeatured)
      .sort((a, b) => new Date(b.mergedAt ?? b.date).getTime() - new Date(a.mergedAt ?? a.date).getTime()),
    [mergedContributions]
  );

  const filterTabs: { id: FilterKey; label: string; count: number }[] = [
    { id: "all", label: "All Contributions", count: OPEN_SOURCE_METRICS.mergedCount },
    { id: "docs", label: "Documentation", count: mergedContributions.filter((c) => c.category === "DOCS").length },
    { id: "bug-fix", label: "Bug Fixes", count: mergedContributions.filter((c) => c.category === "BUG FIX").length },
    { id: "test", label: "Test Suites", count: mergedContributions.filter((c) => c.category === "TEST").length },
    { id: "infra", label: "Infrastructure", count: mergedContributions.filter((c) => c.category === "INFRA").length },
    { id: "build", label: "Build & Packaging", count: mergedContributions.filter((c) => c.category === "BUILD").length },
    { id: "maintenance", label: "Maintenance", count: mergedContributions.filter((c) => c.category === "MAINTENANCE").length },
  ];

  return (
    <section
      id="open-source"
      aria-labelledby="section-open-source"
      className="relative py-16 sm:py-24 md:py-32 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <SectionHeader
        eyebrow="Primary Engineering Signal"
        title="Open-Source"
        highlight="Contributions"
        description="A daily refreshed archive of verified merged upstream pull requests across open-source projects and company ecosystems. The cards use GitHub's public API metadata while preserving a last-known-good snapshot if GitHub is temporarily unavailable."
        badgeColor="cyan"
      />

      {/* Command Center Hero Metrics Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16">
        {/* Metric 1: Upstream Merged PRs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="relative group p-5 sm:p-7 rounded-2xl sm:rounded-3xl glass-3 border border-emerald-500/25 hover:border-emerald-500/50 transition-all duration-300 shadow-[0_4px_24px_rgba(16,185,129,0.08)]"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Upstream Verified</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              100% MERGED
            </span>
          </div>
          <div className="text-3xl sm:text-5xl font-black text-white tracking-tight font-mono">
            {OPEN_SOURCE_METRICS.mergedCount}
          </div>
          <div className="text-xs sm:text-sm text-neutral-300 font-medium mt-1">
            Merged Pull Requests
          </div>
          <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
            Directly merged into official default branches by maintainers.
          </p>
        </motion.div>

        {/* Metric 2: Distinct Repositories */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="relative group p-5 sm:p-7 rounded-2xl sm:rounded-3xl glass-3 border border-cyan-500/25 hover:border-cyan-500/50 transition-all duration-300 shadow-[0_4px_24px_rgba(6,182,212,0.08)]"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 font-semibold">
              <GitPullRequest className="w-4 h-4 text-cyan-400" />
              <span>Total Impact</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              VERIFIED
            </span>
          </div>
          <div className="text-3xl sm:text-5xl font-black text-white tracking-tight font-mono">
            {OPEN_SOURCE_METRICS.totalRepositories}
          </div>
          <div className="text-xs sm:text-sm text-neutral-300 font-medium mt-1">
            Repositories Contributed To
          </div>
          <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
            Distinct repositories represented by the verified merged pull requests.
          </p>
        </motion.div>

        {/* Metric 3: Major Organizations */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.16 }}
          className="relative group p-5 sm:p-7 rounded-2xl sm:rounded-3xl glass-3 border border-purple-500/25 hover:border-purple-500/50 transition-all duration-300 shadow-[0_4px_24px_rgba(168,85,247,0.08)]"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-purple-400 flex items-center gap-1.5 font-semibold">
              <Building2 className="w-4 h-4 text-purple-400" />
              <span>Global Reach</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
              {OPEN_SOURCE_METRICS.totalOrganizations} ECOSYSTEMS
            </span>
          </div>
          <div className="text-3xl sm:text-5xl font-black text-white tracking-tight font-mono">
            {OPEN_SOURCE_METRICS.totalOrganizations}
          </div>
          <div className="text-xs sm:text-sm text-neutral-300 font-medium mt-1">
            Unique Ecosystems
          </div>
          <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
            Companies and independent project ecosystems are counted once, even when multiple repositories or PRs are represented.
          </p>
        </motion.div>
      </div>

      
      {/* One entry per normalized ecosystem; repeated PRs do not duplicate a logo. */}
      <div className="mb-12 sm:mb-16 p-5 sm:p-7 rounded-2xl sm:rounded-3xl glass-3 border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-5">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">Open-Source Ecosystems</h3>
            <p className="text-xs text-neutral-400 mt-1">A unique, alphabetized lineup derived from the visible merged-PR dataset.</p>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300">{organizationLineup.length} ecosystems</span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {organizationLineup.map((item) => (
            <a
              key={item.organization}
              href={item.organizationUrl ?? `https://github.com/${item.repository.split("/")[0]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl glass-2 border border-white/10 hover:border-cyan-400/40 text-xs text-neutral-200 hover:text-white transition-colors"
              aria-label={`Open the GitHub page for ${item.organization}`}
            >
              <span className="flex h-5 w-5 items-center justify-center" style={{ color: item.theme.accent }}>
                <OrgLogo orgKey={item.orgKey} className="w-4 h-4" />
              </span>
              <span>{item.organization}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Featured Spotlight Section */}
      <div className="mb-14 sm:mb-18">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Spotlight Contributions
            </h3>
            <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
              &bull; High-Impact Ecosystems
            </span>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            {featuredContributions.length} Selected Highlights
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {featuredContributions.map((item, idx) => (
            <motion.div
              key={`spotlight-${item.id}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="relative p-5 sm:p-6 rounded-2xl glass-3 border border-white/12 hover:border-cyan-400/40 transition-all duration-300 group flex flex-col justify-between"
              style={{
                boxShadow: `0 0 20px -5px ${item.theme.borderGlow}`,
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-xl glass-2 border border-white/10 flex items-center justify-center shrink-0"
                      style={{ color: item.theme.accent }}
                    >
                      <OrgLogo orgKey={item.orgKey} className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white leading-tight">
                        {item.organization}
                      </div>
                      <div className="text-[10px] font-mono text-neutral-400 truncate max-w-[170px]">
                        {item.repository}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold shrink-0 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Merged #{item.prNumber}</span>
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-semibold text-neutral-100 group-hover:text-white transition-colors mb-2 line-clamp-2">
                  {item.title}
                </h4>

                <p className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors leading-relaxed mb-4">
                  {item.contribution}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-400">
                  {item.displayDate}
                </span>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOpenSourceClick(item.repository, item.prNumber)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-300 hover:text-white transition-colors"
                  aria-label={`View ${item.organization} pull request #${item.prNumber} on GitHub`}
                >
                  <span>View PR #{item.prNumber}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Search and scoped contribution views */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
        <label className="block">
          <span className="sr-only">Search by pull-request title, repository, or ecosystem</span>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search PR title or repository…"
            className="w-full min-w-0 px-4 py-3 rounded-xl glass-2 border border-white/10 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-cyan-400/50"
            aria-label="Search merged pull requests by title, repository, or ecosystem"
          />
        </label>
        <label className="block">
          <span className="sr-only">Filter by ecosystem</span>
          <select
            value={selectedOrganization}
            onChange={(event) => setSelectedOrganization(event.target.value)}
            className="w-full min-w-0 px-3 py-3 rounded-xl glass-2 border border-white/10 text-sm text-white bg-neutral-950 focus:outline-none focus:border-cyan-400/50"
            aria-label="Filter by ecosystem"
          >
            <option value="all">All ecosystems</option>
            {organizationOptions.map((organization) => <option key={organization} value={organization}>{organization}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="sr-only">Filter by merge year</span>
          <select
            value={selectedYear}
            onChange={(event) => setSelectedYear(event.target.value)}
            className="w-full min-w-0 px-3 py-3 rounded-xl glass-2 border border-white/10 text-sm text-white bg-neutral-950 focus:outline-none focus:border-cyan-400/50"
            aria-label="Filter by merge year"
          >
            <option value="all">All years</option>
            {yearOptions.map((year) => <option key={year} value={year}>{year}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="sr-only">Choose which contributions to show</span>
          <select
            value={viewMode}
            onChange={(event) => setViewMode(event.target.value as "all" | "featured" | "recent")}
            className="w-full min-w-0 px-3 py-3 rounded-xl glass-2 border border-white/10 text-sm text-white bg-neutral-950 focus:outline-none focus:border-cyan-400/50"
            aria-label="Choose all, featured, or recent contributions"
          >
            <option value="all">All matching PRs</option>
            <option value="featured">Featured PRs</option>
            <option value="recent">10 most recent</option>
          </select>
        </label>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-8 sm:mb-10 no-scrollbar">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer touch-manipulation flex items-center gap-2 ${
                isActive
                  ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.25)] border border-white"
                  : "glass-2 text-neutral-300 hover:text-white border border-white/10 hover:border-white/25"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? "bg-black/15 text-black font-bold"
                    : "bg-white/10 text-neutral-400"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filtered merged PR cards are generated from the synchronized contribution dataset. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredContributions.length === 0 ? (
          <div className="md:col-span-2 lg:col-span-3 p-8 rounded-2xl glass-3 border border-white/10 text-center">
            <p className="text-sm font-semibold text-white">No merged pull requests match these filters.</p>
            <p className="text-xs text-neutral-400 mt-2">Try a different search, ecosystem, year, or view.</p>
          </div>
        ) : (
        <AnimatePresence mode="popLayout">
          {filteredContributions.map((item, index) => {
            return (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl glass-3 p-5 sm:p-7 border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-[0_10px_35px_rgba(0,0,0,0.4)]"
                style={{
                  boxShadow: `0 0 0 1px rgba(255, 255, 255, 0.05)`,
                }}
              >
                {/* Ambient Top Glow */}
                <div
                  className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-3xl opacity-20 pointer-events-none transition-opacity group-hover:opacity-40"
                  style={{ backgroundColor: item.theme.accent }}
                />

                {/* Card Top: Org Mark & Category Badge */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl glass-2 border border-white/10 flex items-center justify-center text-white shrink-0 shadow-inner group-hover:scale-105 transition-transform"
                        style={{ color: item.theme.accent }}
                      >
                        <OrgLogo orgKey={item.orgKey} className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white tracking-tight leading-none mb-1">
                          {item.organization}
                        </h3>
                        <p className="text-[11px] font-mono text-neutral-400 truncate max-w-[150px] xs:max-w-[180px]">
                          {item.repository}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md glass-2 border border-white/10 text-neutral-300 shrink-0">
                      {item.category}
                    </span>
                  </div>

                  {/* PR Title */}
                  <h4 className="text-sm sm:text-base font-semibold text-neutral-100 group-hover:text-white transition-colors mb-3 leading-snug line-clamp-2">
                    {item.title}
                  </h4>

                  {/* Contribution Explanation */}
                  <p className="text-xs sm:text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors leading-relaxed mb-5 font-normal">
                    {item.contribution}
                  </p>
                </div>

                {/* Card Bottom: Status, Date, and Actions */}
                <div className="pt-4 border-t border-white/8 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    {/* Status Badge */}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>✓ Merged</span>
                      <span className="text-emerald-400/70">#{item.prNumber}</span>
                    </span>

                    <span className="text-[11px] font-mono text-neutral-400">
                      {item.displayDate}
                    </span>
                  </div>

                  {/* Direct Pull Request Link */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackOpenSourceClick(item.repository, item.prNumber)}
                    className="inline-flex items-center justify-between w-full px-3.5 py-2 rounded-xl text-xs font-medium glass-2 text-neutral-200 group-hover:text-white group-hover:bg-white/10 border border-white/10 group-hover:border-white/25 transition-all touch-manipulation"
                    aria-label={`View ${item.organization} pull request #${item.prNumber} on GitHub`}
                  >
                    <span className="flex items-center gap-1.5 font-mono">
                      <GitPullRequest className="w-3.5 h-3.5 text-cyan-400" />
                      <span>PR #{item.prNumber} on GitHub</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
        )}
      </div>

      {/* Why Open Source & Engineering Rigor Narrative */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-12 sm:mt-16 p-6 sm:p-10 rounded-2xl sm:rounded-3xl glass-3 border border-white/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest glass-2 text-cyan-300 border border-cyan-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Why Open Source</span>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Upstream Rigor, Codebase Archaeology & Peer Collaboration
          </h3>

          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Open-source contribution is core to how I practice engineering: diving into unfamiliar codebases, diagnosing edge cases, aligning tests with upstream expectations, and proposing focused patches through public code review. This collection is synchronized from merged pull requests and keeps project ecosystems distinct from corporate identities.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-neutral-300">
            <div className="p-3 rounded-xl glass-2 border border-white/8 space-y-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Diagnostic Precision</span>
              </div>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Reproducing regressions in complex environments before authoring minimal, clean fixes.
              </p>
            </div>

            <div className="p-3 rounded-xl glass-2 border border-white/8 space-y-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Upstream Parity</span>
              </div>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Keeping developer tooling, docs, and test assertions in lockstep with official releases.
              </p>
            </div>

            <div className="p-3 rounded-xl glass-2 border border-white/8 space-y-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Maintainer Trust</span>
              </div>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Collaborating politely through CI checks, linting gates, and senior reviewer feedback.
              </p>
            </div>
          </div>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/reginaldalfret"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold glass-2 border border-white/15 text-white hover:bg-white/10 hover:border-white/30 transition-all touch-manipulation shadow-[0_0_20px_rgba(0,242,254,0.15)]"
              aria-label="Explore all contributions on GitHub profile"
            >
              <span>Explore All Activity on GitHub</span>
              <ArrowUpRight className="w-4 h-4 text-cyan-400" />
            </a>

            <span className="text-xs font-mono text-neutral-400">
              {OPEN_SOURCE_METRICS.summaryStatement}
            </span>
            <span className="w-full text-[10px] font-mono text-neutral-500">
              Daily GitHub Actions sync configured; the latest published dataset remains available if the API is temporarily unavailable.
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
