import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Trophy, Sprout, BarChart3, Sparkles, Layers, MapPin, Compass } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "AI Crop Recommendation — Agri-Intelligence Engine | Reginald Alfret V",
  description:
    "Engineering case study of AI Crop Recommendation: An explainable machine learning engine combining soil metrics, climate data, and GIS spatial parameters for precision agriculture. 1st Place at Blaze a Trail 2.0.",
  alternates: {
    canonical: "https://reginaldalfret.tech/projects/ai-crop-recommendation",
  },
  openGraph: {
    title: "AI Crop Recommendation — Agri-Intelligence Engine | Reginald Alfret V",
    description:
      "Machine learning recommendation engine combining soil nutrients, weather forecasts, and GIS spatial datasets with transparent Explainable AI. 1st Place Winner at Blaze a Trail 2.0.",
    url: "https://reginaldalfret.tech/projects/ai-crop-recommendation",
    type: "website",
    locale: "en_US",
    siteName: "Reginald Alfret V Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Crop Recommendation — Agri-Intelligence Engine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Crop Recommendation — Agri-Intelligence Engine",
    description:
      "Machine learning recommendation engine combining soil, weather, and GIS datasets with transparent Explainable AI. 1st Place Winner at Blaze a Trail 2.0.",
    images: ["/og-image.png"],
  },
};

export default function AiCropRecommendationPage() {
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
            "name": "AI Crop Recommendation",
            "item": "https://reginaldalfret.tech/projects/ai-crop-recommendation",
          },
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://reginaldalfret.tech/projects/ai-crop-recommendation#software",
        "name": "AI Crop Recommendation Engine",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Cross-platform Web / Python",
        "description":
          "Agricultural machine learning recommendation engine using soil parameters, weather forecasts, and GIS spatial datasets to deliver actionable precision farming insights with Explainable AI transparency.",
        "author": {
          "@type": "Person",
          "@id": "https://reginaldalfret.tech/#person",
          "name": "Reginald Alfret V",
        },
        "award": "1st Place — Blaze a Trail 2.0 (Honored for agricultural decision intelligence and transparent predictions)",
      },
    ],
  };

  const technologies = [
    "Python",
    "Machine Learning",
    "React.js",
    "REST APIs",
    "GIS Data",
    "Explainable AI (XAI)",
    "Data Analytics",
    "Scikit-Learn",
  ];

  return (
    <div className="relative min-h-screen text-neutral-100 flex flex-col justify-between selection:bg-emerald-500/20 selection:text-emerald-200">
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
            <span className="text-emerald-400 font-semibold truncate">AI Crop Recommendation</span>
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest glass-2 text-emerald-300 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Agri-Tech ML • Precision Intelligence</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              AI Crop Recommendation
            </h1>

            <p className="text-lg sm:text-2xl text-emerald-400 font-medium">
              Agri-Intelligence Engine Powered by GIS and Explainable AI
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold glass-3 border border-yellow-500/40 text-yellow-300 bg-yellow-500/10">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>1st Place — Blaze a Trail 2.0 • Precision Agriculture Champion</span>
              </div>
            </div>
          </header>

          {/* Project Summary Card */}
          <section aria-labelledby="section-overview" className="glass-3 rounded-3xl p-6 sm:p-10 border border-white/10 space-y-4">
            <h2 id="section-overview" className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <Sprout className="w-5 h-5 text-emerald-400" />
              <span>Executive Overview</span>
            </h2>
            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              <p>
                <strong>AI Crop Recommendation</strong> is a data-driven precision agriculture system that combines soil chemistry (Nitrogen, Phosphorus, Potassium, pH levels), climatic variables (temperature, humidity, precipitation), and Geographic Information Systems (GIS) spatial data to predict optimal crop yields.
              </p>
              <p>
                Recognized with <strong>1st Place at Blaze a Trail 2.0</strong>, the platform bridges the gap between complex artificial intelligence algorithms and practical farming decisions by embedding Explainable AI (XAI), ensuring agronomists and farmers clearly understand the rationale behind every recommendation.
              </p>
            </div>
          </section>

          {/* Core Technical Highlights */}
          <section aria-labelledby="section-architecture" className="space-y-6">
            <h2 id="section-architecture" className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-emerald-400" />
              <span>System Architecture & Capabilities</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="glass-2 rounded-2xl p-5 sm:p-6 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-base">
                  <BarChart3 className="w-4 h-4" />
                  <span>Explainable AI (XAI) Engine</span>
                </div>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Integrated feature attribution algorithms that demystify predictions into human-readable feature importances, showing how specific soil nutrient levels and rainfall projections directly influenced the crop suitability index.
                </p>
              </div>

              <div className="glass-2 rounded-2xl p-5 sm:p-6 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-base">
                  <MapPin className="w-4 h-4" />
                  <span>GIS Spatial Data Integration</span>
                </div>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Incorporated geospatial coordinates, topographical elevation factors, and regional micro-climates to contextualize farm plots within broader agronomic zones rather than relying on generic macro weather reports.
                </p>
              </div>

              <div className="glass-2 rounded-2xl p-5 sm:p-6 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-base">
                  <Compass className="w-4 h-4" />
                  <span>Interactive Real-Time Dashboard</span>
                </div>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Developed a responsive React.js frontend connected via high-performance REST APIs to display live agronomic forecasts, yield estimates, and fertilizer dosage suggestions in an intuitive visual dashboard.
                </p>
              </div>

              <div className="glass-2 rounded-2xl p-5 sm:p-6 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-base">
                  <Sprout className="w-4 h-4" />
                  <span>Precision Resource Planning</span>
                </div>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Calculates tailored resource expenditure models that minimize excessive chemical fertilizer usage, promoting soil microbiome conservation and reducing agricultural input costs for growers.
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
                  className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono glass-1 text-emerald-300 border border-emerald-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Competition Record */}
          <section aria-labelledby="section-record" className="glass-3 rounded-3xl p-6 sm:p-8 border border-yellow-500/30 bg-yellow-500/5 space-y-3">
            <h2 id="section-record" className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span>Verified Competition Record</span>
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              <strong>1st Place Champion — Blaze a Trail 2.0:</strong> Awarded 1st place for its innovative fusion of machine learning, GIS spatial datasets, and Explainable AI interpretability for agricultural decision intelligence.
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
            </div>
          </nav>

        </article>
      </main>

      <Footer />
    </div>
  );
}
