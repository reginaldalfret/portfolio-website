import type { Metadata } from "next";
import "@/styles/globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { AmbientLighting } from "@/components/ui/AmbientLighting";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://reginaldalfret.tech"),
  title: "Reginald Alfret V — Open-Source Contributor · AI & DS Engineer · Software Developer",
  description:
    "Open-Source Contributor, AI & Data Science Engineer, and Software Developer with 70 merged PRs across Apple, Google, Microsoft, Meta, AWS, NVIDIA, NASA, and Netflix. 1st Place Champion at HackIndia 2026.",
  alternates: {
    canonical: "https://reginaldalfret.tech",
  },
  keywords: [
    "Reginald Alfret V",
    "Reginald Alfret",
    "Open-Source Contributor",
    "AI & DS Engineer",
    "Software Developer",
    "AI Engineer",
    "HackIndia 2026 Winner",
    "301 Super AI Agents",
    "TOR-UNVEIL",
    "Multi-Agent AI Systems",
    "LangChain",
    "FastAPI",
    "Next.js",
    "Python",
    "Go",
    "PostgreSQL",
    "Docker",
    "Chennai Developer",
  ],
  authors: [{ name: "Reginald Alfret V", url: "https://reginaldalfret.tech" }],
  creator: "Reginald Alfret V",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Reginald Alfret V — Open-Source Contributor · AI & DS Engineer · Software Developer",
    description:
      "Open-Source Contributor, AI & Data Science Engineer, and Software Developer with 70 merged PRs across Apple, Google, Microsoft, Meta, AWS, NVIDIA, NASA, and Netflix. 1st Place Champion at HackIndia 2026.",
    url: "https://reginaldalfret.tech",
    type: "website",
    locale: "en_US",
    siteName: "Reginald Alfret V Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Reginald Alfret V — Open-Source Contributor · AI & DS Engineer · Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reginald Alfret V — Open-Source Contributor · AI & DS Engineer · Software Developer",
    description:
      "Open-Source Contributor, AI & Data Science Engineer, and Software Developer with 70 merged PRs across Apple, Google, Microsoft, Meta, AWS, NVIDIA, NASA, and Netflix. 1st Place Champion at HackIndia 2026.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://reginaldalfret.tech/#website",
        "url": "https://reginaldalfret.tech/",
        "name": "Reginald Alfret V Portfolio",
        "description":
          "Official engineering portfolio of Reginald Alfret V — Open-Source Contributor, AI & Data Science Engineer, and Software Developer.",
        "inLanguage": "en-US",
        "publisher": {
          "@id": "https://reginaldalfret.tech/#person",
        },
      },
      {
        "@type": "Person",
        "@id": "https://reginaldalfret.tech/#person",
        "name": "Reginald Alfret V",
        "alternateName": ["Reginald Alfret", "reginaldalfret"],
        "jobTitle": [
          "Open-Source Contributor",
          "AI Systems Engineer",
          "Software Engineer",
          "Full-Stack Developer",
        ],
        "description":
          "Open-Source Contributor, AI & Data Science Engineer and Software Developer with 30+ merged pull requests across Apple, Google, Microsoft, Meta, AWS, NVIDIA, NASA, and Netflix. 1st Place Champion at HackIndia 2026 and Tamil Nadu Police Hackathon 2025.",
        "url": "https://reginaldalfret.tech/",
        "image": "https://reginaldalfret.tech/og-image.png",
        "sameAs": [
          "https://github.com/reginaldalfret",
          "https://www.linkedin.com/in/reginaldalfret",
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Chennai",
          "addressRegion": "Tamil Nadu",
          "addressCountry": "India",
        },
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "St. Joseph's Institute of Technology",
          "sameAs": "https://stjosephs.ac.in",
        },
        "award": [
          "1st Place Winner — HackIndia 2026 National Hackathon",
          "1st Place Winner — Tamil Nadu Police Hackathon 2025",
          "1st Place Winner — Blaze a Trail 2.0 Hackathon",
          "Elite Silver Medalist — NPTEL National Certification",
        ],
        "knowsAbout": [
          "Artificial Intelligence",
          "Multi-Agent AI Systems",
          "Machine Learning",
          "LangChain",
          "FastAPI",
          "Python",
          "React",
          "Next.js",
          "TypeScript",
          "Go",
          "PostgreSQL",
          "Docker",
          "Network Forensics",
          "Computer Vision",
          "Distributed Systems",
          "Open Source Software",
        ],
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Deep Learning Specialization",
            "credentialCategory": "Certificate",
            "recognizedBy": {
              "@type": "Organization",
              "name": "DeepLearning.AI",
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Machine Learning with Python",
            "credentialCategory": "Certificate",
            "recognizedBy": {
              "@type": "Organization",
              "name": "IBM",
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Google Cloud Fundamentals: Core Infrastructure",
            "credentialCategory": "Certificate",
            "recognizedBy": {
              "@type": "Organization",
              "name": "Google Cloud",
            },
          },
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://reginaldalfret.tech/projects/301-super-ai-agents#app",
        "name": "301 Super AI Agents",
        "headline": "Sovereign Multi-Agent AI Platform",
        "description":
          "A sovereign, local-first multi-agent orchestration architecture uniting 301 specialised autonomous agents. Features offline model execution, OCR document intelligence, streaming responses, and sovereign privacy.",
        "applicationCategory": "DeveloperApplication, ArtificialIntelligence",
        "operatingSystem": "Linux, macOS, Windows",
        "url": "https://reginaldalfret.tech/projects/301-super-ai-agents",
        "author": {
          "@id": "https://reginaldalfret.tech/#person",
        },
        "award": "1st Place Winner — HackIndia 2026 National Hackathon (500+ teams)",
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://reginaldalfret.tech/projects/tor-unveil#app",
        "name": "TOR-UNVEIL",
        "headline": "Onion Routing De-anonymisation & Cyber Defense System",
        "description":
          "Advanced cyber defense and traffic correlation platform built for law enforcement, detecting anomalous routing patterns and Deanonymizing malicious relay behavior without breaking transport crypto.",
        "applicationCategory": "SecurityApplication, ForensicIntelligence",
        "operatingSystem": "Linux",
        "url": "https://reginaldalfret.tech/projects/tor-unveil",
        "author": {
          "@id": "https://reginaldalfret.tech/#person",
        },
        "award": "1st Place Winner — Tamil Nadu Police Hackathon 2025",
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://reginaldalfret.tech/projects/ai-crop-recommendation#app",
        "name": "AI Powered Crop Recommendation & Plant Pathology",
        "headline": "Precision Agriculture Intelligence Engine",
        "description":
          "End-to-end agritech platform combining soil chemistry analysis, weather forecasts, and Computer Vision leaf pathology to predict optimal crops and identify 40+ botanical pathogens.",
        "applicationCategory": "AgricultureApplication, MachineLearning",
        "operatingSystem": "Web",
        "url": "https://reginaldalfret.tech/projects/ai-crop-recommendation",
        "author": {
          "@id": "https://reginaldalfret.tech/#person",
        },
        "award": "1st Place Winner — Blaze a Trail 2.0 Hackathon",
      },
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#050505] text-neutral-100 antialiased selection:bg-cyan-500/20 selection:text-cyan-200">
        <NoiseOverlay />
        <AmbientLighting />
        <SmoothScroll>{children}</SmoothScroll>
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        ) : null}
      </body>
    </html>
  );
}
