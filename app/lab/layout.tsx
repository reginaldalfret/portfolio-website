import { Metadata } from "next";

export const metadata: Metadata = {
  title: "12 Stacks. 1 Product. — Polyglot Engineering Lab | Reginald Alfret",
  description:
    "An engineering experiment comparing one product implemented across twelve native technology stacks (Next.js, Nuxt, Django, Spring Boot, Laravel, Rails, Angular, Blazor, Buffalo, Leptos, Jaspr, Vapor) with empirical performance benchmarks.",
  keywords: [
    "Polyglot Engineering",
    "Framework Benchmarks",
    "WebAssembly",
    "Rust Leptos",
    "Blazor WASM",
    "Next.js RSC",
    "Go Buffalo",
    "Swift Vapor",
    "Spring Boot 3",
    "Django 6",
    "Laravel 11",
    "Ruby on Rails 8",
    "Angular 19",
    "Jaspr Dart",
    "Reginald Alfret"
  ],
  openGraph: {
    title: "12 Stacks. 1 Product. — Polyglot Engineering Lab",
    description:
      "12 Stacks. 1 Product. Measured Engineering Performance. Empirical benchmarks across twelve independent technology ecosystems with zero fabricated metrics.",
    url: "https://reginaldalfret.tech/lab",
    siteName: "Reginald Alfret Portfolio",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "12 Stacks. 1 Product. — Polyglot Engineering Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "12 Stacks. 1 Product. — Polyglot Engineering Lab",
    description:
      "12 Stacks. 1 Product. Empirical benchmarks across twelve independent technology ecosystems.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://reginaldalfret.tech/lab"
  }
};

export default function LabLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
