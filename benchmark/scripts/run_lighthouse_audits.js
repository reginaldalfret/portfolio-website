const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const STACKS = [
  { id: 'nextjs', name: 'Next.js 14', url: 'https://reginaldalfret.tech/' },
  { id: 'buffalo', name: 'Go Buffalo', url: 'https://reginaldalfret.tech/stacks/buffalo' },
  { id: 'vapor', name: 'Vapor 4', url: 'https://reginaldalfret.tech/stacks/vapor' },
  { id: 'django', name: 'Django 6', url: 'https://reginaldalfret.tech/stacks/django' },
  { id: 'laravel', name: 'Laravel 11', url: 'https://reginaldalfret.tech/stacks/laravel' },
  { id: 'rails', name: 'Ruby on Rails 8', url: 'https://reginaldalfret.tech/stacks/rails' },
  { id: 'springboot', name: 'Spring Boot 3', url: 'https://reginaldalfret.tech/stacks/springboot' },
  { id: 'nuxt', name: 'Nuxt 3', url: 'https://reginaldalfret.tech/stacks/nuxt' },
  { id: 'jaspr', name: 'Jaspr Web', url: 'https://reginaldalfret.tech/stacks/jaspr' },
  { id: 'leptos', name: 'Leptos 0.7', url: 'https://reginaldalfret.tech/stacks/leptos' },
  { id: 'angular', name: 'Angular 19', url: 'https://reginaldalfret.tech/stacks/angular' },
  { id: 'blazor', name: 'Blazor WASM', url: 'https://reginaldalfret.tech/stacks/blazor' }
];

const outDir = path.resolve('benchmark/artifacts/lighthouse');
fs.mkdirSync(outDir, { recursive: true });

const lighthouseSummary = [];

for (const s of STACKS) {
  console.log(`\n======================================================`);
  console.log(`Running Lighthouse Audit for [${s.name}]: ${s.url}`);
  console.log(`======================================================`);

  const reportBase = path.join(outDir, s.id);
  const cmd = `npx lighthouse ${s.url} --output json --output html --output-path "${reportBase}" --only-categories=performance --chrome-flags="--headless=new --no-sandbox --disable-gpu" --quiet`;

  try {
    execSync(cmd, { stdio: 'inherit', timeout: 90000 });
    
    // Read JSON report
    const jsonPath = `${reportBase}.report.json`;
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      const perfScore = Math.round((data.categories.performance.score || 0) * 100);
      const audits = data.audits;

      const fcp = audits['first-contentful-paint'] ? Math.round(audits['first-contentful-paint'].numericValue) : null;
      const lcp = audits['largest-contentful-paint'] ? Math.round(audits['largest-contentful-paint'].numericValue) : null;
      const tbt = audits['total-blocking-time'] ? Math.round(audits['total-blocking-time'].numericValue) : null;
      const cls = audits['cumulative-layout-shift'] ? Math.round(audits['cumulative-layout-shift'].numericValue * 1000) / 1000 : null;
      const si = audits['speed-index'] ? Math.round(audits['speed-index'].numericValue) : null;
      const inp = audits['interaction-to-next-paint'] ? Math.round(audits['interaction-to-next-paint'].numericValue) : null;

      const record = {
        id: s.id,
        name: s.name,
        url: s.url,
        score: perfScore,
        fcpMs: fcp,
        lcpMs: lcp,
        tbtMs: tbt,
        cls: cls,
        speedIndexMs: si,
        inpMs: inp,
        jsonReport: `${s.id}.report.json`,
        htmlReport: `${s.id}.report.html`
      };

      lighthouseSummary.push(record);
      console.log(`  Lighthouse Result: Score=${perfScore}, FCP=${fcp}ms, LCP=${lcp}ms, TBT=${tbt}ms, CLS=${cls}, SI=${si}ms`);
    }
  } catch (err) {
    console.error(`  Lighthouse failed for ${s.name}:`, err.message);
  }
}

const summaryFile = path.resolve('benchmark/artifacts/lighthouse/lighthouse-summary.json');
fs.writeFileSync(summaryFile, JSON.stringify(lighthouseSummary, null, 2));
console.log(`\nLighthouse audit complete. Saved summary to: ${summaryFile}`);
