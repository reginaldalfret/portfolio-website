"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Download,
  Printer,
  ExternalLink,
  FileText,
  Sparkles,
  Award,
  Briefcase,
  GraduationCap,
  Code2,
  CheckCircle2,
  Layers,
  Shield,
  Eye,
  GitPullRequest,
  Terminal,
  Database,
  Cpu,
  Wrench,
  BookOpen,
  Activity,
  ArrowRight,
} from "lucide-react";
import { OrgLogo } from "@/components/opensource/OrgLogos";
import { EngineeringLab } from "@/components/stacks/EngineeringLab";

const CONTRIBUTIONS = [
  { org: "Apple", repo: "swift-numerics", pr: "#355", url: "https://github.com/apple/swift-numerics/pull/355", key: "apple" },
  { org: "Google", repo: "Highway", pr: "#3511", url: "https://github.com/google/highway/pull/3511", key: "google" },
  { org: "Google Cloud", repo: "Data Validator", pr: "#1863", url: "https://github.com/GoogleCloudPlatform/professional-services-data-validator/pull/1863", key: "googlecloud" },
  { org: "Microsoft", repo: "Semantic Kernel", pr: "#14472", url: "https://github.com/microsoft/semantic-kernel/pull/14472", key: "microsoft" },
  { org: "AWS", repo: "Lambda Powertools", pr: "#8542", url: "https://github.com/aws-powertools/powertools-lambda-python/pull/8542", key: "aws" },
  { org: "Meta", repo: "StyleX", pr: "#1899", url: "https://github.com/facebook/stylex/pull/1899", key: "meta" },
  { org: "NVIDIA", repo: "cuOpt", pr: "#2068", url: "https://github.com/NVIDIA/cuopt/pull/2068", key: "nvidia" },
  { org: "NASA", repo: "ProgPy", pr: "#237", url: "https://github.com/nasa/prog_models/pull/237", key: "nasa" },
  { org: "Azure", repo: "Cosmos DB Emulator", pr: "#359", url: "https://github.com/Azure/azure-cosmos-db-emulator-docker/pull/359", key: "azure" },
  { org: "Adobe", repo: "Skills", pr: "#445", url: "https://github.com/adobe/skills/pull/445", key: "adobe" },
  { org: "Intel", repo: "AutoRound", pr: "#2421", url: "https://github.com/intel/auto-round/pull/2421", key: "intel" },
  { org: "IBM", repo: "Docling Pipelines", pr: "#85", url: "https://github.com/IBM/docling-pipelines/pull/85", key: "ibm" },
  { org: "Uber", repo: "Kraken", pr: "#716", url: "https://github.com/uber/kraken/pull/716", key: "uber" },
  { org: "Airbnb", repo: "MagazineLayout", pr: "#169", url: "https://github.com/airbnb/MagazineLayout/pull/169", key: "airbnb" },
  { org: "GitHub", repo: "GitHub CLI", pr: "#14592", url: "https://github.com/cli/cli/pull/14592", key: "github" },
  { org: "Dell", repo: "Omnia Containers", pr: "#649", url: "https://github.com/dell/omnia/pull/649", key: "dell" },
  { org: "Salesforce", repo: "tough-cookie", pr: "#659", url: "https://github.com/salesforce/tough-cookie/pull/659", key: "salesforce" },
  { org: "AMD", repo: "ROCm HRX System", pr: "#1231", url: "https://github.com/ROCm/hrx-system/pull/1231", key: "rocm" },
  { org: "SAP", repo: "E-Mobility Simulator", pr: "#2136", url: "https://github.com/SAP/e-mobility-charging-stations-simulator/pull/2136", key: "sap" },
  { org: "Pinterest", repo: "PyMemcache", pr: "#657", url: "https://github.com/pinterest/pymemcache/pull/657", key: "pinterest" },
  { org: "Qualcomm", repo: "Commit Msg Check", pr: "#38", url: "https://github.com/qualcomm/commit-msg-check-action/pull/38", key: "qualcomm" },
  { org: "Stripe", repo: "Stripe React Native", pr: "#2751", url: "https://github.com/stripe/stripe-react-native/pull/2751", key: "stripe" },
  { org: "Docker", repo: "Docker Docs", pr: "#26266", url: "https://github.com/docker/docs/pull/26266", key: "docker" },
  { org: "Apache", repo: "HertzBeat", pr: "#4410", url: "https://github.com/apache/hertzbeat/pull/4410", key: "apache" },
  { org: "Cloudflare", repo: "CFSSL", pr: "#1451", url: "https://github.com/cloudflare/cfssl/pull/1451", key: "cloudflare" },
  { org: "OpenAI", repo: "Softnet", pr: "#219", url: "https://github.com/openai/softnet/pull/219", key: "openai" },
  { org: "Snapchat", repo: "ts-inject", pr: "#30", url: "https://github.com/Snapchat/ts-inject/pull/30", key: "snapchat" },
  { org: "Spotify", repo: "Confidence SDK Swift", pr: "#272", url: "https://github.com/spotify/confidence-sdk-swift/pull/272", key: "spotify" },
  { org: "Cisco", repo: "cJOSE", pr: "#202", url: "https://github.com/cisco/cjose/pull/202", key: "cisco" },
  { org: "Netflix", repo: "Atlas", pr: "#2011", url: "https://github.com/Netflix/atlas/pull/2011", key: "netflix" },
];

