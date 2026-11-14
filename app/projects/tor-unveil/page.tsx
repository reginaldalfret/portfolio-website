import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Trophy, ShieldAlert, Network, Sparkles, Layers, Lock, Search } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "TOR-UNVEIL — Dark Web AI Cybercriminal Tracker | Reginald Alfret V",
  description:
    "Engineering case study of TOR-UNVEIL: Full-stack AI dark web cybercriminal identification and suspect network tracking platform. 1st Place Winner at TN Police Hackathon 2025 and delivered for live operational deployment.",
  alternates: {
    canonical: "https://reginaldalfret.tech/projects/tor-unveil",
  },
  openGraph: {
    title: "TOR-UNVEIL — Dark Web AI Cybercriminal Tracker | Reginald Alfret V",
    description:
      "Full-stack AI platform built for operational-level dark web identification and monitoring, featuring suspect network graph profiling and ML threat classification. Adopted by Tamil Nadu Police.",
    url: "https://reginaldalfret.tech/projects/tor-unveil",
    type: "website",
    locale: "en_US",
    siteName: "Reginald Alfret V Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TOR-UNVEIL — Dark Web AI Cybercriminal Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TOR-UNVEIL — Dark Web AI Cybercriminal Tracker",
    description:
      "Full-stack AI platform built for operational dark web monitoring and suspect network graph profiling. Delivered for live operational deployment by Tamil Nadu Police.",
    images: ["/og-image.png"],
  },
};

export default function TorUnveilPage() {
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
            "name": "TOR-UNVEIL",
            "item": "https://reginaldalfret.tech/projects/tor-unveil",
          },
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://reginaldalfret.tech/projects/tor-unveil#software",
        "name": "TOR-UNVEIL",
        "applicationCategory": "SecurityApplication",
        "operatingSystem": "Cross-platform Web / Node.js / Python",
        "description":
          "Full-stack AI intelligence platform engineered for real-time cybercriminal identification, suspect network graph profiling, and machine learning-powered threat classification on the TOR dark web. Delivered for live operational use by Tamil Nadu Police.",
        "author": {
          "@type": "Person",
          "@id": "https://reginaldalfret.tech/#person",
          "name": "Reginald Alfret V",
        },
        "award": "1st Place — TN Police Hackathon 2025 (Delivered for live operational deployment by Tamil Nadu Police)",
      },
    ],
  };

  const technologies = [
    "Python",
    "React.js",
    "Node.js",
    "REST APIs",
    "Tailwind CSS",
    "Machine Learning",
    "Data Analytics",
    "Graph Network Analysis",
    "TOR Intelligence",
  ];

  return (
    <div className="relative min-h-screen text-neutral-100 flex flex-col justify-between selection:bg-rose-500/20 selection:text-rose-200">
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
            <span className="text-rose-400 font-semibold truncate">TOR-UNVEIL</span>
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest glass-2 text-rose-300 border border-rose-500/30">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>Law Enforcement AI • Intelligence Engineering</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              TOR-UNVEIL
            </h1>

            <p className="text-lg sm:text-2xl text-rose-400 font-medium">
              Dark Web AI Cybercriminal Tracker & Threat Intelligence Platform
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold glass-3 border border-yellow-500/40 text-yellow-300 bg-yellow-500/10">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>1st Place — TN Police Hackathon 2025 • Adopted for Operational Deployment</span>
              </div>
            </div>
          </header>

          {/* Project Summary Card */}
          <section aria-labelledby="section-overview" className="glass-3 rounded-3xl p-6 sm:p-10 border border-white/10 space-y-4">
            <h2 id="section-overview" className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <span>Executive Overview</span>
            </h2>
            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              <p>
                <strong>TOR-UNVEIL</strong> is a specialized full-stack intelligence and law-enforcement platform engineered for real-time cybercriminal identification, suspect tracking, and threat intelligence extraction across hidden services on the TOR dark web.
              </p>
              <p>
                Developed and presented at the prestigious TN Police Hackathon 2025, the platform secured <strong>1st place</strong> and was selected for live operational adoption by Tamil Nadu Police, equipping cybercrime investigation units with automated suspect network graph visualization and ML threat classification models.
              </p>
            </div>
          </section>

          {/* Core Technical Highlights */}
          <section aria-labelledby="section-architecture" className="space-y-6">
            <h2 id="section-architecture" className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-rose-400" />
              <span>Architecture & Key Engineering Capabilities</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="glass-2 rounded-2xl p-5 sm:p-6 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-semibold text-base">
                  <Network className="w-4 h-4" />
                  <span>Suspect Network Graph Profiling</span>
                </div>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Developed an interactive topological graph visualization engine that maps relationships between cryptocurrency wallet addresses, dark web forum handles, PGP key signatures, and illicit communication channels.
                </p>
              </div>

              <div className="glass-2 rounded-2xl p-5 sm:p-6 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-semibold text-base">
                  <Search className="w-4 h-4" />
                  <span>High-Volume Intelligence Search</span>
                </div>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Designed scalable search indexes and dynamic suspect profile dossier cards that consolidate fragmented intelligence data into coherent investigative profiles for police officers.
                </p>
              </div>

              <div className="glass-2 rounded-2xl p-5 sm:p-6 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-semibold text-base">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Machine Learning Threat Detection</span>
                </div>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Integrated supervised machine learning models to classify textual and structural patterns into granular threat severity levels, distinguishing low-risk chatter from critical cyber contraband operations.
                </p>
              </div>

              <div className="glass-2 rounded-2xl p-5 sm:p-6 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-semibold text-base">
                  <Lock className="w-4 h-4" />
                  <span>Role-Based Law Enforcement Access</span>
                </div>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Architected strict multi-tiered role-based access control (RBAC) accommodating field investigators, supervisory inspectors, and intelligence analysts with comprehensive audit logging.
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
                  className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono glass-1 text-rose-300 border border-rose-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Hackathon & Operational Adoption Details */}
          <section aria-labelledby="section-adoption" className="glass-3 rounded-3xl p-6 sm:p-8 border border-yellow-500/30 bg-yellow-500/5 space-y-3">
            <h2 id="section-adoption" className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span>Operational Adoption & Hackathon Victory</span>
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              <strong>TN Police Hackathon 2025:</strong> Awarded 1st place in the cyber intelligence track. The platform was evaluated directly by cybercrime division officers and senior leadership, resulting in direct operational deployment for ongoing cyber investigations within the state.
            </p>
          </section>

          {/* Inter-Project / Sibling Navigation */}
          <nav aria-label="Explore other projects" className="pt-6 border-t border-white/10 space-y-4">
            <p className="text-xs uppercase tracking-widest font-mono text-neutral-400">Next Case Studies</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/projects/301-super-ai-agents"
                className="group p-5 rounded-2xl glass-2 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>Project 01</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base group-hover:text-cyan-400 transition-colors">
                    301 Super AI Agents
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Sovereign Multi-Agent AI Platform • HackIndia 2026 Champion
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
