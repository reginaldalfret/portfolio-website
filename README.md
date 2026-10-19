# Reginald Alfret V — Portfolio

Premium personal portfolio built with:

- Next.js
- TypeScript
- React
- Tailwind CSS
- Framer Motion
- GSAP
- Lenis
- Three.js
- React Three Fiber
- Google Analytics 4 (@next/third-parties/google)

## Visual Direction

Apple-inspired Liquid Glass
+
RGB ambient lighting
+
AI/WebGL experiences

## Featured Work

- **301 Super AI Agents** — Autonomous multi-agent coordination system. 1st Place, HackIndia 2026.
- **TOR-UNVEIL** — Dark web threat intelligence, deanonymization, and forensic analysis platform. 1st Place, Tamil Nadu Police Hackathon 2025 (Adopted for live police operations).
- **AI Crop Recommendation** — Multimodal precision agriculture and soil intelligence engine with Explainable AI. 1st Place, Blaze a Trail 2.0.

## Live Production Deployment

- **Custom Domain**: [https://reginaldalfret.tech](https://reginaldalfret.tech)
- **Framework**: Next.js 14 (App Router)
- **Deployment**: Vercel Edge Network

## GitHub API Contribution Dashboard

The Open Source section uses a checked-in, generated dataset populated from GitHub's public merged-pull-request search. A daily GitHub Actions workflow refreshes the data, normalizes repository/organization identities, deduplicates PRs, preserves the last valid snapshot on API errors, and commits only actual data changes. It excludes repositories owned by this account and the OpenTelemetry/detekt display exclusions.

- Integration and troubleshooting: [docs/github-contribution-integration.md](docs/github-contribution-integration.md)
- Local sync: `npm run sync:open-source`
- Deterministic tests: `npm run test:open-source`
- Type check: `npm run typecheck`
- Manual refresh: run **Sync Open Source Contributions** from GitHub Actions using `workflow_dispatch`

The workflow uses the short-lived `GITHUB_TOKEN` supplied by GitHub Actions with repository content write access only for the generated-data commit. No GitHub token is exposed to browser code. The live website deployment depends on the repository's existing Vercel Git integration.

For the GitHub Developer Program, see the [official registration page](https://github.com/developer/register). Having this integration does not guarantee program acceptance.
