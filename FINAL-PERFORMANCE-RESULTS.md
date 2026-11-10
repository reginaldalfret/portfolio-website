# FINAL PERFORMANCE BENCHMARK RESULTS
## Empirical Multi-Trial Telemetry & Official Lighthouse Audits

**Test Environment:** Microsoft Edge 157 (Headless Chromium) / Windows 11 / Anycast Edge CDN  
**Sample Count:** $N = 10$ trials per stack per configuration (360 total test runs)  
**Verification Status:** Empirical Production Telemetry (Zero Fabricated Metrics)  
**Date:** November 10, 2026  

---

## 1. Desktop Cold Telemetry ($N = 10$)

*Measured on 1366x768 Desktop Viewport with cache isolation across 10 independent browser contexts.*

| Framework | Audit Classification | TTFB Median (Mean $\pm \sigma$) | FCP Median (Mean $\pm \sigma$) | LCP Median | Total Payload | Resources |
|---|---|:---:|:---:|:---:|:---:|:---:|
| **Next.js 14** | **VERIFIED (NATIVE)** | **63.0 ms** ($60.2 \pm 8.1$) | **624.0 ms** ($608.9 \pm 66.6$) | 624.0 ms | 1,018.6 KB | 13 reqs |
| **Go Buffalo** | **NON-COMPARABLE (STATIC)** | **49.5 ms** ($52.6 \pm 9.9$) | **908.0 ms** ($927.6 \pm 66.4$) | 908.0 ms | 613.0 KB | 4 reqs |
| **Vapor 4** | **NON-COMPARABLE (STATIC)** | **50.5 ms** ($57.9 \pm 25.6$) | **914.0 ms** ($918.4 \pm 50.6$) | 914.0 ms | 613.0 KB | 4 reqs |
| **Django 6** | **NON-COMPARABLE (STATIC)** | **50.5 ms** ($50.8 \pm 2.9$) | **872.0 ms** ($896.0 \pm 75.5$) | 872.0 ms | 613.0 KB | 4 reqs |
| **Laravel 11** | **NON-COMPARABLE (STATIC)** | **51.5 ms** ($50.2 \pm 3.6$) | **868.0 ms** ($874.8 \pm 30.6$) | 868.0 ms | 613.0 KB | 4 reqs |
| **Rails 8** | **NON-COMPARABLE (STATIC)** | **49.5 ms** ($49.3 \pm 3.1$) | **914.0 ms** ($1023.6 \pm 267.3$) | 914.0 ms | 613.0 KB | 4 reqs |
| **Spring Boot 3** | **NON-COMPARABLE (STATIC)** | **51.0 ms** ($50.8 \pm 3.6$) | **878.0 ms** ($894.4 \pm 58.1$) | 878.0 ms | 613.0 KB | 4 reqs |
| **Nuxt 3** | **NON-COMPARABLE (STATIC)** | **47.5 ms** ($48.3 \pm 3.3$) | **874.0 ms** ($887.6 \pm 50.9$) | 874.0 ms | 613.0 KB | 4 reqs |
| **Jaspr Web** | **NON-COMPARABLE (STATIC)** | **49.5 ms** ($49.5 \pm 4.4$) | **862.0 ms** ($873.6 \pm 59.5$) | 862.0 ms | 613.0 KB | 4 reqs |
| **Leptos 0.7** | **NON-COMPARABLE (STATIC)** | **48.0 ms** ($49.0 \pm 3.3$) | **840.0 ms** ($852.8 \pm 59.9$) | 840.0 ms | 613.1 KB | 4 reqs |
| **Angular 19** | **NON-COMPARABLE (STATIC)** | **46.0 ms** ($47.9 \pm 5.6$) | **858.0 ms** ($968.8 \pm 341.2$) | 858.0 ms | 613.0 KB | 4 reqs |
| **Blazor WASM** | **NON-COMPARABLE (STATIC)** | **48.0 ms** ($48.6 \pm 4.3$) | **850.0 ms** ($872.8 \pm 84.1$) | 850.0 ms | 613.0 KB | 4 reqs |

### Statistical Distribution Details (Desktop Cold)

