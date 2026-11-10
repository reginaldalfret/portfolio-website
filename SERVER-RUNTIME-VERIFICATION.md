# SERVER RUNTIME & ARCHITECTURE VERIFICATION REPORT
## Independent Audit of the 12-Stack Portfolio Deployment at reginaldalfret.tech

**Audit Date:** November 10, 2026  
**Auditor:** Principal Performance & Systems Architect  
**Domain Under Test:** `https://reginaldalfret.tech`  
**Hosting Provider:** Vercel Global Edge Network (Anycast CDN & Serverless Compute)

---

## 1. Executive Summary

An exhaustive protocol-level audit was conducted across all twelve production endpoints on `https://reginaldalfret.tech`. The purpose of this investigation was to verify whether each implementation actually executes its claimed native runtime (e.g., Java 21 / Spring Boot, Swift 6.0 / Vapor, Python 3.13 / Django, PHP 8.4 / Laravel, Ruby 3.4 / Rails, Go 1.27 / Buffalo, Rust / Leptos WASM, .NET 8 / Blazor WASM) or whether the observed responses are delivered via static pre-renders and edge cache emulation.

### Critical Audit Findings

1. **Only Next.js 14 Executes Its Native Framework Runtime:**
   The root path (`/`) executes native Next.js 14 React Server Components (RSC) and React 18 hydration bundles compiled by `@vercel/next` on Vercel Edge / Node runtime.
2. **All Eleven Non-Next.js Endpoints Are Static HTML Exports:**
   Endpoints `/stacks/buffalo`, `/stacks/vapor`, `/stacks/django`, `/stacks/laravel`, `/stacks/rails`, `/stacks/springboot`, `/stacks/nuxt`, `/stacks/jaspr`, `/stacks/leptos`, `/stacks/angular`, and `/stacks/blazor` are **static pre-rendered HTML files** stored in `public/stacks/<stack>/index.html`.
3. **No Native Backend Runtimes Are Active on Production:**
   There is **no active JVM (Tomcat)**, **no Python WSGI/ASGI (Gunicorn)**, **no Ruby process (Puma)**, **no PHP engine (PHP-FPM)**, **no Swift runtime (SwiftNIO)**, and **no Go compiled binary** executing on `https://reginaldalfret.tech`.
4. **WebAssembly Runtimes Are Not Initialized on Static Routes:**
   - **Blazor WASM:** Does not load `dotnet.wasm`, `dotnet.js`, or the .NET runtime BCL DLLs.
   - **Leptos:** Does not download or execute a compiled Rust `.wasm` binary for client DOM reconciliation; it serves an HTML template with an emulation script.
5. **Time to First Byte (TTFB) Measures Edge CDN Latency, Not Server Execution:**
   The measured TTFB ($43\text{ ms} - 65\text{ ms}$) across all eleven non-Next.js stacks measures **Vercel Edge PoP static asset delivery time**, not application-tier processing time.

---

## 2. Protocol-Level Telemetry & Header Inspection

Every endpoint was probed via raw HTTPS requests to inspect response headers, server identification, caching layers, and payload signatures.

### Network Header Audit Table

