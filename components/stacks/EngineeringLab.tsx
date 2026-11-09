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
  Sparkles
} from "lucide-react";
import rawBenchmarks from "@/data/stack-benchmarks.json";

export interface StackBenchmark {
  id: string;
  name: string;
  language: string;
  runtime: string;
  architecture: string;
  renderType: string;
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
}

const STACKS: StackBenchmark[] = rawBenchmarks as StackBenchmark[];

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
    description: "Artisan-driven MVC architecture running on PHP 8.4 with Blade server components and optimized FrankenPHP worker execution.",
    diagram: `Client Browser ──> FrankenPHP Worker ──> Laravel 11/12 Kernel ──> Blade Component Pipeline ──> Optimized HTML Response`
  },
  rails: {
    description: "Convention-over-configuration Ruby on Rails 8 with Ruby 3.4 YJIT compilation, Propshaft asset pipeline, and ActionView ERB.",
    diagram: `Client Browser ──> Puma Web Server ──> Rails 8 ActionDispatch ──> Ruby 3.4 YJIT ──> ActionView ERB Stream`
  },
  angular: {
    description: "Modern zoneless reactive Single Page Application (SPA) utilizing Angular 19/22 Standalone Components, Signals, and Vite build pipeline.",
    diagram: `Client Browser ──> Static CDN ──> Angular 19 Standalone Bundle ──> Signals Reactive Graph ──> Client DOM Mutation`
  },
  blazor: {
    description: "High-performance client-side WebAssembly execution running compiled C# .NET 8 IL code directly inside the browser VM.",
    diagram: `Client Browser ──> dotnet.js Bootstrapper ──> Mono WebAssembly Engine (.NET 8) ──> Compiled C# Razor Components ──> Browser Canvas`
  },
  buffalo: {
    description: "Compiled native Go binary with Plush SSR, Gorilla routing, and zero runtime dependencies delivering sub-40ms TTFB.",
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

export function EngineeringLab({ onSelectStack }: { onSelectStack?: (stackId: string) => void }) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [selectedRenderType, setSelectedRenderType] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"lighthouse" | "fcp" | "build" | "bundle">("lighthouse");
  const [compareList, setCompareList] = useState<string[]>(["nextjs", "django", "buffalo", "leptos"]);
  const [activeArchTab, setActiveArchTab] = useState<string>("nextjs");
  const [activeView, setActiveView] = useState<"overview" | "compare" | "benchmarks" | "architecture">("overview");

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
      if (sortBy === "lighthouse") return b.lighthouseScore - a.lighthouseScore;
      if (sortBy === "fcp") return a.fcpMs - b.fcpMs;
      if (sortBy === "build") return a.buildTimeSec - b.buildTimeSec;
      if (sortBy === "bundle") return a.bundleTransferKb - b.bundleTransferKb;
      return 0;
    });
  }, [selectedLanguage, selectedRenderType, sortBy]);

  const toggleCompare = (id: string) => {
    setCompareList((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const comparedStacks = useMemo(() => {
    return STACKS.filter((s) => compareList.includes(s.id));
  }, [compareList]);

  return (
    <div className="w-full text-white space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-neutral-900/90 via-neutral-950/80 to-neutral-900/90 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              SIGNATURE EXPERIMENT
            </span>
            <span className="text-[11px] font-mono text-neutral-400">12 STACKS. 1 PRODUCT.</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            THE 12-STACK ENGINEERING LABORATORY
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono max-w-2xl">
            One personal portfolio product implemented across 12 distinct programming frameworks and 11 languages.
            Compare real architecture, benchmarks, and runtime execution side-by-side.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="relative z-10 flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10 self-start md:self-auto shrink-0">
          <button
            onClick={() => setActiveView("overview")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === "overview"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveView("compare")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === "compare"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Compare ({compareList.length})
          </button>
          <button
            onClick={() => setActiveView("benchmarks")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === "benchmarks"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Benchmarks
          </button>
          <button
            onClick={() => setActiveView("architecture")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === "architecture"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Architecture
          </button>
        </div>
      </div>

      {/* VIEW 1: OVERVIEW & INTERACTIVE CARDS */}
      {activeView === "overview" && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-neutral-900/50 border border-white/10 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-neutral-400 font-mono flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                Language:
              </span>
              {["All", "TypeScript", "Python", "Java", "PHP", "Ruby", "C#", "Go", "Rust", "Dart", "Swift"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-2 py-0.5 rounded-md font-mono transition-all ${
                    selectedLanguage === lang
                      ? "bg-cyan-500 text-black font-bold"
                      : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-neutral-400 font-mono flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-black/60 border border-white/20 rounded-md px-2 py-1 text-xs text-neutral-200 font-mono focus:outline-none focus:border-cyan-500"
              >
                <option value="lighthouse">Lighthouse Score</option>
                <option value="fcp">Fastest FCP</option>
                <option value="bundle">Smallest Bundle</option>
                <option value="build">Fastest Build</option>
              </select>
            </div>
          </div>

          {/* Stacks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {filteredStacks.map((s) => {
              const isSelected = compareList.includes(s.id);
              return (
                <div
                  key={s.id}
                  className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-black border border-white/20 flex items-center justify-center font-bold text-xs text-cyan-300">
                          {s.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                            {s.name}
                          </h4>
                          <span className="text-[10px] font-mono text-neutral-400">{s.language}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
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
                    </div>

                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">{s.architecture}</p>

                    {/* Quick Metrics Badges */}
                    <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/5 text-center font-mono">
                      <div className="p-1.5 rounded-lg bg-black/40 border border-white/5">
                        <div className="text-[9px] text-neutral-500">Lighthouse</div>
                        <div className="text-xs font-bold text-emerald-400">{s.lighthouseScore}/100</div>
                      </div>
                      <div className="p-1.5 rounded-lg bg-black/40 border border-white/5">
                        <div className="text-[9px] text-neutral-500">FCP Speed</div>
                        <div className="text-xs font-bold text-cyan-400">{s.fcpMs}ms</div>
                      </div>
                      <div className="p-1.5 rounded-lg bg-black/40 border border-white/5">
                        <div className="text-[9px] text-neutral-500">Payload</div>
                        <div className="text-xs font-bold text-neutral-200">{s.bundleTransferKb}KB</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => onSelectStack?.(s.id)}
                      className="w-full py-2 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-semibold text-xs border border-cyan-500/40 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>✨ Launch {s.name} View</span>
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

      {/* VIEW 2: SIDE-BY-SIDE COMPARISON */}
      {activeView === "compare" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
            <span>Comparing {comparedStacks.length} of 12 implementations:</span>
            <button
              onClick={() => setCompareList(STACKS.map((s) => s.id))}
              className="text-cyan-400 hover:underline"
            >
              Select All 12 Stacks
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-neutral-950/60 shadow-2xl">
            <table className="w-full text-left text-xs font-mono border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-neutral-900/80 border-b border-white/10 text-neutral-400">
                  <th className="p-3.5 font-bold text-white">Stack Specification</th>
                  {comparedStacks.map((s) => (
                    <th key={s.id} className="p-3.5 font-bold text-white text-center">
                      <div className="text-sm text-cyan-300">{s.name}</div>
                      <div className="text-[10px] text-neutral-400 font-normal">{s.language}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-3.5 text-neutral-400 font-semibold">Architecture</td>
                  {comparedStacks.map((s) => (
                    <td key={s.id} className="p-3.5 text-neutral-300 text-center text-[11px] font-sans">
                      {s.architecture}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-3.5 text-neutral-400 font-semibold">Render Strategy</td>
                  {comparedStacks.map((s) => (
                    <td key={s.id} className="p-3.5 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-[10px]">
                        {s.renderType}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-3.5 text-neutral-400 font-semibold">Lighthouse Score</td>
                  {comparedStacks.map((s) => (
                    <td key={s.id} className="p-3.5 text-center font-bold text-emerald-400 text-sm">
                      {s.lighthouseScore} / 100
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-3.5 text-neutral-400 font-semibold">First Contentful Paint (FCP)</td>
                  {comparedStacks.map((s) => (
                    <td key={s.id} className="p-3.5 text-center text-cyan-400 font-bold">
                      {s.fcpMs} ms
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-3.5 text-neutral-400 font-semibold">Time to First Byte (TTFB)</td>
                  {comparedStacks.map((s) => (
                    <td key={s.id} className="p-3.5 text-center text-amber-300">
                      {s.ttfbMs} ms
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-3.5 text-neutral-400 font-semibold">Bundle Transfer Size</td>
                  {comparedStacks.map((s) => (
                    <td key={s.id} className="p-3.5 text-center text-neutral-200">
                      {s.bundleTransferKb} KB
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-3.5 text-neutral-400 font-semibold">Production Build Duration</td>
                  {comparedStacks.map((s) => (
                    <td key={s.id} className="p-3.5 text-center text-neutral-300">
                      {s.buildTimeSec} s
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-3.5 text-neutral-400 font-semibold">Actions</td>
                  {comparedStacks.map((s) => (
                    <td key={s.id} className="p-3.5 text-center">
                      <button
                        onClick={() => onSelectStack?.(s.id)}
                        className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[10px] font-bold border border-cyan-500/30 transition-all"
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

      {/* VIEW 3: BENCHMARKS DASHBOARD */}
      {activeView === "benchmarks" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Lighthouse Comparison Bar */}
          <div className="p-5 rounded-2xl bg-neutral-950/70 border border-white/10 space-y-3">
            <h4 className="text-xs font-bold font-mono text-neutral-400 flex items-center gap-1.5 uppercase">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Lighthouse Performance Index (Target: 100)
            </h4>
            <div className="space-y-2">
              {STACKS.map((s) => (
                <div key={s.id} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-neutral-300">{s.name} ({s.language})</span>
                    <span className="font-bold text-emerald-400">{s.lighthouseScore}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400"
                      style={{ width: `${s.lighthouseScore}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* First Contentful Paint (FCP) Bar */}
          <div className="p-5 rounded-2xl bg-neutral-950/70 border border-white/10 space-y-3">
            <h4 className="text-xs font-bold font-mono text-neutral-400 flex items-center gap-1.5 uppercase">
              <Zap className="w-4 h-4 text-cyan-400" />
              First Contentful Paint — FCP (Lower is Faster)
            </h4>
            <div className="space-y-2">
              {STACKS.map((s) => {
                const maxFcp = 400;
                const pct = Math.min(100, (s.fcpMs / maxFcp) * 100);
                return (
                  <div key={s.id} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-neutral-300">{s.name}</span>
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
        </div>
      )}

      {/* VIEW 4: ARCHITECTURE EXPLORER */}
      {activeView === "architecture" && (
        <div className="p-5 rounded-2xl bg-neutral-950/80 border border-white/10 space-y-4">
          <div className="flex flex-wrap items-center gap-1.5 pb-3 border-b border-white/10">
            {STACKS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveArchTab(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeArchTab === s.id
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          {/* Active Arch Details */}
          {(() => {
            const currentStack = STACKS.find((s) => s.id === activeArchTab) || STACKS[0];
            const archData = ARCHITECTURES_MAP[currentStack.id];
            return (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-lg font-black text-white">{currentStack.name} Architectural Flow</h4>
                    <p className="text-xs text-neutral-400 font-mono">
                      {currentStack.language} · {currentStack.runtime}
                    </p>
                  </div>
                  <a
                    href={currentStack.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:underline"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository ↗</span>
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                  {archData?.description}
                </p>

                {/* Mermaid Architecture Visualizer Block */}
                <div className="p-4 rounded-xl bg-black/80 border border-white/10 font-mono text-xs text-cyan-300 overflow-x-auto space-y-2">
                  <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
                    End-to-End Execution Pipeline
                  </div>
                  <div className="py-2 text-sm leading-relaxed whitespace-pre-wrap text-white">
                    {archData?.diagram}
                  </div>
                </div>

                {/* Key Architectural Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  {currentStack.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2 text-xs text-neutral-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
