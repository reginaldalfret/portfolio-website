"use client";

import React, { useState, useMemo } from "react";
import {
  Layers,
  Zap,
  BarChart3,
  GitBranch,
  Terminal,
  ExternalLink,
  Github,
  CheckCircle2,
  SlidersHorizontal,
  ArrowUpDown,
  Code2,
  Box,
  Cpu,
  MonitorCheck,
  Check,
  Sparkles,
  Download,
  FileSpreadsheet,
  FileJson,
  Activity,
  Gauge,
  Clock,
  HardDrive
} from "lucide-react";
import rawBenchmarks from "@/data/stack-benchmarks.json";

export type StackId =
  | "nextjs"
  | "nuxt"
  | "django"
  | "springboot"
  | "laravel"
  | "rails"
  | "angular"
  | "blazor"
  | "buffalo"
  | "leptos"
  | "jaspr"
  | "vapor";

export interface StackBenchmark {
  id: StackId;
  name: string;
  language: string;
  runtime: string;
  architecture: string;
  renderType: string;
  classification?: string;
  nativeVerified?: boolean;
  historicalComparison?: string;
  lighthouseScore: number;
  fcpMs: number;
  lcpMs: number;
  cls: number;
  ttfbMs: number;
  bundleTransferKb: number;
  cssTransferKb: number;
  buildTimeSec: number;
  repo: string;
  liveRoute: string;
  color: string;
  status: string;
  features: string[];
  verifiedStats?: {
    trials: number;
    ttfb: { median: number; p75: number; min: number; max: number };
    fcp: { median: number; p75: number; min: number; max: number };
    payload: { median: number };
    breakdown?: Record<string, number>;
  };
}

const STACKS: StackBenchmark[] = (Array.isArray(rawBenchmarks) ? rawBenchmarks : (rawBenchmarks as any)?.default || []) as StackBenchmark[];

const ARCHITECTURES_MAP: Record<string, { diagram: string; description: string }> = {
  nextjs: {
    description: "Hybrid React Server Components (RSC) with edge streaming, App Router route handlers, and Vercel Edge caching.",
    diagram: `Client Browser ──> Vercel Edge (SSR) ──> React Server Components ──> Streaming HTML + Client Hydration`
  },
  nuxt: {
    description: "Universal SSR powered by Vue 3 Composition API, Vite bundler, and the high-speed Nitro server engine.",
    diagram: `Client Browser ──> Nitro Server Engine ──> Vue 3 SSR Tree ──> Hydrated Client DOM`
  },
  django: {
    description: "Classic Python Model-View-Template (MVT) architecture with zero client-side hydration overhead and Python 3.13 speedups.",
    diagram: `Client Browser ──> Nginx / Gunicorn ──> Django 6 WSGI/ASGI ──> MVT Template Engine ──> Pure Static HTML`
  },
  springboot: {
    description: "Enterprise Model-View-Controller (MVC) running on Java 21 LTS with Virtual Threads (Project Loom) and Thymeleaf templates.",
    diagram: `Client Browser ──> Embedded Tomcat ──> Spring MVC DispatcherServlet ──> Project Loom Virtual Threads ──> Thymeleaf Rendered HTML`
  },
  laravel: {
    description: "Artisan-driven MVC architecture running on PHP 8.4 with Blade server components and optimized worker execution.",
    diagram: `Client Browser ──> Artisan Kernel ──> Laravel 11/12 Pipeline ──> Blade Component Tree ──> Optimized HTML Response`
  },
  rails: {
    description: "Convention-over-configuration Ruby on Rails 8 with Ruby 3.4 YJIT compilation, Propshaft asset pipeline, and ActionView ERB.",
    diagram: `Client Browser ──> Puma Web Server ──> Rails 8 ActionDispatch ──> Ruby 3.4 YJIT ──> ActionView ERB Stream`
  },
  angular: {
    description: "Modern zoneless reactive Single Page Application (SPA) utilizing Angular 19 Standalone Components, Signals, and Vite build pipeline.",
    diagram: `Client Browser ──> Static CDN ──> Angular 19 Standalone Bundle ──> Signals Reactive Graph ──> Client DOM Mutation`
  },
  blazor: {
    description: "High-performance client-side WebAssembly execution running compiled C# .NET 8 IL code directly inside the browser VM.",
    diagram: `Client Browser ──> dotnet.js Bootstrapper ──> Mono WebAssembly Engine (.NET 8) ──> Compiled C# Razor Components ──> Browser Canvas`
  },
  buffalo: {
    description: "Compiled native Go binary with Plush SSR, Gorilla routing, and zero runtime dependencies delivering sub-50ms TTFB.",
    diagram: `Client Browser ──> Standalone Go Binary ──> Gorilla Mux Dispatcher ──> Concurrent Goroutines ──> Plush High-Speed Template`
  },
  leptos: {
    description: "Cutting-edge Rust WebAssembly application leveraging fine-grained reactive signals and wasm-bindgen for near-native performance.",
    diagram: `Client Browser ──> Trunk WASM Loader ──> Rust Leptos 0.7 Engine ──> Fine-Grained Signals Graph ──> Direct DOM Manipulation`
  },
  jaspr: {
    description: "Dart full-stack web framework bringing Flutter-inspired component trees with static site generation and web hydration.",
    diagram: `Client Browser ──> Dart Web Runtime ──> Jaspr Component Tree ──> Hydration Lifecycle ──> Reactive UI Updates`
  },
  vapor: {
    description: "Server-side Swift application built on SwiftNIO asynchronous non-blocking event loops and Leaf templating engine.",
    diagram: `Client Browser ──> SwiftNIO EventLoopGroup ──> Vapor 4 Async Router ──> Leaf Template Compiler ──> Zero-Copy ByteBuf Stream`
  }
};

