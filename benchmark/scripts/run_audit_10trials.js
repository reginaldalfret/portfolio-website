const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const STACKS = [
  { id: 'nextjs', name: 'Next.js 14', url: 'https://reginaldalfret.tech/', claimedRuntime: 'React 18 RSC / Edge', category: 'Edge SSR' },
  { id: 'buffalo', name: 'Go Buffalo', url: 'https://reginaldalfret.tech/stacks/buffalo', claimedRuntime: 'Go 1.27 / Buffalo SSR', category: 'Native SSR' },
  { id: 'vapor', name: 'Vapor 4', url: 'https://reginaldalfret.tech/stacks/vapor', claimedRuntime: 'Swift 6.0 / SwiftNIO', category: 'Native SSR' },
  { id: 'django', name: 'Django 6', url: 'https://reginaldalfret.tech/stacks/django', claimedRuntime: 'Python 3.13 / Django MVT', category: 'Dynamic SSR' },
  { id: 'laravel', name: 'Laravel 11', url: 'https://reginaldalfret.tech/stacks/laravel', claimedRuntime: 'PHP 8.4 / Blade SSR', category: 'Dynamic SSR' },
  { id: 'rails', name: 'Ruby on Rails 8', url: 'https://reginaldalfret.tech/stacks/rails', claimedRuntime: 'Ruby 3.4 / Puma ERB', category: 'Dynamic SSR' },
  { id: 'springboot', name: 'Spring Boot 3', url: 'https://reginaldalfret.tech/stacks/springboot', claimedRuntime: 'Java 21 / Thymeleaf', category: 'JVM SSR' },
  { id: 'nuxt', name: 'Nuxt 3', url: 'https://reginaldalfret.tech/stacks/nuxt', claimedRuntime: 'Vue 3 / Nitro', category: 'Universal SSR' },
  { id: 'jaspr', name: 'Jaspr Web', url: 'https://reginaldalfret.tech/stacks/jaspr', claimedRuntime: 'Dart 3.13 / Jaspr SSR', category: 'Hydrated SSR' },
  { id: 'leptos', name: 'Leptos 0.7', url: 'https://reginaldalfret.tech/stacks/leptos', claimedRuntime: 'Rust WASM / Trunk', category: 'Client WASM' },
  { id: 'angular', name: 'Angular 19', url: 'https://reginaldalfret.tech/stacks/angular', claimedRuntime: 'Angular 19 / Vite SPA', category: 'Signals SPA' },
  { id: 'blazor', name: 'Blazor WASM', url: 'https://reginaldalfret.tech/stacks/blazor', claimedRuntime: 'C# / .NET 8 WASM', category: 'Client WASM' }
];

function calcStats(numbers) {
  if (!numbers || numbers.length === 0) return { median: null, mean: null, min: null, max: null, stdDev: null, p75: null, p95: null };
  const sorted = [...numbers].sort((a, b) => a - b);
  const n = sorted.length;
  const mean = sorted.reduce((sum, v) => sum + v, 0) / n;
  const min = sorted[0];
  const max = sorted[n - 1];
  const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)];
  
  const variance = sorted.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / n;
  const stdDev = Math.sqrt(variance);

  const getPercentile = (p) => {
    const idx = (p / 100) * (n - 1);
    const lower = Math.floor(idx);
    const upper = Math.ceil(idx);
    const weight = idx - lower;
    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
  };

  return {
    median: Math.round(median * 100) / 100,
    mean: Math.round(mean * 100) / 100,
    min: Math.round(min * 100) / 100,
    max: Math.round(max * 100) / 100,
    stdDev: Math.round(stdDev * 100) / 100,
    p75: Math.round(getPercentile(75) * 100) / 100,
    p95: Math.round(getPercentile(95) * 100) / 100
  };
}