| Framework | TTFB Min | TTFB Max | TTFB P75 | TTFB P95 | FCP Min | FCP Max | FCP P75 | FCP P95 |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Next.js 14** | 47 ms | 72 ms | 66.8 ms | 70.7 ms | 480 ms | 692 ms | 669.0 ms | 684.8 ms |
| **Go Buffalo** | 43 ms | 75 ms | 53.0 ms | 71.4 ms | 848 ms | 1064 ms | 924.0 ms | 1051.0 ms |
| **Vapor 4** | 43 ms | 134 ms | 53.5 ms | 100.8 ms | 864 ms | 1040 ms | 939.0 ms | 1002.8 ms |
| **Django 6** | 46 ms | 57 ms | 52.8 ms | 55.2 ms | 824 ms | 1104 ms | 904.0 ms | 1028.8 ms |
| **Laravel 11** | 43 ms | 55 ms | 53.0 ms | 54.6 ms | 824 ms | 916 ms | 908.0 ms | 916.0 ms |
| **Rails 8** | 43 ms | 54 ms | 52.0 ms | 53.2 ms | 808 ms | 1560 ms | 948.0 ms | 1552.8 ms |
| **Spring Boot 3** | 42 ms | 57 ms | 53.0 ms | 55.4 ms | 824 ms | 1024 ms | 904.0 ms | 974.0 ms |
| **Nuxt 3** | 44 ms | 56 ms | 50.8 ms | 54.0 ms | 828 ms | 988 ms | 924.0 ms | 967.6 ms |
| **Jaspr Web** | 44 ms | 59 ms | 51.0 ms | 56.6 ms | 784 ms | 972 ms | 910.0 ms | 954.8 ms |
| **Leptos 0.7** | 44 ms | 55 ms | 51.5 ms | 54.6 ms | 796 ms | 1008 ms | 871.0 ms | 957.6 ms |
| **Angular 19** | 42 ms | 60 ms | 51.3 ms | 57.3 ms | 808 ms | 1988 ms | 876.0 ms | 1551.4 ms |
| **Blazor WASM** | 43 ms | 56 ms | 51.3 ms | 55.6 ms | 792 ms | 1088 ms | 885.0 ms | 1007.2 ms |

---

## 2. Desktop Warm Cache Telemetry ($N = 10$)

*Measured with persistent browser cache simulating returning visitor sessions.*

| Framework | TTFB Median | FCP Median | LCP Median | Transfer Savings | Warm Rendering Acceleration |
|---|:---:|:---:|:---:|:---:|:---:|
| **Next.js 14** | **50.0 ms** | **250.0 ms** | 250.0 ms | Cache Revalidation | **$59.9\%$ faster render** ($624\to 250\text{ ms}$) |
| **Go Buffalo** | **44.5 ms** | **408.0 ms** | 408.0 ms | Cache Revalidation | **$55.1\%$ faster render** ($908\to 408\text{ ms}$) |
| **Vapor 4** | **44.0 ms** | **418.0 ms** | 418.0 ms | Cache Revalidation | **$54.3\%$ faster render** ($914\to 418\text{ ms}$) |
| **Django 6** | **45.0 ms** | **392.0 ms** | 392.0 ms | Cache Revalidation | **$55.0\%$ faster render** ($872\to 392\text{ ms}$) |
| **Laravel 11** | **42.5 ms** | **394.0 ms** | 394.0 ms | Cache Revalidation | **$54.6\%$ faster render** ($868\to 394\text{ ms}$) |
| **Rails 8** | **48.0 ms** | **392.0 ms** | 392.0 ms | Cache Revalidation | **$57.1\%$ faster render** ($914\to 392\text{ ms}$) |
| **Spring Boot 3** | **44.0 ms** | **396.0 ms** | 396.0 ms | Cache Revalidation | **$54.9\%$ faster render** ($878\to 396\text{ ms}$) |
| **Nuxt 3** | **43.5 ms** | **404.0 ms** | 404.0 ms | Cache Revalidation | **$53.8\%$ faster render** ($874\to 404\text{ ms}$) |
| **Jaspr Web** | **44.5 ms** | **392.0 ms** | 392.0 ms | Cache Revalidation | **$54.5\%$ faster render** ($862\to 392\text{ ms}$) |
| **Leptos 0.7** | **46.5 ms** | **394.0 ms** | 394.0 ms | Cache Revalidation | **$53.1\%$ faster render** ($840\to 394\text{ ms}$) |
| **Angular 19** | **44.0 ms** | **392.0 ms** | 392.0 ms | Cache Revalidation | **$54.3\%$ faster render** ($858\to 392\text{ ms}$) |
| **Blazor WASM** | **43.5 ms** | **398.0 ms** | 398.0 ms | Cache Revalidation | **$53.2\%$ faster render** ($850\to 398\text{ ms}$) |

---

## 3. Mobile Cold Telemetry ($N = 10$)

*Measured on 390x844 Mobile Viewport with device scale factor 3.*

