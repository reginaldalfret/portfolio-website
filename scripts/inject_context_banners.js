const fs = require('fs');
const path = require('path');

const STACKS = [
  { id: 'nuxt', name: 'Nuxt 3' },
  { id: 'django', name: 'Django 6' },
  { id: 'springboot', name: 'Spring Boot 3' },
  { id: 'laravel', name: 'Laravel 11' },
  { id: 'rails', name: 'Ruby on Rails 8' },
  { id: 'angular', name: 'Angular 19' },
  { id: 'blazor', name: 'Blazor WASM' },
  { id: 'buffalo', name: 'Go Buffalo' },
  { id: 'leptos', name: 'Leptos 0.7' },
  { id: 'jaspr', name: 'Jaspr Web' },
  { id: 'vapor', name: 'Vapor 4' }
];

console.log('=== INJECTING CONTEXT BANNERS INTO RESTORED PREVIEWS ===');

for (const s of STACKS) {
  const p = path.join('public', 'stacks', s.id, 'index.html');
  if (!fs.existsSync(p)) continue;
  let html = fs.readFileSync(p, 'utf8');

  // Check if banner already present
  if (html.includes('<!-- 12 STACKS. 1 PRODUCT. ECOSYSTEM CONTEXT BANNER -->')) {
    console.log(`[Skipping] ${s.id} already has banner`);
    continue;
  }

  // Ensure <html lang="en" class="dark">
  html = html.replace(/<html([^>]*)>/i, (match, attrs) => {
    if (!attrs.includes('class=')) {
      return `<html${attrs} class="dark">`;
    } else if (!attrs.includes('dark')) {
      return `<html${attrs.replace(/class="([^"]*)"/, 'class="$1 dark"')}>`;
    }
    return match;
  });

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
      <a href="https://reginaldalfret.tech" target="_top" class="text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
        <span>← Personal Portfolio</span>
      </a>
      <span class="text-neutral-600">·</span>
      <a href="https://reginaldalfret.tech/lab" target="_top" class="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold flex items-center gap-1">
        <span>⚡ Back to Engineering Lab</span>
      </a>
    </div>
  </div>
</header>
`;

  const bodyIdx = html.indexOf('<body');
  if (bodyIdx !== -1) {
    const closeIdx = html.indexOf('>', bodyIdx) + 1;
    html = html.slice(0, closeIdx) + '\n' + banner + html.slice(closeIdx);
    fs.writeFileSync(p, html, 'utf8');
    console.log(`[Injected] ${s.id} -> ${html.length} bytes`);
  }
}
console.log('=== COMPLETED ===');
