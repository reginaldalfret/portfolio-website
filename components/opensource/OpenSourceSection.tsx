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
  GitMerge,
  ExternalLink,
  GitBranch,
  Building2,
  Sparkles,
  Layers,
  ArrowUpRight,
} from "lucide-react";

type FilterKey = "all" | "merged" | "incorporated" | "docs" | "bug-fix" | "test" | "infra";

export function OpenSourceSection() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filteredContributions = useMemo(() => {
    return OPEN_SOURCE_CONTRIBUTIONS.filter((item) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "merged") return item.status === "merged";
      if (activeFilter === "incorporated") return item.status === "incorporated";
      if (activeFilter === "docs") return item.category === "DOCS";
      if (activeFilter === "bug-fix") return item.category === "BUG FIX";
      if (activeFilter === "test") return item.category === "TEST";
      if (activeFilter === "infra") return item.category === "INFRA";
      return true;
    });
  }, [activeFilter]);

  const filterTabs: { id: FilterKey; label: string; count: number }[] = [
    { id: "all", label: "All", count: OPEN_SOURCE_METRICS.totalContributions },
    { id: "merged", label: "Merged", count: OPEN_SOURCE_METRICS.mergedCount },
    { id: "incorporated", label: "Incorporated", count: OPEN_SOURCE_METRICS.incorporatedCount },
    { id: "docs", label: "Docs", count: OPEN_SOURCE_CONTRIBUTIONS.filter((c) => c.category === "DOCS").length },
    { id: "bug-fix", label: "Bug Fix", count: OPEN_SOURCE_CONTRIBUTIONS.filter((c) => c.category === "BUG FIX").length },
    { id: "test", label: "Tests", count: OPEN_SOURCE_CONTRIBUTIONS.filter((c) => c.category === "TEST").length },
    { id: "infra", label: "Infra", count: OPEN_SOURCE_CONTRIBUTIONS.filter((c) => c.category === "INFRA").length },
  ];

  return (
    <section
      id="open-source"
      aria-labelledby="section-open-source"
      className="relative py-16 sm:py-24 md:py-32 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <SectionHeader
        eyebrow="Upstream Engineering"
        title="Open-Source"
        highlight="Contributions"
        description="Contributing bug fixes, test suite alignments, documentation refinements, and infrastructure improvements to major open-source ecosystems."
        badgeColor="cyan"
      />

      {/* Hero Metrics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-14">
        {/* Metric 1: Merged PRs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="relative group p-4 sm:p-6 rounded-2xl sm:rounded-3xl glass-3 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Upstream Merged</span>
            </span>
          </div>
          <div className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {OPEN_SOURCE_METRICS.mergedCount}
          </div>
          <div className="text-xs sm:text-sm text-neutral-400 mt-1">
            Merged Pull Requests
          </div>
        </motion.div>

        {/* Metric 2: Incorporated Contribution */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="relative group p-4 sm:p-6 rounded-2xl sm:rounded-3xl glass-3 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <GitMerge className="w-3.5 h-3.5" />
              <span>Incorporated</span>
            </span>
          </div>
          <div className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {OPEN_SOURCE_METRICS.incorporatedCount}
          </div>
          <div className="text-xs sm:text-sm text-neutral-400 mt-1">
            Merged via PR #3534
          </div>
        </motion.div>

        {/* Metric 3: Total Documented Contributions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.16 }}
          className="relative group p-4 sm:p-6 rounded-2xl sm:rounded-3xl glass-3 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <GitPullRequest className="w-3.5 h-3.5" />
              <span>Total PRs</span>
            </span>
          </div>
          <div className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {OPEN_SOURCE_METRICS.totalContributions}
          </div>
          <div className="text-xs sm:text-sm text-neutral-400 mt-1">
            Documented Contributions
          </div>
        </motion.div>

        {/* Metric 4: Major Organizations */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.24 }}
          className="relative group p-4 sm:p-6 rounded-2xl sm:rounded-3xl glass-3 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>Ecosystems</span>
            </span>
          </div>
          <div className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {OPEN_SOURCE_METRICS.totalOrganizations}
          </div>
          <div className="text-xs sm:text-sm text-neutral-400 mt-1">
            Major Global Organizations
          </div>
        </motion.div>
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

      {/* Contributions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <AnimatePresence mode="popLayout">
          {filteredContributions.map((item, index) => {
            const isMerged = item.status === "merged";

            return (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl glass-3 p-5 sm:p-7 border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-[0_10px_35px_rgba(0,0,0,0.4)]"
                style={{
                  boxShadow: `0 0 0 1px rgba(255, 255, 255, 0.05)`,
                }}
              >
                {/* Ambient Top Glow */}
                <div
                  className={`absolute -top-12 -right-12 w-28 h-28 rounded-full blur-3xl opacity-20 pointer-events-none transition-opacity group-hover:opacity-40 ${
                    isMerged ? "bg-cyan-500" : "bg-amber-500"
                  }`}
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
                    {isMerged ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>✓ Merged</span>
                        <span className="text-emerald-400/70">#{item.prNumber}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        <GitMerge className="w-3.5 h-3.5 text-amber-400" />
                        <span>↗ Incorporated</span>
                        <span className="text-amber-400/70">#{item.prNumber}</span>
                      </span>
                    )}

                    <span className="text-[11px] font-mono text-neutral-400">
                      {item.displayDate}
                    </span>
                  </div>

                  {/* Incorporated subtext if applicable */}
                  {item.incorporatedInto && (
                    <div className="text-[11px] font-mono text-amber-300/90 glass-1 p-2 rounded-xl border border-amber-500/20 flex items-center justify-between">
                      <span>Incorporated into merged PR #3534</span>
                      <a
                        href={item.incorporatedInto.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:text-white underline inline-flex items-center gap-0.5 ml-1"
                        aria-label="View incorporated merged pull request 3534"
                      >
                        <span>#3534</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  )}

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
      </div>

      {/* Impact Narrative Callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-12 sm:mt-16 p-6 sm:p-10 rounded-2xl sm:rounded-3xl glass-3 border border-white/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest glass-2 text-cyan-300 border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Engineering Discipline</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Upstream Rigor & Codebase Collaboration
          </h3>

          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Open-source contribution is part of how I learn systems engineering: reading unfamiliar codebases, diagnosing upstream bugs, reproducing test suite regressions, proposing surgical patches, and collaborating through public peer review with maintainers at Meta, Apache, Intel, Microsoft Azure, IBM, Docker, SAP, GitHub, and Cloudflare.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
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
              Verified on GitHub &bull; 9 Merged + 1 Incorporated
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
