import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Trophy, Cpu, Shield, Sparkles, Layers, Terminal } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "301 Super AI Agents — Sovereign Multi-Agent AI Platform | Reginald Alfret V",
  description:
    "Comprehensive case study of 301 Super AI Agents: A sovereign multi-agent AI platform orchestrating 301 specialised agents for offline inference, document OCR parsing, and workflow automation. 1st Place Champion at HackIndia 2026.",
  alternates: {
    canonical: "https://reginaldalfret.tech/projects/301-super-ai-agents",
  },
  openGraph: {
    title: "301 Super AI Agents — Sovereign Multi-Agent AI Platform | Reginald Alfret V",
    description:
      "A sovereign multi-agent AI platform orchestrating 301 specialised agents for offline inference, OCR document parsing, and automated workflows. Won 1st Place at HackIndia 2026 against 500+ teams nationwide.",
    url: "https://reginaldalfret.tech/projects/301-super-ai-agents",
    type: "website",
    locale: "en_US",
    siteName: "Reginald Alfret V Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "301 Super AI Agents — Sovereign Multi-Agent AI Platform",
    description:
      "A sovereign multi-agent AI platform orchestrating 301 specialised agents for offline inference, OCR parsing, and automated workflows. 1st Place at HackIndia 2026.",
  },
};

