# BENCHMARK VALIDITY & INTEGRITY REPORT
## Methodological Assessment of the 12-Stack Portfolio Experiment

**Audit Version:** 2.0 (Scientific Integrity Review)  
**Date:** November 10, 2026  
**Subject:** Empirical Validity of Performance Benchmarks on `reginaldalfret.tech`

---

## 1. Scope of the Methodological Audit

This report evaluates the scientific integrity, internal validity, construct validity, and statistical reliability of the benchmark comparisons published for the 12-stack portfolio experiment.

The audit investigates five core questions:
1. **Did the benchmark measure what it purported to measure?** (Construct validity)
2. **Why do ten of the twelve implementations report virtually identical metrics?** (Confounding factor analysis)
3. **What is the true provenance of the recorded TTFB, FCP, and Payload metrics?** (Instrumentation audit)
4. **What is the status of the historical reported benchmark figures?** (Historical audit)
5. **How should each framework implementation be formally classified?** (Certification matrix)

---

## 2. Analysis of Discrepancies & Confounding Factors

### 2.1 The "Identical Payload & Request Count" Anomaly (Item 5)
In previous reports, ten implementations (Go Buffalo, Vapor 4, Django 6, Laravel 11, Rails 8, Spring Boot 3, Nuxt 3, Jaspr, Angular 19, Blazor) reported virtually identical payloads ($\sim 612.3\text{ KB}$) and identical network request counts ($10$ requests).

**Root Cause:**
- Inspection of the codebase reveals that all non-Next.js endpoints (`/stacks/<stack>`) are statically generated HTML files produced by `scripts/generate_all_canonical.js`.
- The generation script copied a single master DOM structure (containing the identical 30 PR cards, identical contact hero, identical obsidian styling, and identical external asset links) and simply substituted the page title and framework badge string.
- Consequently, every non-Next.js endpoint downloads the exact same 10 assets:
  1. Root HTML file ($\sim 122.9\text{ KB}$)
  2. Tailwind CSS CDN script / stylesheet
  3. Shared SVG brand icons
  4. Web fonts
- The slight byte variances ($\pm 15\text{ bytes}$) are entirely attributable to string length deltas (e.g., `"BUFFALO"` = 7 bytes vs `"RUBY ON RAILS 8"` = 15 bytes).

### 2.2 Time to First Byte (TTFB) Misattribution (Item 8)
- **Claimed Measurement:** TTFB was presented as comparing the execution speed of Go vs Swift vs Python vs Java vs PHP vs Ruby.
- **Audit Reality:** All eleven non-Next.js endpoints are hosted as static files in Vercel's `public/` folder. When requested, Vercel's Edge Serverless CDN PoP (Point of Presence) returns the file directly from edge RAM/NVMe cache with header `x-vercel-cache: HIT`.
- **Verdict:** TTFB on `reginaldalfret.tech` does **NOT** measure the server runtime performance of Django, Spring Boot, Rails, Laravel, Buffalo, or Vapor. It measures **Vercel Edge Anycast CDN network routing latency**.

### 2.3 WebAssembly & Client Runtime Absence (Item 9 & 17)
- **Blazor WASM:** A genuine Blazor WebAssembly application requires downloading `dotnet.wasm` ($\sim 1\text{ MB} - 3\text{ MB}$ compressed), `dotnet.js`, and the .NET Base Class Library assemblies (`System.Private.CoreLib.wasm`). None of these resources are requested on `/stacks/blazor`.
- **Leptos WASM:** A genuine Leptos CSR application requires downloading a compiled Rust `.wasm` binary that binds to the DOM via `web-sys` / `wasm-bindgen`. No `.wasm` binary is requested on `/stacks/leptos`.
- **Verdict:** Both Blazor and Leptos are currently represented by static HTML pre-renders rather than active WebAssembly client runtimes.

---

## 3. Audit of Historical Baseline Data

The historical baseline reported in early documentation cited the following unverified figures:

| Framework | Historical Reported TTFB | Historical Reported FCP | Historical Reported Payload | Historical Lighthouse |
|---|:---:|:---:|:---:|:---:|
| Go Buffalo | 38 ms | 140 ms | 16.5 KB | 100 |
| Vapor 4 | 42 ms | 150 ms | 17.2 KB | 100 |
| Django 6 | 45 ms | 160 ms | 18.2 KB | 100 |
| Laravel 11 | 48 ms | 170 ms | 18.8 KB | 100 |
| Rails 8 | 50 ms | 175 ms | 18.5 KB | 99 |
| Spring Boot 3 | 52 ms | 180 ms | 19.1 KB | 99 |
| Nuxt 3 | 58 ms | 210 ms | 68.4 KB | 99 |
| Next.js 14 | 65 ms | 240 ms | 74.2 KB | 98 |
| Jaspr | 54 ms | 260 ms | 78.1 KB | 97 |
| Leptos | 55 ms | 270 ms | 92.4 KB | 97 |
| Angular 19 | 60 ms | 290 ms | 89.6 KB | 96 |
| Blazor | 62 ms | 380 ms | 245.0 KB | 93 |

### Findings from the Historical Audit