| Stack Endpoint | HTTP Status | `Server` Header | `X-Vercel-Cache` | `Content-Type` | Transferred HTML Bytes | Native Runtime Signature |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| `/` (Next.js) | `200 OK` | `Vercel` | `HIT` / `PRERENDER` | `text/html; charset=utf-8` | 184,192 B | `Next-Router-State-Tree`, `RSC` |
| `/stacks/buffalo` | `200 OK` | `Vercel` | `MISS` / `HIT` | `text/html; charset=utf-8` | 122,932 B | **None** (Static HTML) |
| `/stacks/vapor` | `200 OK` | `Vercel` | `MISS` / `HIT` | `text/html; charset=utf-8` | 122,941 B | **None** (Static HTML) |
| `/stacks/django` | `200 OK` | `Vercel` | `MISS` / `HIT` | `text/html; charset=utf-8` | 122,944 B | **None** (Static HTML) |
| `/stacks/laravel` | `200 OK` | `Vercel` | `MISS` / `HIT` | `text/html; charset=utf-8` | 122,932 B | **None** (Static HTML) |
| `/stacks/rails` | `200 OK` | `Vercel` | `MISS` / `HIT` | `text/html; charset=utf-8` | 122,947 B | **None** (Static HTML) |
| `/stacks/springboot` | `200 OK` | `Vercel` | `MISS` / `HIT` | `text/html; charset=utf-8` | 122,936 B | **None** (Static HTML) |
| `/stacks/nuxt` | `200 OK` | `Vercel` | `MISS` / `HIT` | `text/html; charset=utf-8` | 122,944 B | **None** (Static HTML) |
| `/stacks/jaspr` | `200 OK` | `Vercel` | `MISS` / `HIT` | `text/html; charset=utf-8` | 122,941 B | **None** (Static HTML) |
| `/stacks/leptos` | `200 OK` | `Vercel` | `MISS` / `HIT` | `text/html; charset=utf-8` | 123,031 B | **None** (Static HTML) |
| `/stacks/angular` | `200 OK` | `Vercel` | `MISS` / `HIT` | `text/html; charset=utf-8` | 122,938 B | **None** (Static HTML) |
| `/stacks/blazor` | `200 OK` | `Vercel` | `MISS` / `HIT` | `text/html; charset=utf-8` | 122,943 B | **None** (Static HTML) |

### Header Analysis Findings

1. **Uniform Edge Server:** All 12 responses return `Server: Vercel` and Vercel edge routing identifiers (`x-vercel-id: bom1::...`).
2. **Identical Byte Distribution:** Non-Next.js endpoints differ in payload size by fewer than 100 bytes (e.g., 122,932 B for Buffalo vs 122,947 B for Rails). This delta represents only the string length differences in framework labels (e.g., `BUFFALO` vs `RUBY ON RAILS 8`).
3. **Absence of Server Headers:** None of the non-Next.js stacks expose ecosystem headers (e.g., `X-Powered-By: PHP/8.4`, `Server: Puma`, `X-Runtime`, `Server: Werkzeug/Django`, `X-Application-Context: Spring`).

---

## 3. Stack-by-Stack Runtime Verification

### 1. Next.js 14 (React 18 / TypeScript)
- **Claimed Architecture:** Edge SSR / Hybrid RSC.
- **Actual Runtime Verified:** **TRUE.** Executes as Next.js 14 App Router on Vercel Serverless / Edge. Generates full React Server Component payloads and client hydration chunks.
- **Audit Classification:** **VERIFIED (NATIVE PRODUCTION)**.

### 2. Spring Boot 3 (Java 21 / Thymeleaf)
- **Claimed Architecture:** JVM SSR / Embedded Tomcat.
- **Actual Runtime Verified:** **FALSE.** No JVM process is executing. The endpoint `/stacks/springboot` is a static HTML pre-render served by Vercel CDN.
- **Audit Classification:** **NON-COMPARABLE (STATIC PRE-RENDER)**.

### 3. Django 6 (Python 3.13 / MVT)
- **Claimed Architecture:** Python Dynamic SSR / Django Templates.
- **Actual Runtime Verified:** **FALSE.** No Python interpreter or WSGI/ASGI server is executing. Static HTML export served from edge cache.
- **Audit Classification:** **NON-COMPARABLE (STATIC PRE-RENDER)**.

### 4. Ruby on Rails 8 (Ruby 3.4 / ActionView)
- **Claimed Architecture:** Ruby Dynamic SSR / Puma ERB.
- **Actual Runtime Verified:** **FALSE.** No Ruby runtime or Puma instance is handling HTTP requests. Static HTML export.
- **Audit Classification:** **NON-COMPARABLE (STATIC PRE-RENDER)**.

### 5. Laravel 11/12 (PHP 8.4 / Blade)
- **Claimed Architecture:** PHP MVC / Blade Engine.
- **Actual Runtime Verified:** **FALSE.** No PHP-FPM worker or Artisan server is executing. Static HTML export.
- **Audit Classification:** **NON-COMPARABLE (STATIC PRE-RENDER)**.