export default function Project301Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://reginaldalfret.tech/",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Projects",
            "item": "https://reginaldalfret.tech/#work",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "301 Super AI Agents",
            "item": "https://reginaldalfret.tech/projects/301-super-ai-agents",
          },
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://reginaldalfret.tech/projects/301-super-ai-agents#software",
        "name": "301 Super AI Agents",
        "alternateName": "Agent 301 Platform",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Linux, macOS, Windows (Local & Cloud)",
        "description":
          "A sovereign, local-first multi-agent AI platform orchestrating 301 specialised agents coordinated by a central orchestrator. Built with Ollama local LLMs, FastAPI, and React.js, featuring privacy-first offline inference, OCR document parsing, and real-time streaming automation.",
        "author": {
          "@type": "Person",
          "@id": "https://reginaldalfret.tech/#person",
          "name": "Reginald Alfret V",
        },
        "award": "1st Place — HackIndia 2026 (Selected 1st out of 500+ competing engineering teams nationwide)",
      },
    ],
  };

  const technologies = [
    "Python",
    "LLMs (Ollama)",
    "Agent Orchestration",
    "FastAPI",
    "React.js",
    "OCR",
    "Workflow Automation",
    "WebSockets",
    "Vector Embeddings",
  ];

  return (
    <div className="relative min-h-screen text-neutral-100 flex flex-col justify-between selection:bg-cyan-500/20 selection:text-cyan-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation Bar / Breadcrumbs */}
      <header className="fixed top-0 inset-x-0 z-50 glass-1 border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm font-mono truncate mr-4">
            <Link
              href="/"
              className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-neutral-600">/</span>
            <Link
              href="/#work"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Projects
            </Link>
            <span className="text-neutral-600">/</span>
            <span className="text-cyan-400 font-semibold truncate">301 Super AI Agents</span>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://github.com/reginaldalfret"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium glass-2 border border-white/10 text-neutral-200 hover:text-white transition-colors"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-20 w-full">
        <article className="space-y-12 sm:space-y-16">
          
          {/* Header Section */}
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest glass-2 text-cyan-300 border border-cyan-500/30">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Case Study • Engineering Deep Dive</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              301 Super AI Agents
            </h1>

            <p className="text-lg sm:text-2xl text-cyan-400 font-medium">
              Sovereign Multi-Agent AI Platform & Workflow Automation Engine
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold glass-3 border border-yellow-500/40 text-yellow-300 bg-yellow-500/10">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>1st Place Champion — HackIndia 2026 (500+ Teams Nationwide)</span>
              </div>
            </div>
          </header>

          {/* Project Summary Card */}
          <section aria-labelledby="section-overview" className="glass-3 rounded-3xl p-6 sm:p-10 border border-white/10 space-y-4">
            <h2 id="section-overview" className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span>Executive Overview</span>
            </h2>
            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              <p>
                <strong>301 Super AI Agents</strong> is a sovereign, local-first multi-agent artificial intelligence platform designed to orchestrate 301 specialised AI agents for enterprise automation, analytical processing, and intelligent workflow execution without compromising data sovereignty.
              </p>
              <p>
                Engineered with privacy-first paradigms, the platform allows organizations and technical operators to execute complex autonomous agent workflows locally using Ollama and open-weight models, eliminating external API dependency and recurring inference costs while safeguarding sensitive enterprise telemetry.
              </p>
            </div>
          </section>

          {/* Core Technical Highlights */}
          <section aria-labelledby="section-architecture" className="space-y-6">
            <h2 id="section-architecture" className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>System Architecture & Capabilities</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="glass-2 rounded-2xl p-5 sm:p-6 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-base">
                  <Terminal className="w-4 h-4" />
                  <span>Central Orchestrator (Agent 301)</span>
                </div>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Engineered an intelligent hierarchical supervisor (Agent 301) that parses complex user prompts, deconstructs intents into sub-tasks, and dynamically dispatches tasks across specialized sub-agents with automatic state management and consensus validation.
                </p>
              </div>

              <div className="glass-2 rounded-2xl p-5 sm:p-6 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-base">
                  <Shield className="w-4 h-4" />
                  <span>Sovereign Local Inference</span>
                </div>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Integrated Ollama runtime support allowing on-device local execution of cutting-edge LLMs. Ensures zero data exfiltration for privacy-critical documents, legal briefs, and proprietary enterprise knowledge.
                </p>
              </div>

              <div className="glass-2 rounded-2xl p-5 sm:p-6 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-base">
                  <Cpu className="w-4 h-4" />
                  <span>OCR & Multi-Modal Document Parsing</span>
                </div>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Built OCR-based automated document ingestion capable of processing scanned PDFs, invoices, and structured imagery, transforming unstructured graphical text into tokenized context streams.
                </p>
              </div>

              <div className="glass-2 rounded-2xl p-5 sm:p-6 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-base">
                  <Sparkles className="w-4 h-4" />
                  <span>Real-Time Streaming & Workflows</span>
                </div>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Constructed high-throughput asynchronous communication channels with FastAPI and WebSockets, enabling real-time token streaming and dynamic multi-step execution graphs in a reactive React.js UI.
                </p>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section aria-labelledby="section-tech" className="glass-2 rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
            <h2 id="section-tech" className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Technology Stack & Tools
            </h2>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono glass-1 text-cyan-300 border border-cyan-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Hackathon Achievement Details */}
          <section aria-labelledby="section-achievement" className="glass-3 rounded-3xl p-6 sm:p-8 border border-yellow-500/30 bg-yellow-500/5 space-y-3">
            <h2 id="section-achievement" className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span>Verified Competition Record</span>
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              <strong>HackIndia 2026 Champion:</strong> 301 Super AI Agents won 1st place in HackIndia 2026, competing against over 500 engineering teams across India. The project was commended by industry judges for its architectural stability, local-first execution capability, and real-world multi-agent coordination performance.
            </p>
          </section>

          {/* Inter-Project / Sibling Navigation */}
          <nav aria-label="Explore other projects" className="pt-6 border-t border-white/10 space-y-4">
            <p className="text-xs uppercase tracking-widest font-mono text-neutral-400">Next Case Studies</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/projects/tor-unveil"
                className="group p-5 rounded-2xl glass-2 border border-white/10 hover:border-rose-500/40 transition-all flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>Project 02</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-rose-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base group-hover:text-rose-400 transition-colors">
                    TOR-UNVEIL
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Dark Web AI Cybercriminal Tracker • TN Police Hackathon 1st Place
                  </p>
                </div>
              </Link>

              <Link
                href="/projects/ai-crop-recommendation"
                className="group p-5 rounded-2xl glass-2 border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>Project 03</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base group-hover:text-emerald-400 transition-colors">
                    AI Crop Recommendation
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Agri-Intelligence Engine • Blaze a Trail 2.0 1st Place
                  </p>
                </div>
              </Link>
            </div>
          </nav>

        </article>
      </main>

      <Footer />
    </div>
  );
}