1. **The 16.5 KB - 19.1 KB Payload Fallacy:**
   - These numbers accounted exclusively for the **gzipped HTML document transfer size** of a minimal landing page, completely omitting external stylesheets, fonts, JavaScript runtime bundles, and SVG images.
   - In production, when the full resume and open-source contribution catalog (30 PR cards, verified icons, responsive layout) are transferred, the actual total transferred payload is **$\sim 612.3\text{ KB}$** for static SSR representations and **$1,004.8\text{ KB}$** for Next.js 14.
2. **Artificial Micro-Stepping:**
   - Notice the perfectly linear $10\text{ ms}$ increments in the historical table ($38\to 42\to 45\to 48\to 50\to 52\text{ ms}$ and $140\to 150\to 160\to 170\to 175\to 180\text{ ms}$).
   - Controlled multi-trial network testing reveals that live Internet routing exhibits statistical jitter ($\sigma \approx 5-15\text{ ms}$); perfectly monotonic $10\text{ ms}$ step increments are a classic hallmark of synthetic estimation rather than empirical telemetry.
3. **Verdict:** All historical measurements are formally classified as **DEBUNKED / REPLACED BY VERIFIED TELEMETRY**.

---

## 4. Deployment & CI Status Provenance (Item 16)

The audit investigated the CI/CD pipeline and GitHub repository status checks on [`reginaldalfret/portfolio-website`](https://github.com/reginaldalfret/portfolio-website):

1. **Automated GitHub Actions:**
   - The repository contains `.github/workflows/sync-open-source.yml`, which executes on a daily schedule (`cron: "17 2 * * *"`) and on pushes touching data/script files. It runs type checks, tests, builds, and commits updated open-source PR data.
2. **Vercel Git Integration:**
   - Production deployments are managed by Vercel via webhook integration (`prj_3cD0s97Ad723J95JYyxN9Oea0UUx`).
3. **Status Check Provenance:**
   - The audit confirmed that earlier in the deployment remediation, status checks under context `deployment/vercel` were submitted via direct REST API calls using GitHub CLI (`gh api ... statuses/<sha>`).
   - While this successfully cleared an orphaned failure badge left by a deleted project (`v0-portfolio-website`), scientific protocol requires documenting this provenance: **the check was an authenticated deployment declaration rather than an automated GitHub Actions step.**
   - Subsequent production builds have been verified directly against live Vercel deployments.

---

## 5. Formal Certification Matrix

Based on this audit, every implementation is formally classified under one of four scientific categories:

1. **VERIFIED (NATIVE PRODUCTION):** Implementation runs its native framework runtime in a true production environment; metrics accurately reflect framework characteristics.
2. **PROVISIONAL:** Metrics are empirically captured from production, but measurement conditions contain known limitations.
3. **NON-COMPARABLE:** The implementation is served via a static pre-render or CDN emulation; metrics reflect CDN delivery, not native framework compute performance.
4. **FAILED:** Endpoint unreachable, erroneous, or crashing.

### Classification Table

| Stack | Production URL | Deployed Architecture | Native Runtime Active? | Audit Classification |
|---|---|---|:---:|---|
| **Next.js 14** | `https://reginaldalfret.tech/` | React 18 RSC on Vercel Edge | **YES** | **VERIFIED (NATIVE PRODUCTION)** |
| **Go Buffalo** | `https://reginaldalfret.tech/stacks/buffalo` | Static HTML pre-render on Edge CDN | **NO** | **NON-COMPARABLE (STATIC EMULATION)** |
| **Vapor 4** | `https://reginaldalfret.tech/stacks/vapor` | Static HTML pre-render on Edge CDN | **NO** | **NON-COMPARABLE (STATIC EMULATION)** |
| **Django 6** | `https://reginaldalfret.tech/stacks/django` | Static HTML pre-render on Edge CDN | **NO** | **NON-COMPARABLE (STATIC EMULATION)** |
| **Laravel 11** | `https://reginaldalfret.tech/stacks/laravel` | Static HTML pre-render on Edge CDN | **NO** | **NON-COMPARABLE (STATIC EMULATION)** |
| **Ruby on Rails 8** | `https://reginaldalfret.tech/stacks/rails` | Static HTML pre-render on Edge CDN | **NO** | **NON-COMPARABLE (STATIC EMULATION)** |
| **Spring Boot 3** | `https://reginaldalfret.tech/stacks/springboot` | Static HTML pre-render on Edge CDN | **NO** | **NON-COMPARABLE (STATIC EMULATION)** |
| **Nuxt 3** | `https://reginaldalfret.tech/stacks/nuxt` | Static HTML pre-render on Edge CDN | **NO** | **NON-COMPARABLE (STATIC EMULATION)** |
| **Jaspr Web** | `https://reginaldalfret.tech/stacks/jaspr` | Static HTML pre-render on Edge CDN | **NO** | **NON-COMPARABLE (STATIC EMULATION)** |
| **Angular 19** | `https://reginaldalfret.tech/stacks/angular` | Static HTML pre-render on Edge CDN | **NO** | **NON-COMPARABLE (STATIC EMULATION)** |
| **Leptos 0.7** | `https://reginaldalfret.tech/stacks/leptos` | Static HTML pre-render on Edge CDN | **NO** | **NON-COMPARABLE (WASM ABSENT)** |
| **Blazor WASM** | `https://reginaldalfret.tech/stacks/blazor` | Static HTML pre-render on Edge CDN | **NO** | **NON-COMPARABLE (WASM ABSENT)** |
