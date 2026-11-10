# Deployment Architecture & Production Isolation Specification
## Polyglot Portfolio Showcase (12 Stacks. 1 Product.)

**Primary Domain:** [https://reginaldalfret.tech](https://reginaldalfret.tech)  
**Host & CDN:** Vercel Global Edge Network  
**DNS Target:** `reginaldalfret.tech` → Vercel CNAME/A records  
**Active Project:** `reginald-portfolio` (`team_8XqJNYywz1iaqRon9EAPQlGt`)  
**Production Branch:** `main` (Protected; manual approval required for deployment)

---

### 1. Two-Tier Production URL Topology

```
https://reginaldalfret.tech/
├── /                              ──> Experience A: Personal Portfolio (Recruiter & Professional Focus)
├── /lab                           ──> Experience B: Engineering Lab (12 Stacks. 1 Product. Showcase)
└── /stacks/<stack-id>/            ──> Native Framework Preview Endpoints (Isolated Iframe & Direct Access)
    ├── /stacks/nuxt/              ──> Nuxt 3 Client Hydrated Bundle
    ├── /stacks/angular/           ──> Angular 19 Standalone Signals Bundle
    ├── /stacks/blazor/            ──> Blazor Mono WebAssembly Runtime & Assemblies
    ├── /stacks/leptos/            ──> Leptos Rust WebAssembly Binary
    ├── /stacks/jaspr/             ──> Jaspr Dart Web Compiled Client
    ├── /stacks/buffalo/           ──> Go Buffalo Native HTML Output
    ├── /stacks/vapor/             ──> Swift Vapor 4 Native HTML Output
    ├── /stacks/springboot/        ──> Spring Boot 3 Thymeleaf HTML Output
    ├── /stacks/django/            ──> Django 6 MVT HTML Output
    ├── /stacks/laravel/           ──> Laravel 11 Blade HTML Output
    └── /stacks/rails/             ──> Ruby on Rails 8 ActionView ERB Output
```

---

### 2. Experience Separation Contract

#### Experience A: Personal Portfolio (`/`)
- Pure recruiter focus: Who I am, core technical skills, verified experience, featured projects, open-source accomplishments (30 merged PRs across Google, Apple, Microsoft, Meta, NVIDIA, etc.), education, contact.
- Contains a compact **"12 Stacks. 1 Product."** teaser card with direct link button: `Explore the Engineering Lab → /lab`.
- Zero intrusive comparison tables, zero full-stack switchers.

#### Experience B: Engineering Lab (`/lab`)
- Central control and exploration layer for the polyglot experiment.
- 12-stack explorer with native technology cards.
- Live preview switcher with responsive iframes, loading states, error boundaries, and return links.
- Interactive performance leaderboard (sorting by FCP, TTFB, Payload, Lighthouse score).
- Performance comparison charts (FCP, TTFB, Payload, Lighthouse).
- Architecture execution flow diagrams for all 12 stacks.
- Scientific benchmark methodology documentation.

#### Preview Endpoints (`/stacks/<stack-id>/`)
- Each implementation renders its genuine framework components with native styles and reactive behaviors.
- Each preview contains:
  - Top context badge: `PART OF THE 12 STACKS. 1 PRODUCT. EXPERIMENT` · `Current Implementation: <Stack Name>`
  - Return links: `Personal Portfolio → https://reginaldalfret.tech`, `Back to Engineering Lab → https://reginaldalfret.tech/lab`
  - Unified footer with source repository link.

---

### 3. Production Deployment Safety Rules

1. **Feature Branch Isolation:** All active engineering restructuring work is performed on isolated feature branches:
   - Main repo: `feat/portfolio-lab-separation`
   - Child repos: `feat/lab-integration`
2. **Default Branch Protection:** No commits are pushed directly to `main` or `master`.
3. **No Automatic Production Deployments:** Branch pushes to feature branches trigger preview builds only. Production deployment requires explicit user consent.