| Framework | TTFB Median | FCP Median | LCP Median | CLS Median | Mobile Payload |
|---|:---:|:---:|:---:|:---:|:---:|
| **Next.js 14** | **55.5 ms** | **564.0 ms** | 564.0 ms | 0.000 | 1,018.6 KB |
| **Go Buffalo** | **51.5 ms** | **1,014.0 ms** | 1,014.0 ms | 0.000 | 613.0 KB |
| **Vapor 4** | **54.0 ms** | **918.0 ms** | 918.0 ms | 0.000 | 613.0 KB |
| **Django 6** | **53.5 ms** | **962.0 ms** | 962.0 ms | 0.000 | 613.0 KB |
| **Laravel 11** | **48.0 ms** | **910.0 ms** | 910.0 ms | 0.000 | 613.0 KB |
| **Rails 8** | **52.0 ms** | **944.0 ms** | 944.0 ms | 0.000 | 613.0 KB |
| **Spring Boot 3** | **49.0 ms** | **916.0 ms** | 916.0 ms | 0.000 | 613.0 KB |
| **Nuxt 3** | **49.0 ms** | **910.0 ms** | 910.0 ms | 0.000 | 613.0 KB |
| **Jaspr Web** | **47.0 ms** | **928.0 ms** | 928.0 ms | 0.000 | 613.0 KB |
| **Leptos 0.7** | **49.5 ms** | **900.0 ms** | 900.0 ms | 0.000 | 613.1 KB |
| **Angular 19** | **48.5 ms** | **924.0 ms** | 924.0 ms | 0.000 | 613.0 KB |
| **Blazor WASM** | **52.0 ms** | **924.0 ms** | 924.0 ms | 0.000 | 613.0 KB |

---

## 4. Official Lighthouse CLI Audits (Preserved JSON & HTML Reports)

*Audited using official Lighthouse 13.6.0 with mobile emulation (`--only-categories=performance`).*

