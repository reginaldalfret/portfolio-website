# Polyglot Architecture & Deployment Specification
## 12 Stacks. 1 Product. Native Runtime Reconstruction

---

### Executive Overview

The **12 Stacks. 1 Product.** initiative represents an architectural experiment demonstrating how twelve modern software engineering ecosystems implement the identical obsidian resume portfolio (`https://reginaldalfret.tech`).

Following an independent scientific audit, the project transitioned away from static HTML emulation to **genuine, native framework runtimes**. Each application compiles and executes using its native language compiler, toolchain, runtime, and deployment model.

---

### Classification of the 12 Native Implementations

The twelve implementations are organized into four distinct architectural tiers:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      12 STACKS ARCHITECTURAL TIERS                     │
├──────────────────┬──────────────────┬─────────────────┬────────────────┤
│ Client WASM      │ Client SPA       │ Full-Stack SSR  │ Backend MVC    │
│ (Ahead-of-Time)  │ (Component DOM)  │ (Edge Hydrated) │ (Daemon Engine)│
├──────────────────┼──────────────────┼─────────────────┼────────────────┤
│ • Leptos (Rust)  │ • Angular (TS)   │ • Next.js (RSC) │ • Go Buffalo   │
│ • Blazor (C#)    │ • Jaspr (Dart)   │ • Nuxt 3 (Vue)  │ • Vapor (Swift)│
│                  │                  │                 │ • Django (Py)  │
│                  │                  │                 │ • Laravel (PHP)│
│                  │                  │                 │ • Rails (Ruby) │
│                  │                  │                 │ • Spring (Java)│
└──────────────────┴──────────────────┴─────────────────┴────────────────┘
```

---

### Implementation & Runtime Specifications

| # | Framework | Language & Toolchain | Runtime Model | Asset Signature | Port / Endpoint | Deployment Target |
|---|---|---|---|---|---|---|
| 1 | **Next.js 14** | TypeScript · React 18 · Node.js 24 | React Server Components · Edge SSR | `/_next/static/chunks/` | `/` (Edge) | Vercel Edge Global |
| 2 | **Leptos 0.7** | Rust 1.99.1 · Cargo · Trunk · `wasm-bindgen` | Client-Side WebAssembly (AOT) | `portfolio-leptos-*.wasm` (626 KB) | `/stacks/leptos/` | Vercel Static + WASM |
| 3 | **Blazor** | .NET 8 SDK · C# 12 · Blazor WASM | Mono WebAssembly Runtime + BCL | `dotnet.native.wasm`, `blazor.webassembly.js`, 31 `.wasm` DLLs | `/stacks/blazor/` | Vercel Static + WASM |
| 4 | **Angular 19** | TypeScript 6.0 · Angular Signals · Vite | Client SPA · Standalone Components | `main-PG7KZ7NM.js` | `/stacks/angular/` | Vercel Static SPA |
| 5 | **Nuxt 3** | Vue 3 · TypeScript · Nitro Engine | Nitro SSR Hydration · Vue Composition | `_nuxt/BLZX-NPZ.js`, `_payload.json` | `/stacks/nuxt/` | Vercel Static Hydration |
| 6 | **Jaspr** | Dart 3.13.5 · Jaspr Web Compiler | Dart Web Runtime · DOM Hydration | `main.client.dart.js` | `/stacks/jaspr/` | Vercel Static SPA |
| 7 | **Go Buffalo** | Go 1.27 / 1.24 · Buffalo CLI · Gorilla Mux | Native Go Binary · Plush Template SSR | `portfolio-buffalo` ELF/PE | `localhost:8087` | Container Staging / Cloud Run |
| 8 | **Spring Boot 3** | Java 21 LTS · Maven 3.9 · Spring MVC | Embedded Apache Tomcat 10.1 · Thymeleaf | `portfolio-0.0.1-SNAPSHOT.jar` | `localhost:8082` | Container Staging / Cloud Run |
| 9 | **Django 6** | Python 3.13 · Django MVT · Gunicorn | WSGI Application Daemon · Django SSR | `wsgi.py`, `Gunicorn 26.2` | `localhost:8083` | Container Staging / Cloud Run |
| 10 | **Laravel 11/12** | PHP 8.4 CLI · Laravel MVC · Artisan | PHP-FPM / Artisan Built-in Server | `artisan`, Blade Engine | `localhost:8085` | Container Staging / Cloud Run |
| 11 | **Ruby on Rails 8** | Ruby 3.4 · Rails 8 · ActionView ERB | Puma 6.5 Rack Server · Rails MVC | `puma`, ERB Engine | `localhost:8084` | Container Staging / Cloud Run |
| 12 | **Vapor 4** | Swift 6.0 · SwiftNIO 2.65 · Leaf | Event-driven Non-blocking Async I/O | `App` Native Binary | `localhost:8086` | Container Staging / Cloud Run |

---

### Verification Protocol

Each implementation is subjected to strict verification criteria:

1. **Native Build Output**: Artifacts must be produced by the framework's native build tools (e.g., `trunk build --release`, `dotnet publish`, `ng build`, `mvn package`, `go build`).
2. **Runtime Execution**: The browser or container must execute the framework's native engine (WASM instantiation, JS boot, or HTTP daemon process).
3. **Absence of Emulation**: The response must not simply be static HTML containing the framework's name; it must execute the genuine runtime lifecycle.
4. **Data Integrity**: All twelve stacks render the authentic resume portfolio belonging to **Reginald Alfret V** with 100% verified open-source contributions.