### 6. Vapor 4 (Swift 6.0 / SwiftNIO)
- **Claimed Architecture:** Native Async SSR / SwiftNIO.
- **Actual Runtime Verified:** **FALSE.** No Swift binary is compiled or listening on a socket. Static HTML export.
- **Audit Classification:** **NON-COMPARABLE (STATIC PRE-RENDER)**.

### 7. Go Buffalo (Go 1.27 / Plush)
- **Claimed Architecture:** Native Compiled SSR / Gorilla Mux.
- **Actual Runtime Verified:** **FALSE.** No Go compiled binary is active. Static HTML export.
- **Audit Classification:** **NON-COMPARABLE (STATIC PRE-RENDER)**.

### 8. Nuxt 3 (Vue 3 / Nitro)
- **Claimed Architecture:** Universal SSR / Nitro Engine.
- **Actual Runtime Verified:** **FALSE.** Does not execute a Nitro Node/Edge serverless bundle on this route; serves static HTML export.
- **Audit Classification:** **NON-COMPARABLE (STATIC PRE-RENDER)**.

### 9. Jaspr (Dart 3.13 / Web)
- **Claimed Architecture:** Hydrated SSR / Reactive Components.
- **Actual Runtime Verified:** **FALSE.** No Dart-to-JavaScript compilation artifacts or hydration scripts are executed. Static HTML export.
- **Audit Classification:** **NON-COMPARABLE (STATIC PRE-RENDER)**.

### 10. Angular 19 (TypeScript 6.0 / Signals)
- **Claimed Architecture:** Standalone SPA / Signals Engine.
- **Actual Runtime Verified:** **FALSE.** Does not bootstrap Angular runtime (`@angular/core`) or component signal trees. Static HTML export.
- **Audit Classification:** **NON-COMPARABLE (STATIC PRE-RENDER)**.

### 11. Leptos 0.7 (Rust / WebAssembly)
- **Claimed Architecture:** Client WASM / Trunk.
- **Actual Runtime Verified:** **FALSE.** No `.wasm` file is transferred or instantiated via `WebAssembly.instantiateStreaming`. An emulation script logs initialization to console without WASM execution.
- **Audit Classification:** **NON-COMPARABLE (STATIC PRE-RENDER / WASM ABSENT)**.

### 12. Blazor (.NET 8 / C# WASM)
- **Claimed Architecture:** Client-side WASM SPA / Mono Runtime.
- **Actual Runtime Verified:** **FALSE.** No `dotnet.wasm`, `dotnet.js`, or .NET assemblies (`*.dll`) are downloaded. Static HTML export.
- **Audit Classification:** **NON-COMPARABLE (STATIC PRE-RENDER / WASM ABSENT)**.

---

## 4. Architectural Implication on Performance Metrics

1. **TTFB Comparability:**
   Because 11 of the 12 stacks are static files served from Vercel's global CDN cache, TTFB variance reflects **Vercel PoP network route latency**, not framework CPU execution time. Go Buffalo is not "faster" than Spring Boot because Go executes faster; both are static files served from the identical edge storage bucket.
2. **FCP Comparability:**
   All 11 static stacks share identical DOM complexity (30 PR cards, Tailwind utility classes, hero section) and identical CSS stylesheets. Differences in FCP among these 11 are within normal network jitter and Chromium layout engine variance ($800\text{ ms} - 950\text{ ms}$).
3. **Payload Comparability:**
   Next.js 14 transfers $\sim 1,004.8\text{ KB}$ because it ships the full React 18 client hydration runtime, router scripts, and interactive component state. The other 11 stacks transfer $\sim 612.3\text{ KB}$ because they ship only static HTML, Tailwind CDN styles, and image assets without their corresponding client runtime dependencies.

---

## 5. Architectural Verification Verdict

The current deployment on `https://reginaldalfret.tech` represents a **Unified Edge CDN Showcase** rather than a live multi-runtime benchmarking testbed.

To benchmark the actual runtime efficiency of Go Buffalo vs Spring Boot vs Django vs Vapor vs Rails vs Laravel, each implementation must be deployed to an isolated, identical virtualized instance (e.g., containerized on Cloud Run or ECS with identical 1 vCPU / 2GB RAM limits) without CDN caching.