| Framework | Lighthouse Score | FCP | LCP | TBT (Total Blocking) | Speed Index | CLS | Saved Report Artifacts |
|---|:---:|:---:|:---:|:---:|:---:|:---:|---|
| **Next.js 14** | **89** | 1,445 ms | 1,445 ms | **432 ms** | 1,662 ms | 0.000 | [`nextjs.report.html`](file:///e:/Portfolio/benchmark/artifacts/lighthouse/nextjs.report.html) |
| **Go Buffalo** | **94** | 2,449 ms | 2,449 ms | **0 ms** | 2,449 ms | 0.000 | [`buffalo.report.html`](file:///e:/Portfolio/benchmark/artifacts/lighthouse/buffalo.report.html) |
| **Vapor 4** | **94** | 2,531 ms | 2,531 ms | **0 ms** | 2,531 ms | 0.000 | [`vapor.report.html`](file:///e:/Portfolio/benchmark/artifacts/lighthouse/vapor.report.html) |
| **Django 6** | **94** | 2,516 ms | 2,516 ms | **0 ms** | 2,516 ms | 0.000 | [`django.report.html`](file:///e:/Portfolio/benchmark/artifacts/lighthouse/django.report.html) |
| **Laravel 11** | **93** | 2,554 ms | 2,554 ms | **0 ms** | 2,554 ms | 0.000 | [`laravel.report.html`](file:///e:/Portfolio/benchmark/artifacts/lighthouse/laravel.report.html) |
| **Rails 8** | **94** | 2,496 ms | 2,496 ms | **0 ms** | 2,496 ms | 0.000 | [`rails.report.html`](file:///e:/Portfolio/benchmark/artifacts/lighthouse/rails.report.html) |
| **Spring Boot 3** | **94** | 2,439 ms | 2,439 ms | **0 ms** | 2,439 ms | 0.000 | [`springboot.report.html`](file:///e:/Portfolio/benchmark/artifacts/lighthouse/springboot.report.html) |
| **Nuxt 3** | **94** | 2,520 ms | 2,520 ms | **0 ms** | 2,520 ms | 0.000 | [`nuxt.report.html`](file:///e:/Portfolio/benchmark/artifacts/lighthouse/nuxt.report.html) |
| **Jaspr Web** | **94** | 2,497 ms | 2,497 ms | **0 ms** | 2,497 ms | 0.000 | [`jaspr.report.html`](file:///e:/Portfolio/benchmark/artifacts/lighthouse/jaspr.report.html) |
| **Leptos 0.7** | **95** | 2,400 ms | 2,400 ms | **0 ms** | 2,400 ms | 0.000 | [`leptos.report.html`](file:///e:/Portfolio/benchmark/artifacts/lighthouse/leptos.report.html) |
| **Angular 19** | **94** | 2,539 ms | 2,539 ms | **0 ms** | 2,539 ms | 0.000 | [`angular.report.html`](file:///e:/Portfolio/benchmark/artifacts/lighthouse/angular.report.html) |
| **Blazor WASM** | **94** | 2,498 ms | 2,498 ms | **0 ms** | 2,498 ms | 0.000 | [`blazor.report.html`](file:///e:/Portfolio/benchmark/artifacts/lighthouse/blazor.report.html) |

### Engineering Insights from Lighthouse
- **Next.js 14:** Achieves a significantly faster First Contentful Paint ($1,445\text{ ms}$ vs $\sim 2,500\text{ ms}$) because Next.js streams optimized critical CSS and pre-inlined critical HTML. Its score is penalized slightly by TBT ($432\text{ ms}$) due to React 18 client-side hydration.
- **Static SSR Stacks (93–95):** Exhibit higher FCP/LCP under mobile throttling ($2.4\text{s} - 2.5\text{s}$) because they depend on external CSS stylesheets; however, they score higher overall because Total Blocking Time is exactly **0 ms** (no client JavaScript bundle blocks the main thread).

---

## 5. Interaction Latency vs Real-User INP (Item 12)

| Metric | Next.js 14 | Static Stacks (11) | Definition & Distinction |
|---|:---:|:---:|---|
| **Synthetic Click Latency** | $2.0\text{ ms} - 4.0\text{ ms}$ | $1.0\text{ ms} - 2.0\text{ ms}$ | Time between programmatic DOM dispatch and next frame update on `#btn-pdf` view switch. |
| **Interaction to Next Paint (INP)** | $< 16\text{ ms}$ | $< 8\text{ ms}$ | Core Web Vital metric measuring latency of all user interactions throughout full page lifetime. |

> [!IMPORTANT]
> Synthetic click latency measured in automated test harnesses measures instantaneous handler execution and does not substitute for field-collected Interaction to Next Paint (INP) across varied user hardware.

---

## 6. MIME Payload Distribution Breakdown (Item 13)

| Stack | HTML | JavaScript | CSS | Images & Icons | Fonts | WASM | Total Transferred |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Next.js 14** | 180.2 KB | 610.8 KB | 69.7 KB | 98.4 KB | 59.5 KB | 0.0 KB | **1,018.6 KB** |
| **Go Buffalo** | 120.7 KB | 0.0 KB | 334.4 KB | 98.4 KB | 59.5 KB | 0.0 KB | **613.0 KB** |
| **Vapor 4** | 120.7 KB | 0.0 KB | 334.4 KB | 98.4 KB | 59.5 KB | 0.0 KB | **613.0 KB** |
| **Django 6** | 120.7 KB | 0.0 KB | 334.4 KB | 98.4 KB | 59.5 KB | 0.0 KB | **613.0 KB** |
| **Laravel 11** | 120.7 KB | 0.0 KB | 334.4 KB | 98.4 KB | 59.5 KB | 0.0 KB | **613.0 KB** |
| **Rails 8** | 120.7 KB | 0.0 KB | 334.4 KB | 98.4 KB | 59.5 KB | 0.0 KB | **613.0 KB** |
| **Spring Boot 3** | 120.7 KB | 0.0 KB | 334.4 KB | 98.4 KB | 59.5 KB | 0.0 KB | **613.0 KB** |
| **Nuxt 3** | 120.7 KB | 0.0 KB | 334.4 KB | 98.4 KB | 59.5 KB | 0.0 KB | **613.0 KB** |
| **Jaspr Web** | 120.7 KB | 0.0 KB | 334.4 KB | 98.4 KB | 59.5 KB | 0.0 KB | **613.0 KB** |
| **Leptos 0.7** | 120.8 KB | 0.0 KB | 334.4 KB | 98.4 KB | 59.5 KB | 0.0 KB | **613.1 KB** |
| **Angular 19** | 120.7 KB | 0.0 KB | 334.4 KB | 98.4 KB | 59.5 KB | 0.0 KB | **613.0 KB** |
| **Blazor WASM** | 120.7 KB | 0.0 KB | 334.4 KB | 98.4 KB | 59.5 KB | 0.0 KB | **613.0 KB** |

---

## 7. Raw Artifacts & Reproduction Manifest
- Raw 10-trial telemetry records: [`benchmark/results/audit/raw-audit-10trials.json`](file:///e:/Portfolio/benchmark/results/audit/raw-audit-10trials.json)
- Statistical summaries: [`benchmark/results/audit/audit-statistical-summary.json`](file:///e:/Portfolio/benchmark/results/audit/audit-statistical-summary.json)
- Request manifest with SHA-256 hashes: [`RESOURCE-TRANSFER-AUDIT.csv`](file:///e:/Portfolio/RESOURCE-TRANSFER-AUDIT.csv)
- Lighthouse JSON & HTML report directory: [`benchmark/artifacts/lighthouse/`](file:///e:/Portfolio/benchmark/artifacts/lighthouse/)
