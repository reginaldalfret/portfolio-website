# BENCHMARK METHODOLOGY & EXPERIMENTAL DESIGN

## 1. Executive Summary
The Polyglot Performance Lab is a scientifically grounded benchmarking initiative comparing 12 distinct programming frameworks implementing the exact same obsidian developer resume portfolio. Every measurement is collected through automated headless browser sessions running against production infrastructure at [https://reginaldalfret.tech](https://reginaldalfret.tech).

## 2. Experimental Rigor & Anti-Fabrication Principles
- **No Fabricated Data**: Every reported number is calculated dynamically from recorded Navigation Timing and Resource Timing entries.
- **Multi-Trial Execution**: Each test configuration undergoes 5 to 10 consecutive trials following initial cold/warm cache rules.
- **Statistical Dispersion**: Primary rankings use the median to minimize outlier impact, accompanied by Mean, Standard Deviation, P75, and P95 percentiles.
- **Separation of Concerns**: Laboratory Main Thread Blocking (TBT) is never conflated with field-measured Interaction to Next Paint (INP).

## 3. Test Conditions & Matrix
- **Testing Engine**: Microsoft Edge / Chromium Headless (Channel: `msedge`) via Playwright 1.65.
- **Viewports**:
  - Desktop: 1366x768 (1x scale factor)
  - Mobile: 390x844 (3x scale factor)
- **Cache Profiles**:
  - Cold Cache: Complete storage and cache purging between trials.
  - Warm Cache: Retained context and HTTP asset caching.
