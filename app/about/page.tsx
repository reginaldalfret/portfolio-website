import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Download, Sparkles, GraduationCap, Briefcase, Award, Code2, ShieldCheck, HelpCircle } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/portfolioData";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About Reginald Alfret V — Software Engineer | AI Engineer",
  description:
    "Biography, education, technical experience, and national hackathon achievements of Reginald Alfret V. Final-year B.Tech in Artificial Intelligence & Data Science at St. Joseph's Institute of Technology (CGPA 8.2/10).",
  alternates: {
    canonical: "https://reginaldalfret.tech/about",
  },
  openGraph: {
    title: "About Reginald Alfret V — Software Engineer | AI Engineer",
    description:
      "Comprehensive professional background, verified experience, education credentials, and AI systems engineering portfolio of Reginald Alfret V.",
    url: "https://reginaldalfret.tech/about",
    type: "profile",
    locale: "en_US",
    siteName: "Reginald Alfret V Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Reginald Alfret V — Software Engineer | AI Engineer",
    description:
      "Comprehensive professional background, verified experience, education credentials, and AI systems engineering portfolio of Reginald Alfret V.",
  },
};

export default function AboutPage() {
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
            "name": "About",
            "item": "https://reginaldalfret.tech/about",
          },
        ],
      },
      {
        "@type": "ProfilePage",
        "@id": "https://reginaldalfret.tech/about#webpage",
        "url": "https://reginaldalfret.tech/about",
        "name": "About Reginald Alfret V — Software Engineer | AI Engineer",
        "mainEntity": {
          "@type": "Person",
          "@id": "https://reginaldalfret.tech/#person",
          "name": "Reginald Alfret V",
          "jobTitle": ["Software Engineer", "Full-Stack Developer", "AI Engineer"],
          "description":
            "Final-year B.Tech Artificial Intelligence & Data Science student and Software Engineer with proven hands-on experience across full-stack engineering, multi-agent AI architectures, scalable REST APIs, ERP systems, and machine learning models.",
          "url": "https://reginaldalfret.tech/",
          "sameAs": [
            "https://github.com/reginaldalfret",
            "https://www.linkedin.com/in/reginaldalfret",
          ],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Chennai",
            "addressCountry": "India",
          },
          "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "St. Joseph's Institute of Technology",
          },
        },
      },
    ],
  };

  return (
    <div className="relative min-h-screen text-neutral-100 flex flex-col justify-between selection:bg-cyan-500/20 selection:text-cyan-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Header / Breadcrumbs */}
      <header className="fixed top-0 inset-x-0 z-50 glass-1 border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm font-mono">
            <Link
              href="/"
              className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-neutral-600">/</span>
            <span className="text-cyan-400 font-semibold">About</span>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/Reginald_Alfret_Resume.pdf"
              download="Reginald_Alfret_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium glass-2 border border-white/10 text-neutral-200 hover:text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Resume PDF</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Semantic Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-20 w-full">
        <article className="space-y-16 sm:space-y-20">
          
          {/* Header & Core Identity */}
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest glass-2 text-cyan-300 border border-cyan-500/30">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Curriculum & Dossier</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Reginald Alfret V
            </h1>

            <p className="text-base sm:text-xl text-cyan-400 font-medium">
              Software Engineer | Full-Stack Developer | AI Engineer
            </p>

            <p className="text-sm font-mono text-neutral-400">
              Chennai, Tamil Nadu, India • <a href="mailto:reginaldalfret@gmail.com" className="text-neutral-300 hover:underline">reginaldalfret@gmail.com</a>
            </p>
          </header>

          {/* About Narrative */}
          <section aria-labelledby="section-about" className="glass-3 rounded-3xl p-6 sm:p-10 border border-white/10 space-y-4">
            <h2 id="section-about" className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              About Reginald Alfret V
            </h2>
            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              <p>
                Reginald Alfret V is a Software Engineer, Full-Stack Developer, and AI Engineer based in Chennai, India. He specializes in designing multi-agent AI architectures, building production-grade web applications, developing RESTful APIs, and implementing scalable enterprise solutions.
              </p>
              <p>
                He currently pursues his final-year B.Tech in Artificial Intelligence and Data Science at St. Joseph&apos;s Institute of Technology with a verified CGPA of 8.2 / 10 (No Arrears). His engineering portfolio includes national hackathon championships, including winning 1st place at HackIndia 2026 out of 500+ teams nationwide, 1st place at the Tamil Nadu Police Hackathon 2025 (adopted for live operational police use), and 1st place at Blaze a Trail 2.0.
              </p>
            </div>
          </section>

          {/* Education */}
          <section aria-labelledby="section-education" className="glass-3 rounded-3xl p-6 sm:p-10 border border-white/10 space-y-6">
            <h2 id="section-education" className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              <span>Education & Academic Credentials</span>
            </h2>

            <div className="space-y-4 border-l-2 border-cyan-500/30 pl-5">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  B.Tech — Artificial Intelligence and Data Science
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400">
                  St. Joseph&apos;s Institute of Technology, Chennai, India • 2023 – 2027
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-3 py-1 rounded-full glass-2 text-cyan-300 border border-cyan-500/30 font-semibold">
                  CGPA: 8.2 / 10
                </span>
                <span className="px-3 py-1 rounded-full glass-2 text-emerald-300 border border-emerald-500/30">
                  Status: Pursuing (Final Year)
                </span>
                <span className="px-3 py-1 rounded-full glass-2 text-neutral-300 border border-white/10">
                  Standing: No Arrears
                </span>
              </div>
            </div>
          </section>

          {/* Professional Experience */}
          <section aria-labelledby="section-experience" className="glass-3 rounded-3xl p-6 sm:p-10 border border-white/10 space-y-8">
            <h2 id="section-experience" className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <Briefcase className="w-5 h-5 text-purple-400" />
              <span>Professional Experience</span>
            </h2>

            <div className="space-y-8">
              {PORTFOLIO_DATA.experience.map((exp) => (
                <div key={exp.company} className="space-y-3 border-l-2 border-purple-500/30 pl-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {exp.role} — <span className="text-purple-300">{exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-neutral-400">{exp.period}</span>
                  </div>

                  <p className="text-xs font-mono text-neutral-400">{exp.location} • {exp.type}</p>

                  <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs sm:text-sm text-neutral-300">
                    {exp.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.technologies.map((t) => (
                      <span key={t} className="px-2.5 py-0.5 rounded-full text-[11px] font-mono glass-2 text-neutral-300 border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Case Studies */}
          <section aria-labelledby="section-projects" className="glass-3 rounded-3xl p-6 sm:p-10 border border-white/10 space-y-6">
            <h2 id="section-projects" className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <span>Featured Engineering Case Studies</span>
            </h2>

            <div className="grid grid-cols-1 gap-4">
              <Link
                href="/projects/301-super-ai-agents"
                className="p-5 rounded-2xl glass-2 border border-white/10 hover:border-cyan-500/40 transition-all block group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 font-semibold">CASE 01 • HACKINDIA 2026 1ST PLACE</span>
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors">
                  301 Super AI Agents — Sovereign Multi-Agent AI Platform
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 mt-2">
                  Local-first multi-agent platform coordinating 301 specialised agents with offline model selection, OCR parsing, and real-time streaming.
                </p>
              </Link>

              <Link
                href="/projects/tor-unveil"
                className="p-5 rounded-2xl glass-2 border border-white/10 hover:border-rose-500/40 transition-all block group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-rose-400 font-semibold">CASE 02 • TN POLICE HACKATHON 2025 1ST PLACE</span>
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white mt-1 group-hover:text-rose-300 transition-colors">
                  TOR-UNVEIL — Dark Web AI Cybercriminal Tracker
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 mt-2">
                  Full-stack threat intelligence platform with network graph visualisations and ML threat classification adopted for live police operations.
                </p>
              </Link>

              <Link
                href="/projects/ai-crop-recommendation"
                className="p-5 rounded-2xl glass-2 border border-white/10 hover:border-emerald-500/40 transition-all block group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-400 font-semibold">CASE 03 • BLAZE A TRAIL 2.0 1ST PLACE</span>
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white mt-1 group-hover:text-emerald-300 transition-colors">
                  AI Crop Recommendation — Agri-Intelligence Engine
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 mt-2">
                  Precision agriculture system integrating soil, weather, and GIS spatial data with Explainable AI for real-time farming recommendations.
                </p>
              </Link>
            </div>
          </section>

          {/* Hackathons & Honors */}
          <section aria-labelledby="section-awards" className="glass-3 rounded-3xl p-6 sm:p-10 border border-white/10 space-y-6">
            <h2 id="section-awards" className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <Award className="w-5 h-5 text-amber-400" />
              <span>National Championships & Honors</span>
            </h2>

            <ul className="space-y-4">
              {PORTFOLIO_DATA.achievements.map((ach) => (
                <li key={ach.title} className="p-4 rounded-2xl glass-2 border border-white/8">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-sm font-bold text-white">{ach.title}</span>
                    <span className="text-xs font-mono text-amber-300 font-semibold">{ach.award}</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">{ach.event}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Industry Certifications */}
          <section aria-labelledby="section-certifications" className="glass-3 rounded-3xl p-6 sm:p-10 border border-white/10 space-y-6">
            <h2 id="section-certifications" className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Industry Certifications</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PORTFOLIO_DATA.certifications.map((cert) => (
                <div key={cert.name} className="p-4 rounded-2xl glass-2 border border-white/8">
                  <div className="text-xs font-mono text-emerald-400">{cert.issuer}</div>
                  <h3 className="text-sm font-bold text-white mt-1">{cert.name}</h3>
                  <div className="text-[11px] text-neutral-400 mt-1">Platform: {cert.platform}</div>
                </div>
              ))}
            </div>
          </section>

          {/* AI-Citable FAQ Section */}
          <section aria-labelledby="section-faq" className="glass-3 rounded-3xl p-6 sm:p-10 border border-white/10 space-y-6">
            <h2 id="section-faq" className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <HelpCircle className="w-5 h-5 text-cyan-400" />
              <span>Frequently Asked Questions</span>
            </h2>

            <div className="space-y-5 text-sm leading-relaxed">
              <div className="space-y-1.5">
                <h3 className="font-bold text-white">Who is Reginald Alfret V?</h3>
                <p className="text-neutral-300">
                  Reginald Alfret V is a Software Engineer, Full-Stack Developer, and AI Engineer based in Chennai, India. He builds multi-agent artificial intelligence architectures, scalable full-stack applications, and real-world software products.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-bold text-white">What does Reginald Alfret V work on?</h3>
                <p className="text-neutral-300">
                  Reginald works on end-to-end software engineering, including full-stack ERP systems, offline and sovereign multi-agent LLM systems, RESTful API architecture, cybersecurity analytics tools, and precision machine learning models.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-bold text-white">What technologies does he use?</h3>
                <p className="text-neutral-300">
                  His core technology stack includes Python, TypeScript, React.js, Next.js, Node.js, Express.js, FastAPI, Large Language Models (LLMs), Three.js for WebGL graphics, Tailwind CSS, PostgreSQL, and Git.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-bold text-white">What are his major AI projects?</h3>
                <p className="text-neutral-300">
                  His flagship projects are: (1) 301 Super AI Agents (sovereign multi-agent AI platform), (2) TOR-UNVEIL (dark web threat intelligence tracker delivered for live police operations), and (3) AI Crop Recommendation (multimodal precision farming system with Explainable AI).
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-bold text-white">What hackathons has Reginald Alfret V won?</h3>
                <p className="text-neutral-300">
                  Reginald won 1st Place at HackIndia 2026 (competing against 500+ teams nationwide), 1st Place at the Tamil Nadu Police Hackathon 2025, 1st Place at Blaze a Trail 2.0, and 6 additional competitive technical symposium championships.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-bold text-white">What are his open-source contributions?</h3>
                <p className="text-neutral-300">
                  Reginald has contributed 14 upstream pull requests merged into major open-source ecosystems including Apple (swift-numerics #355), NVIDIA (cuda-quantum #5560), Meta (StyleX #1899), GitHub (CLI #14592), Intel (PyTorch XPU #5518), Cloudflare (vinext #3469), Qualcomm (qai-appbuilder #286), Airbnb (MagazineLayout #169), Microsoft Azure (Cosmos DB Emulator #359), IBM (Docling Pipelines #85), Docker (Docs #26266), SAP (Terraform Provider BTP #1710), AMD ROCm (hrx-system #1231), and Apache (ShenYu Dashboard #696). Details can be viewed in the <a href="/#open-source" className="text-cyan-400 hover:underline">Open-Source Contributions section</a>.
                </p>
              </div>
            </div>
          </section>

        </article>
      </main>

      <Footer />
    </div>
  );
}
