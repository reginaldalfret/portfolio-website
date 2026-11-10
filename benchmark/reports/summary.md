# POLYGLOT PERFORMANCE LAB — BENCHMARK RESULTS REPORT

**Test Execution Date**: 2026-11-10T05:11:35.206Z
**Viewport Profile**: MOBILE (390x844)
**Cache Profile**: COLD
**Sample Trials per Stack**: 5
**Testing Engine**: Playwright Headless Chromium (Edge Channel) on Production [reginaldalfret.tech](https://reginaldalfret.tech)

## Leaderboard (Ranked by Fastest First Contentful Paint)

| Rank | Framework | Language | Architecture | Lighthouse | FCP (Median) | FCP (P75) | TTFB (Median) | Total Payload | JS Transfer | WASM Transfer |
|:---:|---|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **#1** | **Next.js 14** | React / TS | Hybrid Edge RSC | **85** | **648 ms** | 704 ms | 63 ms | **1004.8 KB** | 759.4 KB | 0 KB |
| **#2** | **Nuxt 3** | Vue 3 / TS | Universal SSR | **85** | **852 ms** | 900 ms | 63 ms | **612.3 KB** | 397.7 KB | 0 KB |
| **#3** | **Laravel 11** | PHP | Blade SSR | **85** | **888 ms** | 916 ms | 48 ms | **612.3 KB** | 397.7 KB | 0 KB |
| **#4** | **Spring Boot 3** | Java | Thymeleaf SSR | **85** | **888 ms** | 892 ms | 52 ms | **612.3 KB** | 397.7 KB | 0 KB |
| **#5** | **Vapor 4** | Swift | Async SwiftNIO SSR | **85** | **900 ms** | 924 ms | 44 ms | **612.3 KB** | 397.7 KB | 0 KB |
| **#6** | **Jaspr Web** | Dart | Hydrated SSR | **85** | **920 ms** | 924 ms | 61 ms | **612.3 KB** | 397.7 KB | 0 KB |
| **#7** | **Angular 19** | Angular / TS | Signals SPA | **85** | **920 ms** | 920 ms | 62 ms | **612.3 KB** | 397.7 KB | 0 KB |
| **#8** | **Blazor WASM** | C# / .NET 8 | Client WASM | **85** | **920 ms** | 924 ms | 56 ms | **612.3 KB** | 397.7 KB | 0 KB |
| **#9** | **Ruby on Rails 8** | Ruby | ActionView SSR | **85** | **924 ms** | 944 ms | 48 ms | **612.3 KB** | 397.7 KB | 0 KB |
| **#10** | **Django 6** | Python | Pure MVT SSR | **85** | **936 ms** | 948 ms | 50 ms | **612.3 KB** | 397.7 KB | 0 KB |
| **#11** | **Leptos 0.7** | Rust | Client WASM | **85** | **936 ms** | 940 ms | 65 ms | **612.4 KB** | 397.7 KB | 0 KB |
| **#12** | **Go Buffalo** | Go | Native SSR | **85** | **944 ms** | 1104 ms | 58 ms | **612.3 KB** | 397.7 KB | 0 KB |


### Statistical Notes & Precision
- All metrics were recorded dynamically across 5 consecutive trials with navigation timing and response payload interception.
- Outliers and network jitter are captured via Min, Max, and P75/P95 distributions.
