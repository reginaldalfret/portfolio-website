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

type FilterKey = "all" | "docs" | "bug-fix" | "test" | "infra" | "build";

// Featured subset for the high-impact spotlight strip
const FEATURED_PR_IDS = [
  "apple-swift-numerics-355",
  "nvidia-cuda-quantum-5560",
  "meta-stylex-1899",
  "cli-cli-14592",
  "intel-torch-5518",
  "cloudflare-vinext-3469",
];

export function OpenSourceSection() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filteredContributions = useMemo(() => {
    return OPEN_SOURCE_CONTRIBUTIONS.filter((item) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "docs") return item.category === "DOCS";
      if (activeFilter === "bug-fix") return item.category === "BUG FIX";
      if (activeFilter === "test") return item.category === "TEST";
      if (activeFilter === "infra") return item.category === "INFRA";
      if (activeFilter === "build") return item.category === "BUILD";
      return true;
    });
  }, [activeFilter]);

  const featuredContributions = useMemo(() => {
    return FEATURED_PR_IDS.map((id) =>
      OPEN_SOURCE_CONTRIBUTIONS.find((c) => c.id === id)
    ).filter(Boolean) as OpenSourceContribution[];
  }, []);

  const filterTabs: { id: FilterKey; label: string; count: number }[] = [
    { id: "all", label: "All Contributions", count: OPEN_SOURCE_METRICS.totalContributions },
    { id: "docs", label: "Documentation", count: OPEN_SOURCE_CONTRIBUTIONS.filter((c) => c.category === "DOCS").length },
    { id: "bug-fix", label: "Bug Fixes", count: OPEN_SOURCE_CONTRIBUTIONS.filter((c) => c.category === "BUG FIX").length },
    { id: "test", label: "Test Suites", count: OPEN_SOURCE_CONTRIBUTIONS.filter((c) => c.category === "TEST").length },
    { id: "infra", label: "Infrastructure", count: OPEN_SOURCE_CONTRIBUTIONS.filter((c) => c.category === "INFRA").length },
    { id: "build", label: "Build & Packaging", count: OPEN_SOURCE_CONTRIBUTIONS.filter((c) => c.category === "BUILD").length },
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
        description="Real upstream engineering work across major open-source ecosystems. Verified pull requests merged directly into production repositories maintained by Apple, NVIDIA, Meta, GitHub, Intel, Cloudflare, Docker, Microsoft Azure, IBM, Apache, SAP, AMD, Airbnb, and Qualcomm."
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

        {/* Metric 2: Total Documented Contributions */}
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
            {OPEN_SOURCE_METRICS.totalContributions}
          </div>
          <div className="text-xs sm:text-sm text-neutral-300 font-medium mt-1">
            Engineering Contributions
          </div>
          <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
            Spanning bug fixes, tests, CI infra, build systems, and docs.
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
              14 ECOSYSTEMS
            </span>
          </div>
          <div className="text-3xl sm:text-5xl font-black text-white tracking-tight font-mono">
            {OPEN_SOURCE_METRICS.totalOrganizations}
          </div>
          <div className="text-xs sm:text-sm text-neutral-300 font-medium mt-1">
            Major Organizations & Foundries
          </div>
          <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
            Fortune 100 enterprises, hyperscalers, and premier foundations.
          </p>
        </motion.div>
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
            6 Selected Highlights
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

      {/* All Contributions Grid (14 records) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
            Open-source contribution is core to how I practice engineering: diving into large unfamiliar codebases, diagnosing production edge-cases, aligning test suites with upstream invariants, and proposing surgical patches through public code reviews with maintainers across Apple, NVIDIA, Meta, GitHub, Intel, Cloudflare, Microsoft Azure, IBM, Docker, SAP, and Apache.
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
              Verified on GitHub &bull; 14 Merged Pull Requests Across 14 Ecosystems
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
