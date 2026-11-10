const fs = require('fs');
const path = require('path');
const benchmarks = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/stack-benchmarks.json'), 'utf8'));

const STACKS = [
  { id: 'nextjs', name: 'Next.js 14', path: path.join(__dirname, '../public/stacks/nextjs.html'), isNext: true },
  { id: 'buffalo', name: 'Go Buffalo', path: path.join(__dirname, '../public/stacks/buffalo/index.html') },
  { id: 'vapor', name: 'Vapor 4', path: path.join(__dirname, '../public/stacks/vapor/index.html') },
  { id: 'django', name: 'Django 6', path: path.join(__dirname, '../public/stacks/django/index.html') },
  { id: 'springboot', name: 'Spring Boot 3', path: path.join(__dirname, '../public/stacks/springboot/index.html') },
  { id: 'laravel', name: 'Laravel 11/12', path: path.join(__dirname, '../public/stacks/laravel/index.html') },
  { id: 'rails', name: 'Ruby on Rails 8', path: path.join(__dirname, '../public/stacks/rails/index.html') },
  { id: 'nuxt', name: 'Nuxt 3', path: path.join(__dirname, '../public/stacks/nuxt/index.html') },
  { id: 'angular', name: 'Angular 19', path: path.join(__dirname, '../public/stacks/angular/index.html') },
  { id: 'blazor', name: 'Blazor WASM', path: path.join(__dirname, '../public/stacks/blazor/index.html') },
  { id: 'leptos', name: 'Leptos 0.7', path: path.join(__dirname, '../public/stacks/leptos/index.html') },
  { id: 'jaspr', name: 'Jaspr Web', path: path.join(__dirname, '../public/stacks/jaspr/index.html') }
];

console.log('=== AUDITING PERFORMANCE LAB INTEGRATION ACROSS ALL 12 STACKS ===\n');

const results = [];

STACKS.forEach(stack => {
  let content = '';
  let hasSection = false;
  let hasHeading = false;
  let hasSubtitle = false;
  let hasLeaderboard = false;
  let hasCharts = false;
  let hasNav = false;
  let datasetMatch = false;

  if (stack.isNext) {
    const resumePath = path.join(__dirname, '../components/resume/ResumePortfolio.tsx');
    const labPath = path.join(__dirname, '../components/stacks/EngineeringLab.tsx');
    const resumeContent = fs.readFileSync(resumePath, 'utf8');
    const labContent = fs.readFileSync(labPath, 'utf8');

    hasSection = resumeContent.includes('id="performance-lab"');
    hasHeading = labContent.includes('POLYGLOT PERFORMANCE LAB');
    hasSubtitle = labContent.includes('One product. Twelve stacks. Measured engineering performance.');
    hasLeaderboard = labContent.includes('Leaderboard') && labContent.includes('Rank');
    hasCharts = labContent.includes('Charts') && labContent.includes('First Contentful Paint');
    hasNav = resumeContent.includes('href="#performance-lab"');
    datasetMatch = labContent.includes('rawBenchmarks');
  } else {
    content = fs.readFileSync(stack.path, 'utf8');
    const bench = benchmarks.find(b => b.id === stack.id) || benchmarks[0];

    hasSection = content.includes('id="performance-lab"');
    hasHeading = content.includes('POLYGLOT PERFORMANCE LAB');
    hasSubtitle = content.includes('12 Stacks. 1 Product. Measured Engineering Performance.');
    hasLeaderboard = content.includes('Leaderboard') || content.includes('leaderboard');
    hasCharts = content.includes('First Contentful Paint') || content.includes('Charts');
    hasNav = content.includes('href="#performance-lab"');

    const hasFcp = content.includes(`${bench.fcpMs} ms`);
    const hasTtfb = content.includes(`${bench.ttfbMs} ms`);
    const hasScore = content.includes(`${bench.lighthouseScore}`);
    datasetMatch = hasFcp && hasTtfb && hasScore;
  }

  const allPass = hasSection && hasHeading && hasSubtitle && hasLeaderboard && hasCharts && hasNav && datasetMatch;

  results.push({
    stack: stack.name,
    id: stack.id,
    integrated: hasSection,
    hasHeading,
    hasSubtitle,
    hasLeaderboard,
    hasCharts,
    hasNav,
    datasetMatch,
    status: allPass ? 'VERIFIED ✔' : 'FAILED ❌'
  });
});

console.table(results);

const allSuccess = results.every(r => r.status === 'VERIFIED ✔');
console.log(`\nOverall Status: ${allSuccess ? 'ALL 12 IMPLEMENTATIONS VERIFIED 100%' : 'SOME STACKS FAILED'}`);

if (!allSuccess) {
  process.exit(1);
}
