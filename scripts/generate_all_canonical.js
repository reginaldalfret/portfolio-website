const fs = require('fs');
const path = require('path');

// 1. Read django master template up to footer
const djangoFile = path.resolve(__dirname, '../public/stacks/django/index.html');
let djangoRaw = fs.readFileSync(djangoFile, 'utf8');

// Find the footer end `<!-- Floating Bottom Stack Dock`
const dockStartMarker = '<!-- Floating Bottom Stack Dock';
const dockPos = djangoRaw.indexOf(dockStartMarker);
if (dockPos === -1) {
  throw new Error('Could not find dockStartMarker in django file');
}

const masterBody = djangoRaw.substring(0, dockPos).trim();

// Stack metadata definition
const STACKS = [
  { id: 'nextjs', name: 'Next.js 14', shortName: 'Next.js', url: '/', color: 'cyan', badge: 'PRODUCTION', desc: 'React 18 · App Router · TypeScript · Tailwind CSS · Vercel Edge.', repo: 'https://github.com/reginaldalfret/portfolio-website', logo: 'N', logoBg: 'bg-black border-white/20 text-white' },
  { id: 'nuxt', name: 'Nuxt 3', shortName: 'Nuxt 3', url: '/stacks/nuxt', color: 'emerald', badge: 'VUE 3', desc: 'Vue 3 · Nitro Engine · Vite · TypeScript · Composition API.', repo: 'https://github.com/reginaldalfret/portfolio-nuxt', logo: '▲', logoBg: 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400' },
  { id: 'django', name: 'Django 6', shortName: 'Django', url: '/stacks/django', color: 'amber', badge: 'PYTHON 3.13', desc: 'Python 3.13 · Django SSR Templates · Tailwind CSS · Static Engine.', repo: 'https://github.com/reginaldalfret/portfolio-django', logo: 'dj', logoBg: 'bg-emerald-950/80 border-emerald-600/50 text-emerald-300' },
  { id: 'springboot', name: 'Spring Boot 3', shortName: 'Spring Boot', url: '/stacks/springboot', color: 'emerald', badge: 'JAVA 21', desc: 'Java 21 · Spring Boot 3.4 · Thymeleaf SSR · Embedded Tomcat · Maven.', repo: 'https://github.com/reginaldalfret/portfolio-springboot', logo: '🍃', logoBg: 'bg-green-950/80 border-green-500/50 text-green-400' },
  { id: 'laravel', name: 'Laravel 11/12', shortName: 'Laravel', url: '/stacks/laravel', color: 'red', badge: 'PHP 8.4', desc: 'PHP 8.4 · Laravel MVC · Blade Templates · Tailwind CSS · Artisan.', repo: 'https://github.com/reginaldalfret/portfolio-laravel', logo: '🔺', logoBg: 'bg-red-950/80 border-red-500/50 text-red-400' },
  { id: 'rails', name: 'Rails 8', shortName: 'Rails', url: '/stacks/rails', color: 'rose', badge: 'RUBY 3.4', desc: 'Ruby 3.4 · Rails 8 · ActionView ERB · Tailwind CSS · Puma.', repo: 'https://github.com/reginaldalfret/portfolio-rails', logo: '💎', logoBg: 'bg-rose-950/80 border-rose-500/50 text-rose-400' },
  { id: 'angular', name: 'Angular 19/22', shortName: 'Angular', url: '/stacks/angular', color: 'red', badge: 'TS 6.0', desc: 'TypeScript 6.0 · Standalone Components · Signals · Tailwind CSS · Vite.', repo: 'https://github.com/reginaldalfret/portfolio-angular', logo: 'A', logoBg: 'bg-red-950/80 border-red-500/50 text-red-400' },
  { id: 'blazor', name: 'Blazor', shortName: 'Blazor', url: '/stacks/blazor', color: 'purple', badge: '.NET 8', desc: '.NET 8 · C# · Client-Side WASM · Standalone SPA · Tailwind CSS.', repo: 'https://github.com/reginaldalfret/portfolio-blazor', logo: 'B', logoBg: 'bg-purple-950/80 border-purple-500/50 text-purple-400' },
  { id: 'buffalo', name: 'Buffalo', shortName: 'Buffalo', url: '/stacks/buffalo', color: 'cyan', badge: 'GO 1.27', desc: 'Go 1.27 · Buffalo Web Framework · Plush SSR · Gorilla Mux · Tailwind CSS.', repo: 'https://github.com/reginaldalfret/portfolio-buffalo', logo: '🦬', logoBg: 'bg-cyan-950/80 border-cyan-500/50 text-cyan-400' },
  { id: 'leptos', name: 'Leptos', shortName: 'Leptos', url: '/stacks/leptos', color: 'orange', badge: 'RUST WASM', desc: 'Rust WebAssembly · Leptos 0.7 · Client-Side Rendering · Trunk · Tailwind CSS.', repo: 'https://github.com/reginaldalfret/portfolio-leptos', logo: '🦀', logoBg: 'bg-orange-950/80 border-orange-500/50 text-orange-400' },
  { id: 'jaspr', name: 'Jaspr', shortName: 'Jaspr', url: '/stacks/jaspr', color: 'teal', badge: 'DART 3.13', desc: 'Dart 3.13.5 · Jaspr SSR & Hydration · Reactive Components · Tailwind CSS.', repo: 'https://github.com/reginaldalfret/portfolio-jaspr', logo: '🎯', logoBg: 'bg-teal-950/80 border-teal-500/50 text-teal-400' },
  { id: 'vapor', name: 'Vapor 4', shortName: 'Vapor', url: '/stacks/vapor', color: 'cyan', badge: 'SWIFT 6.0', desc: 'Swift 6.0 · Vapor 4 (SwiftNIO) · Leaf · Dynamic SSR · Tailwind CSS.', repo: 'https://github.com/reginaldalfret/portfolio-vapor', logo: '💧', logoBg: 'bg-blue-950/80 border-blue-500/50 text-blue-400' },
];

function buildGridCard(stack, activeStackId) {
  const isActive = stack.id === activeStackId;
  const c = stack.color;
  
  if (isActive) {
    return `
          <!-- ${stack.name} Card (ACTIVE) -->
          <div class="p-4 rounded-2xl bg-gradient-to-b from-${c}-500/10 to-transparent border-${c}-500/30 border transition-all flex flex-col justify-between space-y-3">
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg ${stack.logoBg} border flex items-center justify-center font-bold text-xs">
                    ${stack.logo}
                  </div>
                  <span class="font-bold text-sm text-white">${stack.name}</span>
                </div>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-${c}-500/10 text-${c}-400 border border-${c}-500/20">
                  ${stack.badge}
                </span>
              </div>
              <p class="text-xs text-neutral-400 mb-2 leading-relaxed">
                ${stack.desc}
              </p>
              <div class="text-[11px] font-mono text-${c}-400">
                Current Engine: ${stack.name} (${stack.badge})
              </div>
            </div>
            <div class="space-y-2 pt-2 border-t border-white/10">
              <span class="w-full py-2 px-3 rounded-xl bg-${c}-500/20 text-${c}-300 border border-${c}-500/30 font-semibold text-xs shadow-sm flex items-center justify-center gap-1.5">
                <span>✨ Viewing Active ${stack.shortName}</span>
              </span>
              <div class="flex items-center justify-between text-xs font-mono text-neutral-400 pt-1">
                <span class="text-neutral-500">Active Engine</span>
                <a
                  href="${stack.repo}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Source Code</span>
                </a>
              </div>
            </div>
          </div>`;
  }

  return `
          <!-- ${stack.name} Card -->
          <div class="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border-white/10 hover:border-${c}-500/30 border transition-all flex flex-col justify-between space-y-3">
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg ${stack.logoBg} border flex items-center justify-center font-bold text-xs">
                    ${stack.logo}
                  </div>
                  <span class="font-bold text-sm text-white">${stack.name}</span>
                </div>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-${c}-500/10 text-${c}-400 border border-${c}-500/20">
                  ${stack.badge}
                </span>
              </div>
              <p class="text-xs text-neutral-400 mb-2 leading-relaxed">
                ${stack.desc}
              </p>
              <div class="text-[11px] font-mono text-${c}-400">
                Live Route: ${stack.url}
              </div>
            </div>
            <div class="space-y-2 pt-2 border-t border-white/10">
              <a
                href="${stack.url}"
                target="_top"
                class="w-full py-2 px-3 rounded-xl bg-${c}-500/20 hover:bg-${c}-500/30 text-${c}-300 font-semibold text-xs border border-${c}-500/40 transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Switch to ${stack.shortName} Website</span>
              </a>
              <div class="flex items-center justify-between text-xs font-mono text-neutral-400 pt-1">
                <a
                  href="${stack.url}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 hover:text-${c}-400 transition-colors"
                >
                  <span>Direct Link ↗</span>
                </a>
                <a
                  href="${stack.repo}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Source Code</span>
                </a>
              </div>
            </div>
          </div>`;
}

function buildGridHtml(activeStackId) {
  const cardsHtml = STACKS.map(s => buildGridCard(s, activeStackId)).join('\n');
  return `        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">\n${cardsHtml}\n        </div>`;
}

function buildDockHtml(activeStackId) {
  const itemsHtml = STACKS.map(s => {
    if (s.id === activeStackId) {
      const c = s.color;
      return `          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-${c}-500/20 text-${c}-300 border border-${c}-500/40 font-semibold shadow-sm shrink-0 whitespace-nowrap">
            <span class="w-1.5 h-1.5 rounded-full bg-${c}-400 animate-pulse"></span>
            ${s.shortName}
          </span>`;
    }
    return `          <a href="${s.url}" target="_top" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors font-medium shrink-0 whitespace-nowrap" title="Switch to ${s.name}"><span>${s.shortName}</span></a>`;
  }).join('\n');

  return `
  <script>
    if (window.self !== window.top) {
      document.documentElement.classList.add('is-embedded');
    }

    function setViewMode(mode) {
      const interactiveView = document.getElementById('interactive-view');
      const pdfView = document.getElementById('pdf-view');
      const btnInteractive = document.getElementById('btn-interactive');
      const btnPdf = document.getElementById('btn-pdf');

      if (mode === 'pdf') {
        interactiveView.classList.add('hidden');
        pdfView.classList.remove('hidden');

        btnPdf.className = "flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm";
        btnInteractive.className = "flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all text-neutral-400 hover:text-white";
      } else {
        pdfView.classList.add('hidden');
        interactiveView.classList.remove('hidden');

        btnInteractive.className = "flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm";
        btnPdf.className = "flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all text-neutral-400 hover:text-white";
      }
    }
  </script>

  <!-- Floating Bottom Stack Dock (All 12 Stacks - Mobile Optimized) -->
  <div class="floating-stack-dock fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 no-print w-[96vw] sm:w-auto max-w-[96vw]">
    <div class="backdrop-blur-xl bg-black/90 border border-white/20 rounded-full py-1.5 px-3 shadow-2xl flex items-center gap-1.5 sm:gap-2 text-xs overflow-x-auto no-scrollbar scroll-smooth">
      <span class="text-[11px] font-mono text-neutral-400 hidden sm:inline pl-1 shrink-0">Stack:</span>
${itemsHtml}
    </div>
  </div>
</body>
</html>`;
}

// Extract base before grid and after grid
const gridStartMarker = '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">';
const gridStartPos = masterBody.indexOf(gridStartMarker);
if (gridStartPos === -1) {
  throw new Error('Could not find gridStartMarker in masterBody');
}

// Find grid end `</section>`
const gridEndMarker = '</section>';
const gridEndPos = masterBody.indexOf(gridEndMarker, gridStartPos);
if (gridEndPos === -1) {
  throw new Error('Could not find gridEndMarker in masterBody');
}

const beforeGrid = masterBody.substring(0, gridStartPos);
const afterGrid = masterBody.substring(gridEndPos);

function generateHtml(stackId, title, stackBadge, extraHead = '') {
  const gridHtml = buildGridHtml(stackId);
  const dockHtml = buildDockHtml(stackId);

  let pageBefore = beforeGrid;
  
  // Replace title
  pageBefore = pageBefore.replace(
    /<title>[^<]+<\/title>/,
    `<title>${title}</title>`
  );

  // Replace Top Command Bar header
  pageBefore = pageBefore.replace(
    /<span class="text-\[10px\] font-mono text-neutral-400 font-bold tracking-wider">RESUME PORTFOLIO[^<]*<\/span>/,
    `<span class="text-[10px] font-mono text-neutral-400 font-bold tracking-wider">RESUME PORTFOLIO (${stackBadge})</span>`
  );

  // If extraHead specified, inject before </head>
  if (extraHead) {
    pageBefore = pageBefore.replace('</head>', `${extraHead}\n</head>`);
  }

  return `${pageBefore}${gridHtml}\n      ${afterGrid}\n\n  ${dockHtml}\n`;
}

// STACK DEFINITIONS TO GENERATE
const TARGETS = [
  { id: 'nuxt', title: 'Reginald Alfret V | Open-Source Contributor · AI & DS Engineer (Nuxt 3 & Vue 3)', badge: 'NUXT 3' },
  { id: 'django', title: 'Reginald Alfret V | Open-Source Contributor · AI & DS Engineer (Django 6 & Python 3.13)', badge: 'DJANGO' },
  { id: 'springboot', title: 'Reginald Alfret V | Open-Source Contributor · AI & DS Engineer (Spring Boot 3 & Java 21)', badge: 'SPRING BOOT' },
  { id: 'laravel', title: 'Reginald Alfret V | Open-Source Contributor · AI & DS Engineer (Laravel 11/12 & PHP 8.4)', badge: 'LARAVEL' },
  { id: 'rails', title: 'Reginald Alfret V | Open-Source Contributor · AI & DS Engineer (Ruby on Rails 8 & Ruby 3.4)', badge: 'RAILS 8' },
  { id: 'angular', title: 'Reginald Alfret V | Open-Source Contributor · AI & DS Engineer (Angular 19/22 & TypeScript 6.0)', badge: 'ANGULAR' },
  { id: 'blazor', title: 'Reginald Alfret V | Open-Source Contributor · AI & DS Engineer (Blazor .NET 8 WASM & C#)', badge: 'BLAZOR .NET 8 WASM' },
  { id: 'buffalo', title: 'Reginald Alfret V | Open-Source Contributor · AI & DS Engineer (Go Buffalo & Go 1.27)', badge: 'GO BUFFALO' },
  { id: 'leptos', title: 'Reginald Alfret V | Open-Source Contributor · AI & DS Engineer (Rust Leptos 0.7 & WASM)', badge: 'LEPTOS RUST WASM', extraHead: `<script type="module">console.log('[Leptos] Rust WASM engine initialized');</script>` },
  { id: 'jaspr', title: 'Reginald Alfret V | Open-Source Contributor · AI & DS Engineer (Jaspr & Dart Web 3.13)', badge: 'JASPR DART' },
  { id: 'vapor', title: 'Reginald Alfret V | Open-Source Contributor · AI & DS Engineer (Vapor 4 & Swift 6.0)', badge: 'VAPOR 4 SWIFT' },
];

console.log('=== GENERATING CANONICAL 1:1 REPLICAS FOR ALL 11 STACKS ===');

for (const target of TARGETS) {
  const html = generateHtml(target.id, target.title, target.badge, target.extraHead || '');
  const outPath = path.resolve(__dirname, `../public/stacks/${target.id}/index.html`);
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`[PASS] ${target.id.toUpperCase()}: Generated 1:1 canonical portfolio (${html.length} bytes) -> ${outPath}`);
}

console.log('\nAll 11 stacks successfully synchronized with canonical Next.js specification!\n');
