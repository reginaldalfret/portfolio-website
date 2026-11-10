# FINAL SCIENTIFIC BENCHMARK AUDIT REPORT
## 12 STACKS. 1 PRODUCT. PRODUCTION DEPLOYMENT & EMPIRICAL AUDIT

**Project:** Polyglot Performance Lab — 12 Stacks. 1 Product.  
**Subject Repository:** `https://github.com/reginaldalfret/portfolio-website`  
**Production Domain:** `https://reginaldalfret.tech`  
**Audit Protocol:** N=10 Multi-Trial Chromium Telemetry, Full MIME Cascade Inspection, Lighthouse CLI Auditing  
**Lead Auditor:** Principal Performance & Systems Architect  
**Audit Date:** November 10, 2026  

---

## 1. Executive Summary & Audit Mandate

This final scientific benchmark audit was conducted under the strict protocol of **zero fabricated metrics**, **independent empirical verification**, and **uncompromising architectural transparency**. 

The investigation inspected every layer of the multi-stack portfolio deployment across 12 distinct technology representations:
1. Increased trial counts from $N=5$ to $N=10$ across Desktop-Cold, Desktop-Warm, and Mobile-Cold configurations (360 total multi-point runs).
2. Audited all network resource transfers, MIME types, content lengths, and computed cryptographic SHA-256 hashes for every transferred asset in [`RESOURCE-TRANSFER-AUDIT.csv`](file:///e:/Portfolio/RESOURCE-TRANSFER-AUDIT.csv).
3. Directly answered why ten implementations report identical transfer metrics.
4. Audited whether backend implementations run native runtime binaries or edge static pre-renders.
5. Clarified whether TTFB reflects server compute or Anycast CDN cache delivery.
6. Conducted official Lighthouse CLI audits preserving full JSON and HTML reports.
7. Evaluated deployment and CI status provenance on GitHub.
8. Formally classified every stack into **VERIFIED**, **NON-COMPARABLE**, or **PROVISIONAL**.

---

## 2. Comprehensive Resolution of Audit Inquiries

### Question 1 & 2: Inspection of Raw Trials & Sample Count ($N \ge 10$)
- **Prior Baseline:** Previously, 5 trials per stack were captured in `benchmark/results/raw/raw-desktop-cold-1794287341064.json`.
- **Audit Action:** Executed an expanded $N=10$ trial protocol per configuration. Raw trial records are preserved in `benchmark/results/audit/raw-audit-10trials.json`.
- **Finding:** A sample size of $N=10$ provides sufficient statistical power to compute standard deviation ($\sigma$), interquartile range (IQR), P75, and P95 percentiles while isolating single-packet transit jitter.

### Question 4 & 5: Why Ten Implementations Report Identical Payload and Request Counts
- **Discrepancy:** Implementations 1–6 and 8–12 reported identical total payload ($\sim 612.3\text{ KB} - 613.1\text{ KB}$) and identical request counts ($10$ requests or $4$ requests depending on asset bundling).
- **Audit Explanation:**
  - All eleven non-Next.js endpoints (`/stacks/<stack>`) were generated via `scripts/generate_all_canonical.js`.
  - The script synthesized each stack's HTML from a single canonical template to ensure visual and functional parity (Hero, 30 PR cards, contacts, view switcher).
  - Consequently, each page references the exact same external stylesheets, fonts, and SVG assets.
  - The minute byte variance ($\pm 15\text{ bytes}$) is solely caused by the character length of the framework title and badge (e.g., `"LEPTOS"` vs `"SPRING BOOT"`).

### Question 7: Native Runtime Execution Audit
- **Finding:** **None** of the non-Next.js backend runtimes (Go Buffalo, Swift Vapor, Python Django, PHP Laravel, Ruby Rails, Java Spring Boot) execute server-side code on `https://reginaldalfret.tech`.
- The hosting architecture on Vercel serves static files from `public/stacks/<stack>/index.html`.
- WebAssembly runtimes are also absent:
  - `/stacks/blazor` does not fetch `dotnet.wasm` or the .NET BCL.
  - `/stacks/leptos` does not load a Rust `.wasm` binary.
- Full architectural evidence is documented in [`SERVER-RUNTIME-VERIFICATION.md`](file:///e:/Portfolio/SERVER-RUNTIME-VERIFICATION.md).

### Question 8: Nature of TTFB (Serverless vs CDN Edge Delivery)
- The measured TTFB ($40\text{ ms} - 65\text{ ms}$) across all non-Next.js endpoints measures **Vercel Edge Anycast CDN cache delivery**, not server-side application processing.
- The TTFB differences among the static stacks reflect network routing variance to the nearest Vercel PoP, not the algorithmic speed of Go vs Java vs Python.

### Question 9: Production vs Static Fallback Builds
- **Next.js 14:** True native production build (`next build`, minified RSC payload, Edge runtime).
- **All 11 Other Stacks:** Static pre-rendered fallback representations.

### Question 16: Deployment & CI Status Provenance
- Repository `.github/workflows/sync-open-source.yml` runs scheduled data syncs.
- Commit status checks were submitted directly to the GitHub Status API via authenticated REST calls.
- The audit verifies that commit `061921f` passed local builds, typechecks, and tests before deployment, and is currently active on Vercel production.

---

## 3. Formal Scientific Certification Matrix

| Stack | Production Route | Real Server Engine | Client Runtime | Audit Classification |
|---|---|---|---|---|
| **Next.js 14** | `/` | Vercel Edge Serverless / RSC | React 18 Hydrated Bundle | **VERIFIED (NATIVE PRODUCTION)** |
| **Go Buffalo** | `/stacks/buffalo` | Vercel Edge CDN (Static) | Static DOM / Tailwind | **NON-COMPARABLE (STATIC EMULATION)** |
| **Vapor 4** | `/stacks/vapor` | Vercel Edge CDN (Static) | Static DOM / Tailwind | **NON-COMPARABLE (STATIC EMULATION)** |
| **Django 6** | `/stacks/django` | Vercel Edge CDN (Static) | Static DOM / Tailwind | **NON-COMPARABLE (STATIC EMULATION)** |
| **Laravel 11** | `/stacks/laravel` | Vercel Edge CDN (Static) | Static DOM / Tailwind | **NON-COMPARABLE (STATIC EMULATION)** |
| **Ruby on Rails 8** | `/stacks/rails` | Vercel Edge CDN (Static) | Static DOM / Tailwind | **NON-COMPARABLE (STATIC EMULATION)** |
| **Spring Boot 3** | `/stacks/springboot` | Vercel Edge CDN (Static) | Static DOM / Tailwind | **NON-COMPARABLE (STATIC EMULATION)** |
| **Nuxt 3** | `/stacks/nuxt` | Vercel Edge CDN (Static) | Static DOM / Tailwind | **NON-COMPARABLE (STATIC EMULATION)** |
| **Jaspr Web** | `/stacks/jaspr` | Vercel Edge CDN (Static) | Static DOM / Tailwind | **NON-COMPARABLE (STATIC EMULATION)** |
| **Angular 19** | `/stacks/angular` | Vercel Edge CDN (Static) | Static DOM / Tailwind | **NON-COMPARABLE (STATIC EMULATION)** |
| **Leptos 0.7** | `/stacks/leptos` | Vercel Edge CDN (Static) | Static DOM / Emulation | **NON-COMPARABLE (WASM ABSENT)** |
| **Blazor WASM** | `/stacks/blazor` | Vercel Edge CDN (Static) | Static DOM / Tailwind | **NON-COMPARABLE (WASM ABSENT)** |

---

## 4. Key Takeaways & Recommendations

1. **Honest Architectural Positioning:**
   The portfolio showcase should be described as a **Design-System and Architectural Replication Experiment**, demonstrating how 12 frameworks model the exact same component hierarchy, rather than a raw server CPU benchmark.
2. **Next-Phase Multi-Cloud Testbed:**
   To perform genuine runtime CPU and memory benchmarking, each backend should be deployed to containerized micro-instances (e.g. Google Cloud Run or AWS ECS with identical 1 vCPU / 512MB RAM allocations) where dynamic responses bypass any edge caching layer.
