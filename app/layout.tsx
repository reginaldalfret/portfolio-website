import type { Metadata } from "next";
import "@/styles/globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { AmbientLighting } from "@/components/ui/AmbientLighting";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://reginaldalfret.tech"),
  title: "Reginald Alfret V — Software Engineer | AI Engineer | Full-Stack Developer",
  description:
    "Official engineering portfolio of Reginald Alfret V. Specializing in multi-agent AI systems, scalable full-stack web applications, REST APIs, and machine learning architectures.",
  alternates: {
    canonical: "https://reginaldalfret.tech",
  },
  keywords: [
    "Reginald Alfret V",
    "Software Engineer",
    "AI Engineer",
    "Full-Stack Developer",
    "React",
    "Node.js",
    "Python",
    "Ollama",
    "Multi-Agent AI",
    "HackIndia 2026",
    "Chennai India",
  ],
  authors: [{ name: "Reginald Alfret V" }],
  creator: "Reginald Alfret V",
  openGraph: {
    title: "Reginald Alfret V — Software Engineer | AI Engineer | Full-Stack Developer",
    description:
      "Building intelligent software, multi-agent AI systems, and scalable real-world products.",
    url: "https://reginaldalfret.tech",
    type: "website",
    locale: "en_US",
    siteName: "Reginald Alfret V Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reginald Alfret V — Software Engineer | AI Engineer",
    description: "Building intelligent software, multi-agent AI systems, and real-world products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Reginald Alfret V",
    jobTitle: ["Software Engineer", "Full-Stack Developer", "AI Engineer"],
    url: "https://reginaldalfret.tech",
    sameAs: [
      "https://github.com/reginaldalfret",
      "https://www.linkedin.com/in/reginaldalfret",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressCountry: "India",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "St. Joseph's Institute of Technology",
    },
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
