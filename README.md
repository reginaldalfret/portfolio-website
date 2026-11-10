# 12 STACKS. 1 PRODUCT. — THE POLYGLOT PORTFOLIO EXPERIMENT

> **One personal portfolio. Twelve independent native implementations. Multiple programming languages. Different frontend and backend frameworks. Consistent user experience. A unified performance and architecture comparison dashboard.**

[![Personal Portfolio](https://img.shields.io/badge/Portfolio-reginaldalfret.tech-06b6d4?style=for-the-badge&logo=vercel)](https://reginaldalfret.tech)
[![Engineering Lab](https://img.shields.io/badge/Engineering%20Lab-reginaldalfret.tech%2Flab-10b981?style=for-the-badge)](https://reginaldalfret.tech/lab)
[![12 Stacks](https://img.shields.io/badge/Implementations-12%20Native%20Frameworks-6366f1?style=for-the-badge)](https://reginaldalfret.tech/lab)
[![Merged PRs](https://img.shields.io/badge/Open--Source-30%20Merged%20PRs-a855f7?style=for-the-badge&logo=github)](https://github.com/reginaldalfret)

---

## 🌟 Architecture & Two Connected Experiences

This ecosystem is organized into two distinct, high-impact experiences:

### Experience A — Personal Portfolio (`https://reginaldalfret.tech`)
A focused, fast, recruiter-friendly professional portfolio highlighting Reginald Alfret's:
- **Professional Identity**: Full-stack engineer & open-source contributor.
- **Verified Experience**: Software engineering career history and leadership.
- **Production Projects**: High-scale systems, real-time engines, and distributed tools.
- **Open-Source Impact**: 30 merged PRs across major global ecosystems.
- **Compact Teaser**: An unobtrusive entry point to the *12 Stacks. 1 Product.* experiment linking directly to `/lab`.

### Experience B — Engineering Lab (`https://reginaldalfret.tech/lab`)
The central presentation, comparison, and benchmarking laboratory for all twelve native implementations:
- **12-Stack Explorer**: Interactive framework cards with runtime classifications.
- **Live Preview System**: Device-responsive iframe switcher (Desktop, Tablet, Mobile) for all 12 stacks.
- **Empirical Leaderboard**: Scientifically measured multi-trial benchmarks (zero fabricated metrics).
- **Comparative Charts**: Side-by-side performance distributions and resource payload breakdowns.
- **Runtime Architecture Visualizers**: Interactive execution diagrams explaining native server daemons vs. client WASM runtimes.

---

## 🔬 Twelve Native Technology Implementations

Each stack is an independently built, idiomatic implementation respecting its framework's native architecture:

1. **[Next.js 14](https://github.com/reginaldalfret/portfolio-website)** — React 18 · TypeScript · React Server Components (RSC) · Vercel Edge
2. **[Nuxt 3](https://github.com/reginaldalfret/portfolio-nuxt)** — Vue 3 · TypeScript · Nitro Engine · Universal SSR & Hydration
3. **[Django 6](https://github.com/reginaldalfret/portfolio-django)** — Python 3.13 · MVT Architecture · Pure Server-Side Rendering
4. **[Spring Boot 3](https://github.com/reginaldalfret/portfolio-springboot)** — Java 21 · Thymeleaf SSR · Project Loom Virtual Threads
5. **[Laravel 11](https://github.com/reginaldalfret/portfolio-laravel)** — PHP 8.4 · Blade Templates · Native Artisan Engine
6. **[Ruby on Rails 8](https://github.com/reginaldalfret/portfolio-rails)** — Ruby 3.4 · ActionView ERB · YJIT Runtime Acceleration
7. **[Angular 19](https://github.com/reginaldalfret/portfolio-angular)** — TypeScript · Standalone Components · Zoneless Signals SPA
8. **[Blazor WASM](https://github.com/reginaldalfret/portfolio-blazor)** — C# · .NET 8 · Client-Side Compiled WebAssembly
9. **[Go Buffalo](https://github.com/reginaldalfret/portfolio-buffalo)** — Go 1.24/1.27 · Plush SSR · Compiled Native Binary
10. **[Leptos 0.7](https://github.com/reginaldalfret/portfolio-leptos)** — Rust · Wasm-Bindgen · Fine-Grained Reactive WebAssembly
11. **[Jaspr Web](https://github.com/reginaldalfret/portfolio-jaspr)** — Dart 3.13 · Flutter-inspired Component Tree · Dart Web Client
12. **[Vapor 4](https://github.com/reginaldalfret/portfolio-vapor)** — Swift 6.0 · Leaf Templates · SwiftNIO Async Non-blocking EventLoops

---

## 📊 Audited Empirical Performance Benchmarks

Multi-trial automated testing (10 trials per configuration) under Navigation Timing and Resource Timing standards:

| Framework | Language | Runtime Architecture | FCP (Median) | TTFB (Median) | Total Wire Payload | Lighthouse Score |
|---|---|---|:---:|:---:|:---:|:---:|
| **Go Buffalo** | Go 1.24 | Native Compiled Plush SSR | **280 ms** | **42 ms** | **108.2 KB** | **99** |
| **Vapor 4** | Swift 6.0 | SwiftNIO Non-blocking EventLoops | **290 ms** | **44 ms** | **109.1 KB** | **99** |
| **Spring Boot 3** | Java 21 | JVM Virtual Threads / Thymeleaf | **310 ms** | **46 ms** | **110.4 KB** | **98** |
| **Django 6** | Python 3.13 | WSGI / Classic MVT SSR | **320 ms** | **47 ms** | **115.6 KB** | **98** |
| **Laravel 11** | PHP 8.4 | Blade Server Components | **330 ms** | **48 ms** | **115.8 KB** | **97** |
| **Ruby on Rails 8** | Ruby 3.4 | Puma ERB / YJIT Compiled | **340 ms** | **48 ms** | **116.2 KB** | **97** |
| **Nuxt 3** | Vue 3 / TS | Universal Nitro SSR & Hydration | **440 ms** | **47.5 ms** | **152.4 KB** | **97** |
| **Angular 19** | Angular / TS | Standalone Signals SPA | **460 ms** | **46 ms** | **170.8 KB** | **97** |
| **Jaspr Web** | Dart 3.13 | Dart Web Client SPA | **480 ms** | **49.5 ms** | **245.6 KB** | **95** |
| **Leptos 0.7** | Rust 1.85 | Rust AOT WebAssembly | **510 ms** | **48 ms** | **630.4 KB** | **95** |
| **Next.js 14** | React 18 / TS | React Server Components Edge SSR | **624 ms** | **63 ms** | **1018.6 KB** | **96** |
| **Blazor WASM** | C# / .NET 8 | Mono WebAssembly Runtime & BCL | **780 ms** | **48 ms** | **2420.5 KB** | **94** |

---

## 📁 Repository Structure

```
portfolio-website/
├── app/                  # Next.js 14 App Router
│   ├── page.tsx          # Experience A: Personal Portfolio
│   ├── lab/              # Experience B: 12-Stack Engineering Lab
│   └── sitemap.ts        # Dynamic XML sitemap (/ and /lab)
├── components/
│   ├── resume/           # Recruiter-focused Obsidian Portfolio Components
│   ├── stacks/           # 12-Stack Engineering Lab Components (Leaderboard, Charts, Explorer)
│   ├── opensource/       # 30 Merged PR Components & Org Logos
│   └── ui/               # Design Tokens & UI Elements
├── data/
│   ├── stack-registry.json    # Canonical metadata for all 12 implementations
│   └── stack-benchmarks.json  # Audited empirical benchmark telemetry
├── public/
│   └── stacks/           # Standalone outputs and previews for all 12 stacks
├── shared/               # Single Source of Truth
│   ├── content/          # profile.json, projects.json, experience.json, etc.
│   └── specification/    # Requirements, a11y, and SEO docs
├── scripts/              # Validation, Benchmarking, and Ecosystem Automation
└── docs/                 # Extended Technical Documentation
```

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript type check
npm run typecheck

# Production build
npm run build
```

---

## 👤 Author & Maintainer

**Reginald Alfret V**  
- **Personal Portfolio**: [https://reginaldalfret.tech](https://reginaldalfret.tech)  
- **Engineering Lab**: [https://reginaldalfret.tech/lab](https://reginaldalfret.tech/lab)  
- **GitHub**: [@reginaldalfret](https://github.com/reginaldalfret)  
- **LinkedIn**: [in/reginaldalfret](https://www.linkedin.com/in/reginaldalfret/)
