const fs = require('fs');
const path = require('path');

const STACKS = [
  { id: 'nuxt', name: 'Nuxt 3', repo: 'https://github.com/reginaldalfret/portfolio-nuxt' },
  { id: 'django', name: 'Django 6', repo: 'https://github.com/reginaldalfret/portfolio-django' },
  { id: 'springboot', name: 'Spring Boot 3', repo: 'https://github.com/reginaldalfret/portfolio-springboot' },
  { id: 'laravel', name: 'Laravel 11', repo: 'https://github.com/reginaldalfret/portfolio-laravel' },
  { id: 'rails', name: 'Ruby on Rails 8', repo: 'https://github.com/reginaldalfret/portfolio-rails' },
  { id: 'angular', name: 'Angular 19', repo: 'https://github.com/reginaldalfret/portfolio-angular' },
  { id: 'blazor', name: 'Blazor WASM', repo: 'https://github.com/reginaldalfret/portfolio-blazor' },
  { id: 'buffalo', name: 'Go Buffalo', repo: 'https://github.com/reginaldalfret/portfolio-buffalo' },
  { id: 'leptos', name: 'Leptos 0.7', repo: 'https://github.com/reginaldalfret/portfolio-leptos' },
  { id: 'jaspr', name: 'Jaspr Web', repo: 'https://github.com/reginaldalfret/portfolio-jaspr' },
  { id: 'vapor', name: 'Vapor 4', repo: 'https://github.com/reginaldalfret/portfolio-vapor' }
];

console.log('=== CLEANING & SYNCHRONIZING PUBLIC PREVIEWS ===');

