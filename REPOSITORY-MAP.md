# Central Repository Mapping & Discovery Registry
## 12 Stacks. 1 Product. Coordinated Multi-Repository Engineering Showcase

**Primary Domain:** [https://reginaldalfret.tech](https://reginaldalfret.tech)  
**Main Repository:** [https://github.com/reginaldalfret/portfolio-website](https://github.com/reginaldalfret/portfolio-website)  
**Project Owner:** Reginald Alfret  
**Audit Date:** November 10, 2026

---

### Central Repository Map

| # | Stack | Repository Remote URL | Local Path | Technology & Version | Default Branch | Feature Branch | Live Route / Preview | Verification Tier |
|---|---|---|---|---|---|---|---|---|
| 1 | **Next.js 14** | `https://github.com/reginaldalfret/portfolio-website.git` | `E:\Portfolio` | Next.js 14.2.23 / React 18 | `main` | `feat/portfolio-lab-separation` | `https://reginaldalfret.tech/` | Production Verified (RSC Edge) |
| 2 | **Nuxt 3** | `https://github.com/reginaldalfret/portfolio-nuxt.git` | `E:\Portfolio-Nuxt` | Nuxt 3.15.4 / Vue 3.5 | `main` | `feat/lab-integration` | `https://reginaldalfret.tech/stacks/nuxt/` | Client Hydration Verified (Nitro SSR) |
| 3 | **Django 6** | `https://github.com/reginaldalfret/portfolio-django.git` | `E:\Portfolio-Django` | Django 6.0a1 / Python 3.13 | `main` | `feat/lab-integration` | `https://reginaldalfret.tech/stacks/django/` | Staging Daemon Verified (Gunicorn WSGI) |
| 4 | **Spring Boot 3** | `https://github.com/reginaldalfret/portfolio-springboot.git` | `E:\Portfolio-SpringBoot` | Spring Boot 3.4.1 / Java 21 | `main` | `feat/lab-integration` | `https://reginaldalfret.tech/stacks/springboot/` | Staging Daemon Verified (Tomcat MVC) |
| 5 | **Laravel 11** | `https://github.com/reginaldalfret/portfolio-laravel.git` | `E:\Portfolio-Laravel` | Laravel 11.38.2 / PHP 8.4 | `main` | `feat/lab-integration` | `https://reginaldalfret.tech/stacks/laravel/` | Staging Daemon Verified (Artisan Blade) |
| 6 | **Ruby on Rails 8** | `https://github.com/reginaldalfret/portfolio-rails.git` | `E:\Portfolio-Rails` | Rails 8.0.1 / Ruby 3.4 YJIT | `main` | `feat/lab-integration` | `https://reginaldalfret.tech/stacks/rails/` | Staging Daemon Verified (Puma Rack) |
| 7 | **Angular 19** | `https://github.com/reginaldalfret/portfolio-angular.git` | `E:\Portfolio-Angular` | Angular 19.2 / TS 6.0 | `main` | `feat/lab-integration` | `https://reginaldalfret.tech/stacks/angular/` | Client SPA Verified (Vite Signals) |
| 8 | **Blazor WASM** | `https://github.com/reginaldalfret/portfolio-blazor.git` | `E:\Portfolio-Blazor` | Blazor WASM / .NET 8.0.11 | `main` | `feat/lab-integration` | `https://reginaldalfret.tech/stacks/blazor/` | Client WASM Verified (Mono VM) |
| 9 | **Go Buffalo** | `https://github.com/reginaldalfret/portfolio-buffalo.git` | `E:\Portfolio-Buffalo` | Buffalo 1.1.4 / Go 1.24 | `main` | `feat/lab-integration` | `https://reginaldalfret.tech/stacks/buffalo/` | Staging Daemon Verified (Plush Engine) |
| 10 | **Leptos 0.7** | `https://github.com/reginaldalfret/portfolio-leptos.git` | `E:\Portfolio-Leptos` | Leptos 0.7.7 / Rust 1.99 | `master`* | `feat/lab-integration` | `https://reginaldalfret.tech/stacks/leptos/` | Client WASM Verified (Rust AOT) |
| 11 | **Jaspr Web** | `https://github.com/reginaldalfret/portfolio-jaspr.git` | `E:\Portfolio-Jaspr` | Jaspr 0.23.0 / Dart 3.13 | `main` | `feat/lab-integration` | `https://reginaldalfret.tech/stacks/jaspr/` | Client SPA Verified (Dart Web) |
| 12 | **Vapor 4** | `https://github.com/reginaldalfret/portfolio-vapor.git` | `E:\Portfolio-Vapor` | Vapor 4.113.2 / Swift 6.0 | `main` | `feat/lab-integration` | `https://reginaldalfret.tech/stacks/vapor/` | Staging Daemon Verified (SwiftNIO) |

*\*Note: `portfolio-leptos` uses `master` as its official default branch on GitHub; all other repositories default to `main`.*

---

### Discovery Validation Details

- **GitHub Remote Verification:** All 12 repositories exist under the `reginaldalfret` GitHub user account and are verified via `gh repo list`.
- **Local Filesystem Verification:** All 12 repositories are independently cloned on disk under `E:\Portfolio*`.
- **Working Tree Inspection:** Working trees inspected; all feature changes are staged on isolated feature branches (`feat/portfolio-lab-separation` for main repo, `feat/lab-integration` for child repos).
- **Default Branch Protection:** No direct pushes to `main` or `master` are executed. Production deployments are gated and isolated.