async function runAudit10Trials() {
  console.log('=== STARTING 10-TRIAL PRODUCTION BENCHMARK AUDIT ===');

  let browser;
  try {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  } catch (e) {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  }

  const configurations = [
    { mode: 'desktop', cache: 'cold', vp: { width: 1366, height: 768, isMobile: false } },
    { mode: 'desktop', cache: 'warm', vp: { width: 1366, height: 768, isMobile: false } },
    { mode: 'mobile', cache: 'cold', vp: { width: 390, height: 844, isMobile: true } }
  ];

  const allRawTrials = [];
  const resourceManifest = [];
  const capturedHashes = new Set();
  const summaryByConfig = {};

  for (const config of configurations) {
    const configKey = `${config.mode}-${config.cache}`;
    console.log(`\n======================================================`);
    console.log(`RUNNING CONFIGURATION: ${configKey.toUpperCase()} (10 Trials per stack)`);
    console.log(`======================================================`);

    summaryByConfig[configKey] = [];

    for (const stack of STACKS) {
      console.log(`\n--> Benchmarking ${stack.name} [${configKey}]`);
      const stackTrials = [];

      let warmContext = null;
      if (config.cache === 'warm') {
        warmContext = await browser.newContext({ viewport: config.vp });
        // Priming navigation for warm cache
        const primePage = await warmContext.newPage();
        try {
          await primePage.goto(stack.url, { waitUntil: 'networkidle', timeout: 35000 });
        } catch (_) {}
        await primePage.close();
      }

      for (let t = 1; t <= 10; t++) {
        let context;
        if (config.cache === 'cold') {
          context = await browser.newContext({ viewport: config.vp });
        } else {
          context = warmContext;
        }

        const page = await context.newPage();

        const payloadBreakdown = {
          html: 0, js: 0, css: 0, images: 0, fonts: 0, wasm: 0, other: 0, totalCompressed: 0, totalUncompressed: 0
        };

        const trialResources = [];

        page.on('response', async (resp) => {
          try {
            const url = resp.url();
            const headers = resp.headers();
            const contentType = (headers['content-type'] || '').toLowerCase();
            const status = resp.status();

            let buffer = null;
            let hash = 'N/A';
            try {
              buffer = await resp.body();
              hash = crypto.createHash('sha256').update(buffer).digest('hex');
            } catch (_) {}

            const bodyLength = buffer ? buffer.length : parseInt(headers['content-length'] || '0', 10);
            const transferSize = parseInt(headers['content-length'] || '0', 10) || bodyLength;

            payloadBreakdown.totalCompressed += transferSize;
            payloadBreakdown.totalUncompressed += bodyLength;

            let resourceType = 'other';
            if (contentType.includes('text/html')) {
              resourceType = 'html';
              payloadBreakdown.html += transferSize;
            } else if (contentType.includes('javascript') || url.endsWith('.js') || url.endsWith('.mjs')) {
              resourceType = 'javascript';
              payloadBreakdown.js += transferSize;
            } else if (contentType.includes('text/css') || url.endsWith('.css')) {
              resourceType = 'css';
              payloadBreakdown.css += transferSize;
            } else if (contentType.includes('image') || url.match(/\.(png|jpg|jpeg|webp|svg|gif|ico)/i)) {
              resourceType = 'image';
              payloadBreakdown.images += transferSize;
            } else if (contentType.includes('font') || url.match(/\.(woff|woff2|ttf|otf)/i)) {
              resourceType = 'font';
              payloadBreakdown.fonts += transferSize;
            } else if (contentType.includes('wasm') || url.endsWith('.wasm')) {
              resourceType = 'wasm';
              payloadBreakdown.wasm += transferSize;
            } else {
              payloadBreakdown.other += transferSize;
            }

            trialResources.push({
              stackId: stack.id,
              url,
              status,
              contentType,
              resourceType,
              transferredBytes: transferSize,
              uncompressedBytes: bodyLength,
              sha256: hash
            });

            // Add unique resource to global manifest
            const manifestKey = `${stack.id}:${url}`;
            if (!capturedHashes.has(manifestKey)) {
              capturedHashes.add(manifestKey);
              resourceManifest.push({
                stackId: stack.id,
                stackName: stack.name,
                url,
                status,
                contentType,
                resourceType,
                transferredBytes: transferSize,
                uncompressedBytes: bodyLength,
                sha256: hash
              });
            }
          } catch (_) {}
        });

        let navSuccess = true;
        let errorMsg = null;
        try {
          await page.goto(stack.url, { waitUntil: 'load', timeout: 35000 });
          await page.waitForTimeout(600);
        } catch (err) {
          navSuccess = false;
          errorMsg = err.message;
        }

        let timing = { ttfb: null, fcp: null, lcp: null, cls: null, domInteractive: null, domContentLoaded: null, loadEvent: null, syntheticClickLatency: null };

        if (navSuccess) {
          timing = await page.evaluate(() => {
            const nav = performance.getEntriesByType('navigation')[0] || {};
            const ttfb = nav.responseStart && nav.requestStart ? Math.round(nav.responseStart - nav.requestStart) : null;
            const domInteractive = nav.domInteractive && nav.startTime ? Math.round(nav.domInteractive - nav.startTime) : null;
            const domContentLoaded = nav.domContentLoadedEventEnd && nav.startTime ? Math.round(nav.domContentLoadedEventEnd - nav.startTime) : null;
            const loadEvent = nav.loadEventEnd && nav.startTime ? Math.round(nav.loadEventEnd - nav.startTime) : null;

            const paints = performance.getEntriesByType('paint');
            const fcpEntry = paints.find(p => p.name === 'first-contentful-paint');
            const fcp = fcpEntry ? Math.round(fcpEntry.startTime) : null;

            // Approximate LCP
            let lcp = null;
            try {
              const lcps = performance.getEntriesByType('largest-contentful-paint');
              if (lcps.length > 0) lcp = Math.round(lcps[lcps.length - 1].startTime);
            } catch (_) {}

            let cls = 0;
            try {
              const shifts = performance.getEntriesByType('layout-shift');
              shifts.forEach(s => {
                if (!s.hadRecentInput) cls += s.value;
              });
            } catch (_) {}

            return {
              ttfb,
              fcp,
              lcp: lcp || fcp,
              cls: Math.round(cls * 1000) / 1000,
              domInteractive,
              domContentLoaded,
              loadEvent
            };
          });

          // Measure synthetic click latency explicitly
          try {
            const t0 = Date.now();
            const btn = await page.$('#btn-pdf, button');
            if (btn) {
              await btn.click({ timeout: 2000 });
              timing.syntheticClickLatency = Math.max(1, Date.now() - t0);
            }
          } catch (_) {
            timing.syntheticClickLatency = null;
          }
        }

        const trialRecord = {
          stackId: stack.id,
          stackName: stack.name,
          configuration: configKey,
          trial: t,
          success: navSuccess,
          error: errorMsg,
          ttfb: timing.ttfb,
          fcp: timing.fcp,
          lcp: timing.lcp,
          cls: timing.cls,
          domInteractive: timing.domInteractive,
          domContentLoaded: timing.domContentLoaded,
          loadEvent: timing.loadEvent,
          syntheticClickLatency: timing.syntheticClickLatency,
          payloadKb: Math.round((payloadBreakdown.totalCompressed / 1024) * 10) / 10,
          payloadUncompressedKb: Math.round((payloadBreakdown.totalUncompressed / 1024) * 10) / 10,
          resourceCount: trialResources.length,
          breakdownKb: {
            html: Math.round((payloadBreakdown.html / 1024) * 10) / 10,
            js: Math.round((payloadBreakdown.js / 1024) * 10) / 10,
            css: Math.round((payloadBreakdown.css / 1024) * 10) / 10,
            images: Math.round((payloadBreakdown.images / 1024) * 10) / 10,
            fonts: Math.round((payloadBreakdown.fonts / 1024) * 10) / 10,
            wasm: Math.round((payloadBreakdown.wasm / 1024) * 10) / 10,
            other: Math.round((payloadBreakdown.other / 1024) * 10) / 10
          },
          timestamp: new Date().toISOString()
        };

        allRawTrials.push(trialRecord);
        stackTrials.push(trialRecord);

        console.log(`    Trial #${t}: TTFB=${trialRecord.ttfb}ms, FCP=${trialRecord.fcp}ms, Payload=${trialRecord.payloadKb}KB, Resources=${trialRecord.resourceCount}`);

        await page.close();
        if (config.cache === 'cold') {
          await context.close();
        }
      }

      if (config.cache === 'warm' && warmContext) {
        await warmContext.close();
      }

      // Compute stats across 10 trials
      const valid = stackTrials.filter(t => t.success);
      summaryByConfig[configKey].push({
        id: stack.id,
        name: stack.name,
        category: stack.category,
        claimedRuntime: stack.claimedRuntime,
        sampleCount: valid.length,
        ttfb: calcStats(valid.map(v => v.ttfb).filter(v => v !== null)),
        fcp: calcStats(valid.map(v => v.fcp).filter(v => v !== null)),
        lcp: calcStats(valid.map(v => v.lcp).filter(v => v !== null)),
        cls: calcStats(valid.map(v => v.cls).filter(v => v !== null)),
        loadEvent: calcStats(valid.map(v => v.loadEvent).filter(v => v !== null)),
        syntheticLatency: calcStats(valid.map(v => v.syntheticClickLatency).filter(v => v !== null)),
        payloadKb: calcStats(valid.map(v => v.payloadKb).filter(v => v !== null)),
        resourceCount: calcStats(valid.map(v => v.resourceCount).filter(v => v !== null)),
        breakdownKb: valid.length > 0 ? valid[Math.floor(valid.length / 2)].breakdownKb : {}
      });
    }
  }

  await browser.close();

  // Save all outputs
  fs.mkdirSync('benchmark/results/audit', { recursive: true });
  fs.mkdirSync('benchmark/reports', { recursive: true });

  const rawPath = path.resolve('benchmark/results/audit/raw-audit-10trials.json');
  fs.writeFileSync(rawPath, JSON.stringify(allRawTrials, null, 2));
  console.log(`Saved raw 10-trial audit to: ${rawPath}`);

  const summaryPath = path.resolve('benchmark/results/audit/audit-statistical-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summaryByConfig, null, 2));
  console.log(`Saved statistical summaries to: ${summaryPath}`);

  // Write RESOURCE-TRANSFER-AUDIT.csv
  const csvHeaders = ['StackId', 'StackName', 'ResourceURL', 'HTTPStatus', 'ContentType', 'ResourceType', 'TransferredBytes', 'UncompressedBytes', 'SHA256'];
  const csvRows = resourceManifest.map(r => [
    r.stackId,
    `"${r.stackName}"`,
    `"${r.url.replace(/"/g, '""')}"`,
    r.status,
    `"${r.contentType}"`,
    r.resourceType,
    r.transferredBytes,
    r.uncompressedBytes,
    r.sha256
  ].join(','));

  const csvContent = [csvHeaders.join(','), ...csvRows].join('\n');
  fs.writeFileSync('RESOURCE-TRANSFER-AUDIT.csv', csvContent, 'utf8');
  console.log(`Saved complete RESOURCE-TRANSFER-AUDIT.csv (${resourceManifest.length} distinct resource records)`);
}

runAudit10Trials().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
