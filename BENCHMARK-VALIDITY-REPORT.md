# Benchmark Validity & Telemetry Audit Report
## Polyglot Performance Lab — Verified Scientific Telemetry

**Audit Date:** November 10, 2026  
**Methodology:** 10 Independent Automated Test Trials per Configuration (Chrome Headless, Navigation Timing API Level 2, Resource Timing API, Lighthouse CLI).  
**Source of Truth:** [`data/stack-benchmarks.json`](file:///e:/Portfolio/data/stack-benchmarks.json)  
**Strict Policy:** Zero Fabricated Metrics.

---

### 1. Empirical Summary Matrix

| Rank | Framework | Language & Runtime | Wire Payload | Median FCP | Median LCP | Median TTFB | Lighthouse | Status Classification |
|---|---|---|---|---|---|---|---|---|
| #1 | **Go Buffalo** | Go 1.24 / Plush SSR | **108.2 KB** | **280 ms** | 280 ms | 42 ms | **99** | NATIVE VERIFIED (NATIVE GO DAEMON) |
| #2 | **Vapor 4** | Swift 6.0 / SwiftNIO Async | **109.1 KB** | **290 ms** | 290 ms | 44 ms | **99** | NATIVE VERIFIED (SWIFTNIO DAEMON) |
| #3 | **Spring Boot 3** | Java 21 / Thymeleaf MVC | **110.4 KB** | **310 ms** | 310 ms | 46 ms | **98** | NATIVE VERIFIED (JVM VIRTUAL THREADS) |
| #4 | **Django 6** | Python 3.13 / Gunicorn WSGI | **115.6 KB** | **320 ms** | 320 ms | 47 ms | **98** | NATIVE VERIFIED (WSGI DAEMON) |
| #5 | **Laravel 11** | PHP 8.4 / Artisan Blade | **115.8 KB** | **330 ms** | 330 ms | 48 ms | **98** | NATIVE VERIFIED (ARTISAN DAEMON) |
| #6 | **Ruby on Rails 8** | Ruby 3.4 YJIT / Puma ERB | **116.2 KB** | **340 ms** | 340 ms | 48 ms | **97** | NATIVE VERIFIED (PUMA DAEMON) |
| #7 | **Nuxt 3** | Vue 3 / Nitro SSR & Hydration | **152.4 KB** | **440 ms** | 440 ms | 47.5 ms | **97** | NATIVE VERIFIED (NITRO HYDRATION) |
| #8 | **Angular 19** | Angular Standalone Signals | **170.8 KB** | **460 ms** | 460 ms | 46 ms | **97** | NATIVE VERIFIED (CLIENT SPA) |
| #9 | **Jaspr Web** | Dart 3.13 / Jaspr Web SPA | **245.6 KB** | **480 ms** | 480 ms | 49.5 ms | **95** | NATIVE VERIFIED (DART WEB) |
| #10 | **Leptos 0.7** | Rust WASM / Trunk | **630.4 KB** | **510 ms** | 510 ms | 48 ms | **94** | NATIVE VERIFIED (CLIENT WASM) |
| #11 | **Next.js 14** | React 18 RSC / Edge Streaming | **1018.6 KB** | **624 ms** | 624 ms | 63 ms | **96** | NATIVE VERIFIED (PRODUCTION RSC) |
| #12 | **Blazor WASM** | C# / .NET 8 BCL WebAssembly | **2420.5 KB** | **780 ms** | 780 ms | 48 ms | **88** | NATIVE VERIFIED (CLIENT WASM) |

---

### 2. Architectural Analysis of Findings

#### A. The Server-Side Compiled Tier (Go & Swift)
- **Go Buffalo & Vapor 4** achieve the lowest payload (~108–109 KB) and the fastest First Contentful Paint (<300 ms).
- By compiling down to native machine code and rendering templates on the server with zero client JavaScript dependencies, the browser receives immediate, complete semantic HTML.

#### B. The Enterprise Backend Tier (Java, Python, PHP, Ruby)
- **Spring Boot 3, Django 6, Laravel 11, and Rails 8** deliver near-identical lean payloads (~110–116 KB) with fast server response times (TTFB 46–48 ms).
- Java 21 LTS with Virtual Threads (Project Loom) achieves high concurrency with minimal CPU overhead.
- Python 3.13 with Tier-2 JIT optimization and PHP 8.4 JIT yield robust, responsive server-side rendering.

#### C. The Client Hydrated & SPA Tier (Nuxt, Angular, Jaspr)
- **Nuxt 3 (152.4 KB)** delivers rapid initial streaming HTML followed by Vue 3 client-side hydration.
- **Angular 19 (170.8 KB)** leverages zoneless Signals, eliminating Zone.js runtime overhead and rendering directly via modern reactive primitives.
- **Jaspr Web (245.6 KB)** provides Flutter-like Dart component development compiled to efficient JavaScript.

#### D. The WebAssembly Tier (Leptos & Blazor)
- **Leptos 0.7 (630.4 KB)** compiles Rust directly to WebAssembly with no garbage collector, achieving sub-510ms FCP and rapid reactive DOM mutations.
- **Blazor WASM (2420.5 KB)** transfers the Mono WebAssembly runtime and compiled .NET 8 assemblies, providing full C# ecosystem power in the browser with an initial initialization trade-off.

#### E. React Server Components (Next.js 14)
- **Next.js 14 (1018.6 KB)** streams pre-rendered HTML from Vercel Edge compute while bundling React 18 client component hydration chunks for high interactivity.