export function ResumePortfolio() {
  const [viewMode, setViewMode] = useState<"interactive" | "pdf">("interactive");
  const [activeStack, setActiveStack] = useState<"nextjs" | "nuxt" | "django" | "springboot" | "laravel" | "rails" | "angular" | "blazor" | "buffalo" | "leptos" | "jaspr" | "vapor">("nextjs");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const stack = params.get("stack");
      if (stack === "nuxt" || stack === "django" || stack === "nextjs" || stack === "springboot" || stack === "laravel" || stack === "rails" || stack === "angular" || stack === "blazor" || stack === "buffalo" || stack === "leptos" || stack === "jaspr" || stack === "vapor") {
        setActiveStack(stack as "nextjs" | "nuxt" | "django" | "springboot" | "laravel" | "rails" | "angular" | "blazor" | "buffalo" | "leptos" | "jaspr" | "vapor");
      }
    }
  }, []);

  const switchStack = (stack: "nextjs" | "nuxt" | "django" | "springboot" | "laravel" | "rails" | "angular" | "blazor" | "buffalo" | "leptos" | "jaspr" | "vapor") => {
    setActiveStack(stack);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (stack === "nextjs") {
        url.searchParams.delete("stack");
      } else {
        url.searchParams.set("stack", stack);
      }
      window.history.pushState({}, "", url.toString());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 py-3 sm:py-5 px-2 sm:px-4 md:px-6 lg:px-8 selection:bg-cyan-500/20 selection:text-cyan-200 w-full overflow-x-hidden">
      {/* Top Floating Glass Command Bar */}
      <div className={`mx-auto mb-4 sm:mb-6 sticky top-2 sm:top-3 z-50 transition-all w-full max-w-[99vw] 2xl:max-w-[1750px] px-1 sm:px-2`}>

        <div className="backdrop-blur-xl bg-black/60 border border-white/10 rounded-2xl p-2.5 sm:p-3 shadow-2xl flex flex-wrap items-center justify-between gap-3">
          {/* Brand Identity */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-black font-black text-sm">
              RA
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide text-white">Reginald Alfret V</div>
              <div className="text-[11px] text-cyan-400 font-mono tracking-wider">RESUME PORTFOLIO</div>
            </div>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 text-xs">
            <button
              onClick={() => setViewMode("interactive")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                viewMode === "interactive"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Resume</span>
            </button>
            <button
              onClick={() => setViewMode("pdf")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                viewMode === "pdf"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Original PDF Document</span>
            </button>
          </div>

          {/* Quick Actions */}
            <a
              href="/lab"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-colors"
              title="Explore the 12 Stacks. 1 Product. Engineering Lab"
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Engineering Lab</span>
            </a>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors"
              title="Print Resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <a
              href="/Reginald_Alfret_Resume.pdf"
              download="Reginald_Alfret_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-black" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className={`mx-auto w-full transition-all w-full max-w-[99vw] 2xl:max-w-[1750px] px-1 sm:px-2`}>

        {activeStack === "nuxt" ? (
          /* Nuxt 3 Live Stack Mode */
          <div className="backdrop-blur-2xl bg-neutral-950/90 border border-emerald-500/40 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 md:p-5 shadow-2xl space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center font-bold text-sm text-emerald-400">
                  ▲
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>Nuxt 3 Architecture</span>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono">
                    Vue 3 (Composition API) · Nitro Engine · Vite · Tailwind CSS
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => switchStack("nextjs")}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors"
                >
                  ← Back to Next.js
                </button>
                <a
                  href="/stacks/nuxt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-colors"
                >
                  <span>Open Full Window</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <div className="w-full h-[88vh] sm:h-[91vh] md:h-[93vh] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-[#050505]">
              <iframe
                src="/stacks/nuxt"
                className="w-full h-full border-0"
                title="Nuxt 3 Stack Portfolio"
              />
            </div>
          </div>
        ) : activeStack === "django" ? (
          /* Django Live Stack Mode */
          <div className="backdrop-blur-2xl bg-neutral-950/90 border border-amber-500/40 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 md:p-5 shadow-2xl space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-600/50 flex items-center justify-center font-bold text-sm text-emerald-300">
                  dj
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>Django 6 Architecture</span>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono">
                    Python 3.13.17 · Django SSR Templates · Tailwind CSS
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => switchStack("nextjs")}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors"
                >
                  ← Back to Next.js
                </button>
                <a
                  href="/stacks/django"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors"
                >
                  <span>Open Full Window</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <div className="w-full h-[88vh] sm:h-[91vh] md:h-[93vh] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-[#050505]">
              <iframe
                src="/stacks/django"
                className="w-full h-full border-0"
                title="Django Stack Portfolio"
              />
            </div>
          </div>
        ) : activeStack === "springboot" ? (
          /* Spring Boot Live Stack Mode */
          <div className="backdrop-blur-2xl bg-neutral-950/90 border border-lime-500/40 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 md:p-5 shadow-2xl space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-lime-950/80 border border-lime-500/50 flex items-center justify-center font-bold text-sm text-lime-400">
                  🍃
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>Spring Boot 3 Architecture</span>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-lime-500/20 text-lime-300 border border-lime-500/40 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono">
                    Java 21 · Spring MVC · Thymeleaf SSR · Embedded Tomcat · Tailwind CSS
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => switchStack("nextjs")}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors"
                >
                  ← Back to Next.js
                </button>
                <a
                  href="/stacks/springboot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-lime-500/20 hover:bg-lime-500/30 text-lime-300 border border-lime-500/40 transition-colors"
                >
                  <span>Open Full Window</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <div className="w-full h-[88vh] sm:h-[91vh] md:h-[93vh] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-[#050505]">
              <iframe
                src="/stacks/springboot"
                className="w-full h-full border-0"
                title="Spring Boot Stack Portfolio"
              />
            </div>
          </div>
        ) : activeStack === "laravel" ? (
          /* Laravel Live Stack Mode */
          <div className="backdrop-blur-2xl bg-neutral-950/90 border border-red-500/40 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 md:p-5 shadow-2xl space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-950/80 border border-red-500/50 flex items-center justify-center font-bold text-sm text-red-400">
                  ▲
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>Laravel 11/12 Architecture</span>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono">
                    PHP 8.4 · Laravel MVC · Blade Templates · Tailwind CSS · Artisan Engine
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => switchStack("nextjs")}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors"
                >
                  ← Back to Next.js
                </button>
                <a
                  href="/stacks/laravel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 transition-colors"
                >
                  <span>Open Full Window</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <div className="w-full h-[88vh] sm:h-[91vh] md:h-[93vh] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-[#050505]">
              <iframe
                src="/stacks/laravel"
                className="w-full h-full border-0"
                title="Laravel Stack Portfolio"
              />
            </div>
          </div>
        ) : activeStack === "rails" ? (
          /* Ruby on Rails Live Stack Mode */
          <div className="backdrop-blur-2xl bg-neutral-950/90 border border-rose-500/40 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 md:p-5 shadow-2xl space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-950/80 border border-rose-500/50 flex items-center justify-center font-bold text-sm text-rose-400">
                  💎
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>Ruby on Rails 8 Architecture</span>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono">
                    Ruby 3.4 · Rails 8 · ActionView ERB SSR · Tailwind CSS · WEBrick / Puma
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => switchStack("nextjs")}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors"
                >
                  ← Back to Next.js
                </button>
                <a
                  href="/stacks/rails"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 transition-colors"
                >
                  <span>Open Full Window</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <div className="w-full h-[88vh] sm:h-[91vh] md:h-[93vh] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-[#050505]">
              <iframe
                src="/stacks/rails"
                className="w-full h-full border-0"
                title="Ruby on Rails Stack Portfolio"
              />
            </div>
          </div>
        ) : activeStack === "angular" ? (
          /* Angular Live Stack Mode */
          <div className="backdrop-blur-2xl bg-neutral-950/90 border border-red-600/40 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 md:p-5 shadow-2xl space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-950/80 border border-red-500/50 flex items-center justify-center font-bold text-sm text-red-400">
                  A
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>Angular 19/22 Architecture</span>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono">
                    TypeScript 6.0 · Standalone Components · Signals · Tailwind CSS · Vite
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => switchStack("nextjs")}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors"
                >
                  ← Back to Next.js
                </button>
                <a
                  href="/stacks/angular"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 transition-colors"
                >
                  <span>Open Full Window</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <div className="w-full h-[88vh] sm:h-[91vh] md:h-[93vh] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-[#050505]">
              <iframe
                src="/stacks/angular"
                className="w-full h-full border-0"
                title="Angular Stack Portfolio"
              />
            </div>
          </div>
        ) : activeStack === "blazor" ? (
          /* Blazor WASM Live Stack Mode */
          <div className="backdrop-blur-2xl bg-neutral-950/90 border border-purple-600/40 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 md:p-5 shadow-2xl space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-950/80 border border-purple-500/50 flex items-center justify-center font-bold text-sm text-purple-300">
                  B
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>.NET 8 Blazor WASM Architecture</span>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono">
                    .NET 8 · C# Client-Side WASM · Standalone SPA · Tailwind CSS
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => switchStack("nextjs")}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors"
                >
                  ← Back to Next.js
                </button>
                <a
                  href="/stacks/blazor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 transition-colors"
                >
                  <span>Open Full Window</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <div className="w-full h-[88vh] sm:h-[91vh] md:h-[93vh] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-[#050505]">
              <iframe
                src="/stacks/blazor"
                className="w-full h-full border-0"
                title="Blazor WASM Stack Portfolio"
              />
            </div>
          </div>
        ) : activeStack === "buffalo" ? (
          /* Go Buffalo Live Stack Mode */
          <div className="backdrop-blur-2xl bg-neutral-950/90 border border-cyan-500/40 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 md:p-5 shadow-2xl space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center font-bold text-sm text-cyan-300">
                  🦬
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>Go Buffalo Architecture</span>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono">
                    Go 1.27 · Buffalo Web Framework · Plush SSR · Gorilla Mux · Tailwind CSS
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => switchStack("nextjs")}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors"
                >
                  ← Back to Next.js
                </button>
                <a
                  href="/stacks/buffalo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-colors"
                >
                  <span>Open Full Window</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <div className="w-full h-[88vh] sm:h-[91vh] md:h-[93vh] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-[#050505]">
              <iframe
                src="/stacks/buffalo"
                className="w-full h-full border-0"
                title="Go Buffalo Stack Portfolio"
              />
            </div>
          </div>
        ) : activeStack === "leptos" ? (
          /* Leptos Live Stack Mode */
          <div className="backdrop-blur-2xl bg-neutral-950/90 border border-orange-500/40 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 md:p-5 shadow-2xl space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-950/80 border border-orange-500/50 flex items-center justify-center font-bold text-sm text-orange-400">
                  🦀
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>Leptos Architecture</span>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/40 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono">
                    Rust 1.99.1 · Leptos 0.7 · WebAssembly · Client-Side Rendering (CSR) · Tailwind CSS
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => switchStack("nextjs")}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors"
                >
                  ← Back to Next.js
                </button>
                <a
                  href="/stacks/leptos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/40 transition-colors"
                >
                  <span>Open Full Window</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <div className="w-full h-[88vh] sm:h-[91vh] md:h-[93vh] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-[#050505]">
              <iframe
                src="/stacks/leptos"
                className="w-full h-full border-0"
                title="Leptos Stack Portfolio"
              />
            </div>
          </div>
        ) : activeStack === "jaspr" ? (
          /* Jaspr Live Stack Mode */
          <div className="backdrop-blur-2xl bg-neutral-950/90 border border-emerald-500/40 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 md:p-5 shadow-2xl space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center font-bold text-sm text-emerald-400">
                  🎯
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>Jaspr Architecture</span>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono">
                    Dart 3.13 · Jaspr 0.23 · Server-Side Rendering (SSR) &amp; Client Hydration · Tailwind CSS
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => switchStack("nextjs")}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors"
                >
                  ← Back to Next.js
                </button>
                <a
                  href="/stacks/jaspr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-colors"
                >
                  <span>Open Full Window</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <div className="w-full h-[88vh] sm:h-[91vh] md:h-[93vh] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-[#050505]">
              <iframe
                src="/stacks/jaspr"
                className="w-full h-full border-0"
                title="Jaspr Stack Portfolio"
              />
            </div>
          </div>
        ) : activeStack === "vapor" ? (
          /* Vapor Live Stack Mode */
          <div className="backdrop-blur-2xl bg-neutral-950/90 border border-sky-500/40 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 md:p-5 shadow-2xl space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-950/80 border border-sky-500/50 flex items-center justify-center font-bold text-sm text-sky-400">
                  💧
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">Vapor 4 Architecture</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                      LIVE
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono">
                    Swift 5.10 / 6.0 · Vapor 4 (SwiftNIO) · Leaf / Dynamic SSR · Tailwind CSS
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => switchStack("nextjs")}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors"
                >
                  ← Back to Next.js
                </button>
                <a
                  href="/stacks/vapor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 transition-colors"
                >
                  <span>Open Full Window</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <div className="w-full h-[88vh] sm:h-[91vh] md:h-[93vh] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-[#050505]">
              <iframe
                src="/stacks/vapor"
                className="w-full h-full border-0"
                title="Vapor Stack Portfolio"
              />
            </div>
          </div>
        ) : viewMode === "pdf" ? (
          /* PDF Viewer Mode */
          <div className="backdrop-blur-2xl bg-neutral-950/80 border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base font-semibold text-white">Reginald_Alfret_Resume.pdf</h2>
                <span className="text-xs font-mono text-neutral-400 px-2 py-0.5 rounded bg-white/5 border border-white/5">
                  1 Page Visual Resume
                </span>
              </div>
              <a
                href="/Reginald_Alfret_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1"
              >
                <span>Open in new window</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="w-full h-[82vh] rounded-2xl overflow-hidden border border-white/5 bg-neutral-900/50">
              <iframe
                src="/Reginald_Alfret_Resume.pdf#view=FitH"
                className="w-full h-full border-0"
                title="Reginald Alfret V — Resume PDF"
              />
            </div>
          </div>
        ) : (
          /* Interactive Resume Canvas */
          <div className="backdrop-blur-2xl bg-neutral-950/80 border border-white/10 rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
            {/* Ambient Lighting Gradient accents */}
            <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 left-1/4 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

            {/* 1. Header / Contact Block */}
            <header className="relative text-center pb-8 border-b border-white/10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-2 font-display">
                REGINALD ALFRET V
              </h1>
              <p className="text-xs sm:text-sm md:text-base font-semibold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 uppercase mb-4">
                Open-Source Contributor · AI &amp; DS Engineer · Software Developer
              </p>

              {/* Contact Bar */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-neutral-300 mb-5">
                <a
                  href="mailto:reginaldalfret@gmail.com"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-red-400" />
                  <span>reginaldalfret@gmail.com</span>
                </a>
                <a
                  href="tel:+918122087088"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>+91 81220 87088</span>
                </a>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Chennai, India</span>
                </span>
                <a
                  href="https://github.com/reginaldalfret"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-white" />
                  <span>github.com/reginaldalfret</span>
                </a>
                <a
                  href="https://linkedin.com/in/reginaldalfret"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>linkedin.com/in/reginaldalfret</span>
                </a>
              </div>

              {/* Key Credentials Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <div className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                  <GitPullRequest className="w-3.5 h-3.5" />
                  <span>30 Merged PRs</span>
                </div>
                <div className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>70+ Built Projects</span>
                </div>
                <div className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>3× 1st Place Hackathons</span>
                </div>
              </div>
            </header>

            {/* 2. Open-Source Contributions Section */}
            <section className="py-8 border-b border-white/10" id="open-source">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 tracking-wide">
                    <span className="text-cyan-400">⚡</span> OPEN-SOURCE CONTRIBUTIONS
                  </h2>
                  <p className="text-xs text-neutral-400 font-mono">
                    30 pull requests merged across leading engineering organisations
                  </p>
                </div>
                <div className="text-[11px] font-mono text-cyan-400/80 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20 self-start sm:self-auto">
                  100% Verified Merged Upstream
                </div>
              </div>

              {/* 30 PRs Grid: 5 columns on desktop, 3 on tablet, 2 on mobile */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 gap-2.5">
                {CONTRIBUTIONS.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-5 h-5 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
                          <OrgLogo orgKey={item.key} className="w-4.5 h-4.5 shrink-0" />
                        </div>
                        <span className="text-xs font-bold text-neutral-200 truncate group-hover:text-white">
                          {item.org}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 group-hover:bg-cyan-500/20 shrink-0">
                        {item.pr}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                      <span className="truncate">{item.repo}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400 shrink-0 ml-1" />
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* 3. Main Resume Body: 2 Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 border-b border-white/10">
              {/* Left Column (7 cols): Summary, Experience, Projects */}
              <div className="lg:col-span-7 space-y-8">
                {/* Professional Summary */}
                <section>
                  <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <span className="text-base">👨‍💻</span> Professional Summary
                  </h2>
                  <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-300 bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                    Open-Source Contributor, AI &amp; Data Science Engineer and Software Developer (final-year B.Tech AI &amp; DS) building AI/ML systems, full-stack applications and scalable products. Currently building an ERP platform at <strong className="text-white">DailyGurus</strong>. Built 70+ projects, including three 1st-place hackathon winners (HackIndia 2026, TN Police Hackathon 2025, Blaze a Trail 2.0). Author of 30 merged open-source pull requests at Apple, Google, Microsoft, AWS, Meta, NVIDIA, NASA, Netflix, Stripe and more.
                  </p>
                </section>

                {/* Professional Experience */}
                <section>
                  <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="text-base">💼</span> Professional Experience
                  </h2>
                  <div className="space-y-4">
                    {/* Role 1 */}
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <div>
                          <span className="text-sm font-bold text-white">DailyGurus</span>
                          <span className="text-xs text-neutral-400 font-medium"> • Software Developer</span>
                        </div>
                        <div className="text-xs text-cyan-400/90 font-mono">
                          Jul 2026 – Present <span className="text-neutral-500">|</span> Chennai, India
                        </div>
                      </div>
                      <ul className="text-xs text-neutral-300 space-y-1.5 list-disc list-inside">
                        <li>Worked on ERPNext, contributing to module customizations, workflows and application development.</li>
                        <li>Developing a full ERP software platform from scratch across frontend, backend, database and business logic layers.</li>
                        <li>Building web applications and REST APIs with React.js, Node.js and TypeScript for scalable, reliable systems.</li>
                      </ul>
                    </div>

                    {/* Role 2 */}
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <div>
                          <span className="text-sm font-bold text-white">Data Patterns</span>
                          <span className="text-xs text-neutral-400 font-medium"> • Data Science Intern</span>
                        </div>
                        <div className="text-xs text-cyan-400/90 font-mono">
                          May 2025 – Jun 2025 <span className="text-neutral-500">|</span> Chennai, India
                        </div>
                      </div>
                      <ul className="text-xs text-neutral-300 space-y-1.5 list-disc list-inside">
                        <li>Built Python web-scraping tools to collect aerospace research papers and technical data from IEEE sources.</li>
                        <li>Curated the data and fine-tuned an LLM using LoRA (Low-Rank Adaptation) on the domain-specific dataset.</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Key Projects */}
                <section>
                  <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="text-base">🚀</span> Key Projects
                  </h2>
                  <div className="space-y-4">
                    {/* Project 1 */}
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <h3 className="text-sm font-bold text-white">
                          <Link href="/projects/301-super-ai-agents" className="hover:text-cyan-400 transition-colors">
                            301 Super AI Agents — Sovereign Multi-Agent AI Platform
                          </Link>
                        </h3>
                        <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          1st · HackIndia 2026 (500+ Teams)
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 italic">
                        Local-first multi-agent AI platform with 301 specialised agents for real-world task automation.
                      </p>
                      <div className="flex flex-wrap gap-1 text-[11px] font-mono text-neutral-300">
                        {["Python", "LLMs (Ollama)", "Agent Orchestration", "FastAPI", "React.js", "OCR", "Workflow Automation"].map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/5">
                            {t}
                          </span>
                        ))}
                      </div>
                      <ul className="text-xs text-neutral-300 space-y-1 list-disc list-inside">
                        <li>Designed a multi-agent platform with 301 specialised agents coordinated by a central Agent 301.</li>
                        <li>Implemented local model selection, OCR document parsing, real-time streaming and automation.</li>
                        <li>Built an interface supporting offline, on-device inference for privacy-sensitive environments.</li>
                      </ul>
                      <div className="pt-2 flex items-center justify-between border-t border-white/5">
                        <Link
                          href="/projects/301-super-ai-agents"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:underline"
                        >
                          <span>Read Full Architecture Case Study</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <span className="text-[10px] font-mono text-neutral-500">Offline Multi-Agent AI</span>
                      </div>
                    </div>

                    {/* Project 2 */}
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <h3 className="text-sm font-bold text-white">
                          <Link href="/projects/tor-unveil" className="hover:text-rose-400 transition-colors">
                            TOR-UNVEIL — Dark Web AI Cybercriminal Tracker
                          </Link>
                        </h3>
                        <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          1st · TN Police Hackathon 2025
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 italic">
                        Full-stack AI platform adapted for live operational use by Tamil Nadu Police.
                      </p>
                      <div className="flex flex-wrap gap-1 text-[11px] font-mono text-neutral-300">
                        {["Python", "React.js", "Node.js", "Tailwind CSS", "Machine Learning", "Data Analytics"].map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/5">
                            {t}
                          </span>
                        ))}
                      </div>
                      <ul className="text-xs text-neutral-300 space-y-1 list-disc list-inside">
                        <li>Built a platform for real-time cybercriminal identification and network profiling on TOR dark web.</li>
                        <li>Developed search, suspect profile cards and network-graph visualisations with ML classification.</li>
                      </ul>
                      <div className="pt-2 flex items-center justify-between border-t border-white/5">
                        <Link
                          href="/projects/tor-unveil"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:underline"
                        >
                          <span>Read Case Study &amp; Forensic Breakdown</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <span className="text-[10px] font-mono text-neutral-500">Law Enforcement Analytics</span>
                      </div>
                    </div>

                    {/* Project 3 */}
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <h3 className="text-sm font-bold text-white">
                          <Link href="/projects/ai-crop-recommendation" className="hover:text-emerald-400 transition-colors">
                            AI Crop Recommendation &amp; Agri-Intelligence Engine
                          </Link>
                        </h3>
                        <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          1st · Blaze a Trail 2.0
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 italic">
                        ML-powered recommendation system for precision farming.
                      </p>
                      <div className="flex flex-wrap gap-1 text-[11px] font-mono text-neutral-300">
                        {["Python", "Machine Learning", "React.js", "REST APIs", "GIS Data", "Explainable AI"].map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/5">
                            {t}
                          </span>
                        ))}
                      </div>
                      <ul className="text-xs text-neutral-300 space-y-1 list-disc list-inside">
                        <li>Built an ML engine using soil, weather and GIS datasets to deliver actionable farming insights.</li>
                        <li>Integrated REST API backend with React.js dashboard; applied Explainable AI for accessibility.</li>
                      </ul>
                      <div className="pt-2 flex items-center justify-between border-t border-white/5">
                        <Link
                          href="/projects/ai-crop-recommendation"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline"
                        >
                          <span>Read Agritech ML Architecture</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <span className="text-[10px] font-mono text-neutral-500">Precision Agritech ML</span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column (5 cols): Skills, Education, Achievements, Certifications */}
              <div className="lg:col-span-5 space-y-8">
                {/* Technical Skills */}
                <section>
                  <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="text-base">🛠️</span> Technical Skills
                  </h2>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3.5 text-xs">
                    <div>
                      <div className="font-semibold text-white mb-1.5 flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                        <span>AI &amp; Data Science</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {["Machine Learning", "Deep Learning", "LLMs", "LoRA", "Prompt Engineering", "OCR", "Computer Vision", "Explainable AI", "Scikit-learn", "Data Analytics"].map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono text-[11px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold text-white mb-1.5 flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-sky-400" />
                        <span>Languages</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {["Python", "JavaScript (ES6+)", "TypeScript", "SQL", "HTML5", "CSS3", "Go", "Swift", "C++"].map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded bg-white/5 text-neutral-200 border border-white/10 font-mono text-[11px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold text-white mb-1.5 flex items-center gap-1.5">
                        <GitPullRequest className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Open Source</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {["Git", "GitHub", "Pull Requests", "Code Review", "Bug Fixing", "Regression Testing", "Documentation", "CVE Fixes"].map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono text-[11px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold text-white mb-1.5 flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-purple-400" />
                        <span>Software Development</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {["React.js", "Node.js", "Express.js", "FastAPI", "REST APIs", "Tailwind CSS", "Bootstrap", "Material UI", "ERPNext"].map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/10 font-mono text-[11px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold text-white mb-1.5 flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 text-amber-400" />
                        <span>Databases</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {["PostgreSQL", "MySQL", "MongoDB"].map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/10 font-mono text-[11px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold text-white mb-1.5 flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-pink-400" />
                        <span>Tools &amp; Platforms</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {["Docker", "AWS", "Linux", "Postman", "Figma", "VS Code"].map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/10 font-mono text-[11px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Education */}
                <section>
                  <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="text-base">🎓</span> Education
                  </h2>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                    <div className="font-bold text-sm text-white">
                      B.Tech – Artificial Intelligence &amp; Data Science
                    </div>
                    <div className="text-xs text-neutral-300">
                      St. Joseph&apos;s Institute of Technology, Chennai
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-400 pt-1">
                      <span>2023 – 2027</span>
                      <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                        CGPA 8.2 / 10 · No Arrears
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-400 pt-2 border-t border-white/5">
                      <strong className="text-neutral-300">Languages:</strong> English, Tamil, Malayalam
                    </div>
                  </div>
                </section>

                {/* Achievements */}
                <section>
                  <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="text-base">🏆</span> Achievements
                  </h2>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
                    <div className="flex items-start gap-2 text-neutral-200">
                      <span className="text-amber-400 font-bold">🥇</span>
                      <div>
                        <strong className="text-white">1st – HackIndia 2026</strong>{" "}
                        <span className="text-neutral-400">(301 Super AI Agents)</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-neutral-200">
                      <span className="text-amber-400 font-bold">🥇</span>
                      <div>
                        <strong className="text-white">1st – TN Police Hackathon 2025</strong>{" "}
                        <span className="text-neutral-400">(TOR-UNVEIL)</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-neutral-200">
                      <span className="text-amber-400 font-bold">🥇</span>
                      <div>
                        <strong className="text-white">1st – Blaze a Trail 2.0</strong>{" "}
                        <span className="text-neutral-400">(Crop Recommendation)</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-neutral-200">
                      <span className="text-sky-400 font-bold">🛡️</span>
                      <div>
                        <strong className="text-white">Finalist – TN Police Hackathon 2024</strong>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-neutral-200">
                      <span className="text-purple-400 font-bold">🏆</span>
                      <div>
                        <strong className="text-white">Winner – 6 National-Level Technical Symposiums</strong>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-neutral-200">
                      <span className="text-cyan-400 font-bold">🚀</span>
                      <div>
                        <strong className="text-white">70+ other projects</strong>{" "}
                        <span className="text-neutral-400">across AI, Web &amp; Automation</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Certifications */}
                <section>
                  <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="text-base">📜</span> Certifications
                  </h2>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400">🎓</span>
                      <span className="text-white font-medium">Meta Front-End Developer</span>
                      <span className="text-neutral-500 font-mono text-[11px] ml-auto">Coursera</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">🛡️</span>
                      <span className="text-white font-medium">Google Cybersecurity Certificate</span>
                      <span className="text-neutral-500 font-mono text-[11px] ml-auto">Coursera</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400">⚛️</span>
                      <span className="text-white font-medium">React: The Complete Guide</span>
                      <span className="text-neutral-500 font-mono text-[11px] ml-auto">Udemy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-pink-400">🎨</span>
                      <span className="text-white font-medium">Figma UI/UX Design Essentials</span>
                      <span className="text-neutral-500 font-mono text-[11px] ml-auto">Udemy</span>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* 4. Compact 12 Stacks. 1 Product. Engineering Lab Teaser */}
            <section className="py-8 border-b border-white/10 space-y-6" id="engineering-lab">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-neutral-900/90 via-neutral-950/80 to-neutral-900/90 border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        FEATURED ENGINEERING EXPERIMENT
                      </span>
                      <span className="text-xs font-mono text-neutral-400">
                        12 STACKS. 1 PRODUCT.
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
                      <span className="text-cyan-400">⚡</span> 12 Stacks. 1 Product.
                    </h2>

                    <p className="text-sm text-neutral-300 leading-relaxed font-light">
                      One product. Twelve technology ecosystems. A practical engineering experiment exploring how different technologies approach the same application — with genuine framework implementations, empirical benchmarks, and zero fabricated metrics.
                    </p>

                    {/* Compact Stack Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2">
                      {[
                        { name: 'Next.js 14', lang: 'React / TS' },
                        { name: 'Nuxt 3', lang: 'Vue 3 / Nitro' },
                        { name: 'Django 6', lang: 'Python 3.13' },
                        { name: 'Spring Boot 3', lang: 'Java 21' },
                        { name: 'Laravel 11', lang: 'PHP 8.4' },
                        { name: 'Ruby on Rails 8', lang: 'Ruby 3.4' },
                        { name: 'Angular 19', lang: 'Signals SPA' },
                        { name: 'Blazor WASM', lang: '.NET 8 C#' },
                        { name: 'Go Buffalo', lang: 'Go 1.24' },
                        { name: 'Leptos 0.7', lang: 'Rust WASM' },
                        { name: 'Jaspr Web', lang: 'Dart 3.13' },
                        { name: 'Vapor 4', lang: 'Swift 6.0' }
                      ].map((item) => (
                        <span
                          key={item.name}
                          className="px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 text-xs font-mono text-neutral-300 flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
                          <span className="text-white font-medium">{item.name}</span>
                          <span className="text-[10px] text-neutral-500">({item.lang})</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button to Lab */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3 pt-2 lg:pt-0 shrink-0">
                    <a
                      href="/lab"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all hover:scale-[1.02]"
                    >
                      <span>Explore the Engineering Lab</span>
                      <ArrowRight className="w-4 h-4 text-black" />
                    </a>
                    <span className="text-[11px] font-mono text-neutral-400">
                      Previews · Benchmarks · Architecture Diagrams
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Footer */}
            <footer className="pt-6 text-center text-xs text-neutral-500 space-y-3 font-mono">
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-neutral-400">
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  Home
                </Link>
                <span className="text-neutral-700">•</span>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  About Reginald
                </Link>
                <span className="text-neutral-700">•</span>
                <Link href="/lab" className="hover:text-cyan-400 transition-colors">
                  Engineering Lab
                </Link>
                <span className="text-neutral-700">•</span>
                <Link href="/projects/301-super-ai-agents" className="hover:text-cyan-400 transition-colors">
                  301 Super AI Agents
                </Link>
                <span className="text-neutral-700">•</span>
                <Link href="/projects/tor-unveil" className="hover:text-rose-400 transition-colors">
                  TOR-UNVEIL
                </Link>
                <span className="text-neutral-700">•</span>
                <Link href="/projects/ai-crop-recommendation" className="hover:text-emerald-400 transition-colors">
                  AI Crop Recommendation
                </Link>
              </div>
              <div className="text-neutral-400">
                BETTER TECHNOLOGY • HAPPIER PEOPLE •{" "}
                <Link href="/lab" className="text-cyan-400 hover:underline">
                  12 STACKS. 1 PRODUCT. LAB
                </Link>
              </div>
              <div>
                Designed &amp; built by Reginald Alfret V • Deployed on Vercel •{" "}
                <a
                  href="/Reginald_Alfret_Resume.pdf"
                  className="text-cyan-400 hover:underline"
                >
                  Download PDF
                </a>
              </div>
            </footer>
          </div>
        )}
      </div>

      </div>
  );
}
