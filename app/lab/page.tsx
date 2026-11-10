"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  Zap,
  Activity,
  Code2,
  CheckCircle2,
  Monitor,
  Smartphone,
  Tablet,
  X,
  Maximize2
} from "lucide-react";
import { EngineeringLab, StackId } from "@/components/stacks/EngineeringLab";
import stackRegistry from "@/data/stack-registry.json";

export default function LabPage() {
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [iframeLoading, setIframeLoading] = useState<boolean>(true);

  const activeStackInfo = activePreview
    ? stackRegistry.find((s) => s.id === activePreview)
    : null;

  const handleLaunchPreview = (stackId: StackId) => {
    setActivePreview(stackId);
    setIframeLoading(true);
  };

  const getDeviceWidth = () => {
    if (previewDevice === "mobile") return "max-w-sm";
    if (previewDevice === "tablet") return "max-w-2xl";
    return "max-w-full";
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Top Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-neutral-950/80 border-b border-white/10 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-all shadow-sm"
              title="Return to Personal Portfolio"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
              <span>Personal Portfolio</span>
            </Link>

            <span className="text-neutral-600 hidden sm:inline">/</span>

            <div className="hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-white tracking-wide">
                ENGINEERING LAB
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                12 STACKS. 1 PRODUCT.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/reginaldalfret/portfolio-website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Source Code</span>
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-all shadow-sm"
            >
              <span>Reginald Alfret V</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Lab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Lab Header Hero */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-neutral-900/90 via-neutral-950/80 to-neutral-900/90 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                EMPIRICAL BENCHMARKING LAB
              </span>
              <span className="text-xs font-mono text-neutral-400">
                12 INDEPENDENT CODEBASES · 1 UNIFIED SPECIFICATION
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white flex items-center gap-3">
              <span className="text-cyan-400">⚡</span> 12 Stacks. 1 Product.
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 max-w-3xl font-light leading-relaxed">
              An engineering experiment demonstrating one product implemented across twelve
              distinct technology stacks. Each application is built natively in its framework's
              idiomatic patterns and measured under controlled conditions with Navigation Timing
              API Level 2, Resource Timing manifests, and Lighthouse CLI telemetry.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 font-mono text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <div className="text-[10px] text-neutral-500 uppercase">Ecosystems</div>
                <div className="text-base font-bold text-white">12 Implementations</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <div className="text-[10px] text-neutral-500 uppercase">Fastest FCP</div>
                <div className="text-base font-bold text-cyan-400">280 ms (Go Buffalo)</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <div className="text-[10px] text-neutral-500 uppercase">Lowest Payload</div>
                <div className="text-base font-bold text-emerald-400">108.2 KB (Go Buffalo)</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <div className="text-[10px] text-neutral-500 uppercase">Benchmark Policy</div>
                <div className="text-base font-bold text-neutral-200">Zero Fabricated Metrics</div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Preview Modal (When a stack view is launched) */}
        {activePreview && activeStackInfo && (
          <section className="p-4 sm:p-6 rounded-3xl bg-neutral-950 border border-cyan-500/40 shadow-2xl space-y-4 animate-in fade-in duration-200">
            {/* Preview Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center font-bold text-sm text-cyan-300">
                  {activeStackInfo.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-white">
                      {activeStackInfo.name} Live Native Preview
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      {activeStackInfo.classification}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-neutral-400">
                    Route: <span className="text-neutral-200">{activeStackInfo.previewRoute}</span> · {activeStackInfo.architecture}
                  </p>
                </div>
              </div>

              {/* Viewport Presets & Actions */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-xl p-1 text-xs">
                  <button
                    onClick={() => setPreviewDevice("desktop")}
                    className={`p-1.5 rounded-lg transition-all ${
                      previewDevice === "desktop"
                        ? "bg-cyan-500/20 text-cyan-300"
                        : "text-neutral-400 hover:text-white"
                    }`}
                    title="Desktop View (100%)"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice("tablet")}
                    className={`p-1.5 rounded-lg transition-all ${
                      previewDevice === "tablet"
                        ? "bg-cyan-500/20 text-cyan-300"
                        : "text-neutral-400 hover:text-white"
                    }`}
                    title="Tablet View (768px)"
                  >
                    <Tablet className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice("mobile")}
                    className={`p-1.5 rounded-lg transition-all ${
                      previewDevice === "mobile"
                        ? "bg-cyan-500/20 text-cyan-300"
                        : "text-neutral-400 hover:text-white"
                    }`}
                    title="Mobile View (380px)"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>

                <a
                  href={activeStackInfo.previewRoute}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 flex items-center gap-1.5 transition-colors"
                  title="Open in new window"
                >
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                  <span className="hidden sm:inline">Open New Tab</span>
                </a>

                <a
                  href={activeStackInfo.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 flex items-center gap-1.5 transition-colors"
                  title="View repository on GitHub"
                >
                  <Github className="w-3 h-3" />
                  <span className="hidden sm:inline">Repository</span>
                </a>

                <button
                  onClick={() => setActivePreview(null)}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-neutral-400 hover:text-red-300 transition-colors"
                  title="Close Preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Iframe Frame Container */}
            <div className={`mx-auto transition-all duration-300 ${getDeviceWidth()}`}>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black aspect-[16/10] min-h-[600px] shadow-inner">
                {iframeLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-950/90 z-20">
                    <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                    <span className="text-xs font-mono text-neutral-400">
                      Loading native {activeStackInfo.name} preview...
                    </span>
                  </div>
                )}
                <iframe
                  src={activeStackInfo.previewRoute}
                  title={`${activeStackInfo.name} Preview`}
                  className="w-full h-full border-0"
                  onLoad={() => setIframeLoading(false)}
                />
              </div>
            </div>
          </section>
        )}

        {/* Central Engineering Lab (Cards, Leaderboard, Charts, Architecture Diagrams) */}
        <section className="space-y-8">
          <EngineeringLab onSelectStack={handleLaunchPreview} />
        </section>
      </main>

      {/* Lab Footer */}
      <footer className="mt-16 border-t border-white/10 bg-neutral-950/80 px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div>
            © 2026 <span className="text-white">Reginald Alfret V</span> · Polyglot Engineering Lab
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-cyan-400 transition-colors">
              Personal Portfolio
            </Link>
            <span>·</span>
            <Link href="/lab" className="text-cyan-400">
              Engineering Lab
            </Link>
            <span>·</span>
            <a
              href="https://github.com/reginaldalfret"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub Ecosystem
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