for (const s of STACKS) {
  const p = path.join('public', 'stacks', s.id, 'index.html');
  if (!fs.existsSync(p)) continue;
  let html = fs.readFileSync(p, 'utf8');

  // 1. Remove any script blocks that contained old benchmark CSV/JSON exports or old data
  html = html.replace(/<script>[\s\S]*?polyglot-performance-lab-metrics[\s\S]*?<\/script>/g, '');
  html = html.replace(/<script>[\s\S]*?window\.exportLabCSV[\s\S]*?<\/script>/g, '');
  html = html.replace(/<script>[\s\S]*?window\.exportLabJSON[\s\S]*?<\/script>/g, '');
  html = html.replace(/<script>[\s\S]*?switchLabTab[\s\S]*?<\/script>/g, '');

  // 2. Remove any old duplicated sections with id="performance-lab" or id="stacks"
  html = html.replace(/<!-- ========================================================================= -->\s*<!-- POLYGLOT PERFORMANCE LAB[\s\S]*?<\/section>/g, '');
  html = html.replace(/<section[^>]*id="performance-lab"[\s\S]*?<\/section>/g, '');
  html = html.replace(/<section[^>]*id="stacks"[\s\S]*?<\/section>/g, '');

  // 3. Banner
  const banner = `<!-- 12 STACKS. 1 PRODUCT. ECOSYSTEM CONTEXT BANNER -->
<header class="w-full bg-neutral-950/95 border-b border-white/10 px-4 py-2.5 backdrop-blur-md sticky top-0 z-50">
  <div class="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
    <div class="flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
      <span class="text-neutral-400">PART OF THE <strong class="text-white">12 STACKS. 1 PRODUCT.</strong> EXPERIMENT</span>
      <span class="hidden sm:inline text-neutral-600">|</span>
      <span class="hidden sm:inline px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
        Current Implementation: <strong class="text-white">${s.name}</strong>
      </span>
    </div>
    <div class="flex items-center gap-3">
      <a href="https://reginaldalfret.tech" class="text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
        <span>← Personal Portfolio</span>
      </a>
      <span class="text-neutral-600">·</span>
      <a href="https://reginaldalfret.tech/lab" class="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold flex items-center gap-1">
        <span>⚡ Back to Engineering Lab</span>
      </a>
    </div>
  </div>
</header>`;

  // 4. Contextual teaser
  const teaser = `<!-- 12 STACKS. 1 PRODUCT. CENTRAL ENGINEERING LAB CONTEXT TEASER -->
<section class="py-8 border-b border-white/10" id="engineering-lab-teaser">
  <div class="p-6 rounded-2xl bg-neutral-950/80 border border-cyan-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          ENGINEERING EXPERIMENT
        </span>
        <span class="text-xs font-mono text-neutral-400">12 STACKS. 1 PRODUCT.</span>
      </div>
      <h3 class="text-lg font-bold text-white flex items-center gap-2">
        <span>⚡</span> Compare ${s.name} Against 11 Other Native Frameworks
      </h3>
      <p class="text-xs text-neutral-300 font-sans max-w-xl">
        This portfolio is independently built across Next.js, Nuxt, Django, Spring Boot, Laravel, Rails, Angular, Blazor, Buffalo, Leptos, Jaspr, and Vapor. Explore empirical benchmarks, memory footprints, and architectural comparisons in the central lab.
      </p>
    </div>
    <div class="shrink-0 flex flex-col sm:flex-row gap-2.5">
      <a href="https://reginaldalfret.tech/lab" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-black font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5 justify-center">
        <span>Open Engineering Lab</span>
        <span>→</span>
      </a>
      <a href="https://reginaldalfret.tech" class="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5 justify-center">
        <span>Personal Portfolio</span>
      </a>
    </div>
  </div>
</section>`;

  // 5. Standardized footer
  const footer = `<!-- 12 STACKS. 1 PRODUCT. STANDARDIZED UNIFIED FOOTER -->
<footer class="pt-8 pb-12 text-center text-xs text-neutral-500 space-y-3 font-mono border-t border-white/10 mt-8">
  <div class="text-neutral-400 font-semibold tracking-wider">
    BETTER TECHNOLOGY • HAPPIER PEOPLE
  </div>
  <div class="flex flex-wrap items-center justify-center gap-3 text-neutral-400">
    <span>© 2026 Reginald Alfret V</span>
    <span>•</span>
    <span class="text-neutral-300">Engineered natively with <strong class="text-white">${s.name}</strong></span>
    <span>•</span>
    <a href="https://reginaldalfret.tech" class="text-neutral-300 hover:text-white transition-colors">Personal Portfolio</a>
    <span>•</span>
    <a href="https://reginaldalfret.tech/lab" class="text-cyan-400 hover:text-cyan-300 transition-colors">Engineering Lab</a>
    <span>•</span>
    <a href="${s.repo}" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Source Code</a>
  </div>
</footer>`;

  // Strip existing banner/teaser/footer if already there
  html = html.replace(/<!-- 12 STACKS\. 1 PRODUCT\. ECOSYSTEM CONTEXT BANNER -->[\s\S]*?<\/header>/g, '');
  html = html.replace(/<header class="w-full bg-neutral-950\/95[\s\S]*?<\/header>/g, '');
  html = html.replace(/<!-- 12 STACKS\. 1 PRODUCT\. CENTRAL ENGINEERING LAB CONTEXT TEASER -->[\s\S]*?<\/section>/g, '');
  html = html.replace(/<section[^>]*id="engineering-lab-teaser"[\s\S]*?<\/section>/g, '');
  html = html.replace(/<!-- 12 STACKS\. 1 PRODUCT\. STANDARDIZED UNIFIED FOOTER -->[\s\S]*?<\/footer>/g, '');
  html = html.replace(/<footer[\s\S]*?<\/footer>/g, '');

  // Inject banner right after <body>
  if (html.includes('<body')) {
    const idx = html.indexOf('>', html.indexOf('<body')) + 1;
    html = html.slice(0, idx) + '\n' + banner + '\n' + html.slice(idx);
  }

  // Inject teaser and footer before </body>
  if (html.includes('</body>')) {
    html = html.replace('</body>', teaser + '\n' + footer + '\n</body>');
  } else {
    html += teaser + '\n' + footer;
  }

  fs.writeFileSync(p, html, 'utf8');
  console.log(`[Cleaned & Synced] public/stacks/${s.id}/index.html (${html.length} bytes)`);
}