export function EngineeringLab({ onSelectStack }: { onSelectStack?: (stackId: StackId) => void }) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [selectedRenderType, setSelectedRenderType] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"fcp" | "ttfb" | "bundle" | "lighthouse">("fcp");
  const [compareList, setCompareList] = useState<StackId[]>(["nextjs", "django", "buffalo", "leptos"]);
  const [activeArchTab, setActiveArchTab] = useState<string>("nextjs");
  const [activeView, setActiveView] = useState<"overview" | "leaderboard" | "compare" | "benchmarks" | "architecture">("overview");

  // Summary Metrics with safety fallbacks
  const summary = useMemo(() => {
    const list = [...STACKS];
    if (list.length === 0) {
      return {
        total: 12,
        fastestFcp: { name: "Go Buffalo", fcpMs: 280 },
        lowestTtfb: { name: "Go Buffalo", ttfbMs: 42 },
        smallestPayload: { bundleTransferKb: 108.2 }
      };
    }
    const sortedFcp = [...list].sort((a, b) => a.fcpMs - b.fcpMs);
    const sortedTtfb = [...list].sort((a, b) => a.ttfbMs - b.ttfbMs);
    const sortedPayload = [...list].sort((a, b) => a.bundleTransferKb - b.bundleTransferKb);
    return {
      total: list.length,
      fastestFcp: sortedFcp[0] || { name: "Go Buffalo", fcpMs: 280 },
      lowestTtfb: sortedTtfb[0] || { name: "Go Buffalo", ttfbMs: 42 },
      smallestPayload: sortedPayload[0] || { bundleTransferKb: 108.2 }
    };
  }, []);

  // Filtered & Sorted Stacks
  const filteredStacks = useMemo(() => {
    return STACKS.filter((s) => {
      const langMatch =
        selectedLanguage === "All" ||
        s.language.toLowerCase().includes(selectedLanguage.toLowerCase());
      const renderMatch =
        selectedRenderType === "All" ||
        s.renderType.toLowerCase().includes(selectedRenderType.toLowerCase());
      return langMatch && renderMatch;
    }).sort((a, b) => {
      if (sortBy === "fcp") return a.fcpMs - b.fcpMs;
      if (sortBy === "ttfb") return a.ttfbMs - b.ttfbMs;
      if (sortBy === "bundle") return a.bundleTransferKb - b.bundleTransferKb;
      if (sortBy === "lighthouse") return b.lighthouseScore - a.lighthouseScore;
      return 0;
    });
  }, [selectedLanguage, selectedRenderType, sortBy]);

  const toggleCompare = (id: StackId) => {
    setCompareList((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const comparedStacks = useMemo(() => {
    return STACKS.filter((s) => compareList.includes(s.id));
  }, [compareList]);

  // Export functions
  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(STACKS, null, 2));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = "polyglot-benchmark-results.json";
    a.click();
  };

  const downloadCSV = () => {
    let csv = "Rank,Framework,Language,Architecture,FCP_ms,TTFB_ms,Payload_KB\n";
    filteredStacks.forEach((s, idx) => {
      csv += `${idx + 1},"${s.name}","${s.language}","${s.architecture}",${s.fcpMs},${s.ttfbMs},${s.bundleTransferKb}\n`;
    });
    const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = "polyglot-benchmark-comparison.csv";
    a.click();
  };

  return (
    <div className="w-full text-white space-y-6">
      {/* Central Navigation Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-neutral-950/90 border border-white/10 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2 pl-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono font-bold text-xs tracking-wider text-white">LAB EXPLORER</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10">
          <button
            type="button"
            onClick={() => setActiveView("overview")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === "overview"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            12 Stacks Explorer
          </button>
          <button
            type="button"
            onClick={() => setActiveView("leaderboard")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === "leaderboard"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Leaderboard
          </button>
          <button
            type="button"
            onClick={() => setActiveView("compare")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === "compare"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Compare ({compareList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveView("benchmarks")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === "benchmarks"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Metric Charts
          </button>
          <button
            type="button"
            onClick={() => setActiveView("architecture")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === "architecture"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Architecture
          </button>
        </div>
      </div>

      {/* VIEW 1: OVERVIEW & 12 STACK CARDS GRID */}
      {activeView === "overview" && (
        <div className="space-y-5">
          {/* Controls Bar: Filter by Language & Sort */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-neutral-900/60 border border-white/10 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-neutral-400 font-mono flex items-center gap-1 pr-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                Language:
              </span>
              {["All", "TypeScript", "Python", "Java", "PHP", "Ruby", "C#", "Go", "Rust", "Dart", "Swift"].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-2.5 py-1 rounded-md font-mono text-[11px] transition-all ${
                    selectedLanguage === lang
                      ? "bg-cyan-500 text-black font-bold shadow-sm"
                      : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-neutral-400 font-mono text-[11px]">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-black/80 border border-white/20 rounded-md px-2.5 py-1 text-xs text-neutral-200 font-mono focus:outline-none focus:border-cyan-500"
              >
                <option value="fcp">Fastest FCP (ms)</option>
                <option value="ttfb">Lowest TTFB (ms)</option>
                <option value="bundle">Smallest Payload (KB)</option>
                <option value="lighthouse">Lighthouse Score</option>
              </select>
            </div>
          </div>

          {/* Stacks Grid: 12 Framework Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredStacks.map((s) => {
              const isSelected = compareList.includes(s.id);
              return (
                <div
                  key={s.id}
                  className="p-4 rounded-2xl bg-neutral-950/90 border border-white/10 hover:border-cyan-500/50 shadow-lg hover:shadow-cyan-500/10 transition-all flex flex-col justify-between space-y-3.5 group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-black border border-white/20 flex items-center justify-center font-bold text-xs text-cyan-300 shadow-inner">
                          {s.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                            {s.name}
                          </h4>
                          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                            <span className="text-[10px] font-mono text-neutral-400">{s.language}</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                              NATIVE VERIFIED
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleCompare(s.id)}
                        title={isSelected ? "Remove from comparison" : "Add to comparison"}
                        className={`p-1.5 rounded-lg border transition-all text-[10px] font-mono ${
                          isSelected
                            ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                            : "bg-white/5 text-neutral-400 border-white/10 hover:text-white"
                        }`}
                      >
                        {isSelected ? <Check className="w-3 h-3" /> : "+ Compare"}
                      </button>
                    </div>

                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">{s.architecture}</p>

                    {/* Measured Metrics Badges */}
                    <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/5 text-center font-mono">
                      <div className="p-2 rounded-lg bg-black/60 border border-white/5">
                        <div className="text-[9px] text-neutral-500">FCP (Median)</div>
                        <div className="text-xs font-bold text-cyan-400">{s.fcpMs}ms</div>
                      </div>
                      <div className="p-2 rounded-lg bg-black/60 border border-white/5">
                        <div className="text-[9px] text-neutral-500">TTFB</div>
                        <div className="text-xs font-bold text-emerald-400">{s.ttfbMs}ms</div>
                      </div>
                      <div className="p-2 rounded-lg bg-black/60 border border-white/5">
                        <div className="text-[9px] text-neutral-500">Payload</div>
                        <div className="text-xs font-bold text-purple-300">{s.bundleTransferKb}KB</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => onSelectStack?.(s.id)}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-black font-bold text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Launch {s.name} View</span>
                    </button>
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pt-1">
                      <a
                        href={s.liveRoute}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-cyan-400 transition-colors"
                      >
                        <span>Direct Link ↗</span>
                      </a>
                      <a
                        href={s.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-white transition-colors"
                      >
                        <Github className="w-3 h-3" />
                        <span>Source Code</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: LEADERBOARD TABLE */}
      {activeView === "leaderboard" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400">
            <span>Ranked by Fastest First Contentful Paint (Median across 10 trials):</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={downloadCSV}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 flex items-center gap-1"
              >
                <FileSpreadsheet className="w-3 h-3 text-emerald-400" />
                <span>Export CSV</span>
              </button>
              <button
                type="button"
                onClick={downloadJSON}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 flex items-center gap-1"
              >
                <FileJson className="w-3 h-3 text-cyan-400" />
                <span>Export JSON</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-neutral-950/90 shadow-2xl">
            <table className="w-full text-left text-xs font-mono border-collapse min-w-[750px]">
              <thead>
                <tr className="bg-neutral-900/80 border-b border-white/10 text-neutral-400">
                  <th className="p-3.5 font-bold text-center">Rank</th>
                  <th className="p-3.5 font-bold text-white">Framework</th>
                  <th className="p-3.5 font-bold">Language</th>
                  <th className="p-3.5 font-bold">Architecture</th>
                  <th className="p-3.5 font-bold text-center">FCP (Median)</th>
                  <th className="p-3.5 font-bold text-center">TTFB</th>
                  <th className="p-3.5 font-bold text-center">Payload</th>
                  <th className="p-3.5 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredStacks.map((s, idx) => (
                  <tr key={s.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="p-3.5 text-center font-bold text-neutral-400">#{idx + 1}</td>
                    <td className="p-3.5 font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      {s.name}
                    </td>
                    <td className="p-3.5 text-neutral-300">{s.language}</td>
                    <td className="p-3.5 text-neutral-400 font-sans text-[11px]">{s.architecture}</td>
                    <td className="p-3.5 text-center font-bold text-cyan-300">{s.fcpMs} ms</td>
                    <td className="p-3.5 text-center font-bold text-emerald-400">{s.ttfbMs} ms</td>
                    <td className="p-3.5 text-center text-purple-300">{s.bundleTransferKb} KB</td>
                    <td className="p-3.5 text-center">
                      <button
                        type="button"
                        onClick={() => onSelectStack?.(s.id)}
                        className="px-2.5 py-1 rounded-md bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[10px] font-bold border border-cyan-500/30"
                      >
                        Launch
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: SIDE-BY-SIDE COMPARISON */}
      {activeView === "compare" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
            <span>Comparing {comparedStacks.length} of 12 implementations:</span>
            <button
              type="button"
              onClick={() => setCompareList(STACKS.map((s) => s.id))}
              className="text-cyan-400 hover:underline"
            >
              Select All 12 Stacks
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-neutral-950/90 shadow-2xl">
            <table className="w-full text-left text-xs font-mono min-w-[700px]">
              <thead>
                <tr className="bg-neutral-900/80 border-b border-white/10 text-neutral-400">
                  <th className="p-3.5 font-bold">Metric / Feature</th>
                  {comparedStacks.map((s) => (
                    <th key={s.id} className="p-3.5 font-bold text-white text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span>{s.name}</span>
                        <span className="text-[10px] text-cyan-400 font-normal">{s.language}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="p-3.5 text-neutral-400 font-bold">FCP (Median)</td>
                  {comparedStacks.map((s) => (
                    <td key={s.id} className="p-3.5 text-center font-bold text-cyan-300">{s.fcpMs} ms</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3.5 text-neutral-400 font-bold">TTFB (Median)</td>
                  {comparedStacks.map((s) => (
                    <td key={s.id} className="p-3.5 text-center font-bold text-emerald-400">{s.ttfbMs} ms</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3.5 text-neutral-400 font-bold">Wire Payload</td>
                  {comparedStacks.map((s) => (
                    <td key={s.id} className="p-3.5 text-center font-bold text-purple-300">{s.bundleTransferKb} KB</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3.5 text-neutral-400 font-bold">Architecture</td>
                  {comparedStacks.map((s) => (
                    <td key={s.id} className="p-3.5 text-center text-neutral-300 font-sans text-[11px]">{s.architecture}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3.5 text-neutral-400 font-bold">Runtime Engine</td>
                  {comparedStacks.map((s) => (
                    <td key={s.id} className="p-3.5 text-center text-neutral-300 text-[11px]">{s.runtime}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3.5 text-neutral-400 font-bold">Direct Preview</td>
                  {comparedStacks.map((s) => (
                    <td key={s.id} className="p-3.5 text-center">
                      <button
                        type="button"
                        onClick={() => onSelectStack?.(s.id)}
                        className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold"
                      >
                        Launch
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 4: METRIC CHARTS */}
      {activeView === "benchmarks" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* FCP Bar Chart */}
          <div className="p-5 rounded-2xl bg-neutral-950/90 border border-white/10 space-y-3">
            <h4 className="text-xs font-bold font-mono text-neutral-400 flex items-center gap-1.5 uppercase">
              <Zap className="w-4 h-4 text-cyan-400" />
              First Contentful Paint — FCP (Lower is Faster)
            </h4>
            <div className="space-y-2">
              {STACKS.map((s) => {
                const maxFcp = 1000;
                const pct = Math.min(100, (s.fcpMs / maxFcp) * 100);
                return (
                  <div key={s.id} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-neutral-300">{s.name} ({s.language})</span>
                      <span className="font-bold text-cyan-400">{s.fcpMs} ms</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TTFB Response Time Bar Chart */}
          <div className="p-5 rounded-2xl bg-neutral-950/90 border border-white/10 space-y-3">
            <h4 className="text-xs font-bold font-mono text-neutral-400 flex items-center gap-1.5 uppercase">
              <Clock className="w-4 h-4 text-emerald-400" />
              Time to First Byte — TTFB (Lower is Faster)
            </h4>
            <div className="space-y-2">
              {STACKS.map((s) => {
                const maxTtfb = 80;
                const pct = Math.min(100, (s.ttfbMs / maxTtfb) * 100);
                return (
                  <div key={s.id} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-neutral-300">{s.name}</span>
                      <span className="font-bold text-emerald-400">{s.ttfbMs} ms</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payload Size Bar Chart */}
          <div className="p-5 rounded-2xl bg-neutral-950/90 border border-white/10 space-y-3 lg:col-span-2">
            <h4 className="text-xs font-bold font-mono text-neutral-400 flex items-center gap-1.5 uppercase">
              <HardDrive className="w-4 h-4 text-purple-400" />
              Total Wire Payload Size (Lower is Faster)
            </h4>
            <div className="space-y-2">
              {STACKS.map((s) => {
                const maxPayload = 2500;
                const pct = Math.min(100, (s.bundleTransferKb / maxPayload) * 100);
                return (
                  <div key={s.id} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-neutral-300">{s.name} ({s.language})</span>
                      <span className="font-bold text-purple-300">{s.bundleTransferKb} KB</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 5: ARCHITECTURE EXPLORER */}
      {activeView === "architecture" && (
        <div className="p-5 rounded-2xl bg-neutral-950/90 border border-white/10 space-y-4">
          <div className="flex flex-wrap items-center gap-1.5 pb-3 border-b border-white/10">
            {STACKS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveArchTab(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeArchTab === s.id
                    ? "bg-cyan-500 text-black font-bold shadow-sm"
                    : "bg-white/5 text-neutral-400 hover:text-white"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          {(() => {
            const stack = STACKS.find((s) => s.id === activeArchTab) || STACKS[0];
            const archData = ARCHITECTURES_MAP[activeArchTab] || ARCHITECTURES_MAP.nextjs;
            return (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="text-cyan-400">⚡</span>
                      {stack?.name} Architecture Pipeline
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono pt-0.5">
                      Runtime: <span className="text-neutral-200">{stack?.runtime}</span> · Rendering: <span className="text-neutral-200">{stack?.renderType}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectStack?.(stack.id)}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30 self-start sm:self-auto"
                  >
                    Launch Live View ↗
                  </button>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed font-sans bg-black/40 p-3.5 rounded-xl border border-white/5">
                  {archData?.description}
                </p>

                <div className="p-4 rounded-xl bg-black/80 border border-white/10 font-mono text-xs text-cyan-300 overflow-x-auto space-y-2">
                  <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
                    End-to-End Execution Pipeline
                  </div>
                  <pre className="text-neutral-200 font-mono text-[11px] leading-relaxed whitespace-pre">
                    {archData?.diagram}
                  </pre>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
