# BENCHMARK METHODOLOGY & REPRODUCIBILITY GUIDE

## Standardized Test Parameters
To eliminate variability and ensure scientific rigor across all 12 stacks:
1. **Identical Visual Assets & Content**: Every implementation renders the exact same personal profile, 30 merged PR cards, 2-column resume body, and 12-stack architecture grid from `/shared/content/`.
2. **Identical Viewport Dimensions**: Desktop (1440x900px, 1920x1080px) and Smartphone (390x844px).
3. **Execution Tooling**: Automated Playwright headless chromium engine running under throttled and unthrottled conditions with Navigation Timing API metrics.
4. **Hardware & Environment**: AMD Ryzen / Intel Core x86_64 running Microsoft Edge / Chromium 128+ with Vercel Edge CDN distribution.
5. **Sample Size**: All metrics reflect the median of 5 consecutive test runs following cold-start warmups.

## Metrics Captured
- **FCP (First Contentful Paint)**: Time from navigation start until the browser renders the first text or non-blank canvas element.
- **LCP (Largest Contentful Paint)**: Time when the main content block (hero header or resume canvas) finishes rendering.
- **CLS (Cumulative Layout Shift)**: Layout stability score across initial page load.
- **TTFB (Time to First Byte)**: Time taken for the first byte of server response to reach the client.
- **Bundle Payload**: Total uncompressed and compressed network bytes transferred for JavaScript and CSS assets.
