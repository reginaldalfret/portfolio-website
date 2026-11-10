const fs = require('fs');

let code = fs.readFileSync('components/resume/ResumePortfolio.tsx', 'utf8');

// 1. Add ArrowRight to lucide-react imports if not present
if (!code.includes('ArrowRight,')) {
  code = code.replace('Activity,', 'Activity,\n  ArrowRight,');
}

// 2. Update top navigation button to link to /lab
code = code.replace('href="#performance-lab"', 'href="/lab"');
code = code.replace('title="Jump to Polyglot Performance Lab"', 'title="Explore the 12 Stacks. 1 Product. Engineering Lab"');
code = code.replace('<span>Performance Lab</span>', '<span>Engineering Lab</span>');

// 3. Find Section 4 start and end
const section4Start = code.indexOf('{/* 4. Multi-Stack Switcher Section */}');
const footerStart = code.indexOf('{/* 5. Footer */}');

if (section4Start !== -1 && footerStart !== -1) {
  const teaserSection = `{/* 4. Compact 12 Stacks. 1 Product. Engineering Lab Teaser */}
            <section className="py-8 border-b border-white/10 space-y-6" id="engineering-lab">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-neutral-900/90 via-neutral-950/80 to-neutral-900/90 border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        FEATURED ENGINEERING EXPERIMENT
                      </span>
                      <span className="text-xs font-mono text-neutral-400">
                        12 STACKS. 1 PRODUCT.
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
                      <span className="text-cyan-400">⚡</span> 12 Stacks. 1 Product.
                    </h2>

                    <p className="text-sm text-neutral-300 leading-relaxed font-light">
                      One product. Twelve technology ecosystems. A practical engineering experiment exploring how different technologies approach the same application — with genuine framework implementations, empirical benchmarks, and zero fabricated metrics.
                    </p>

                    {/* Compact Stack Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2">
                      {[
                        { name: 'Next.js 14', lang: 'React / TS' },
                        { name: 'Nuxt 3', lang: 'Vue 3 / Nitro' },
                        { name: 'Django 6', lang: 'Python 3.13' },
                        { name: 'Spring Boot 3', lang: 'Java 21' },
                        { name: 'Laravel 11', lang: 'PHP 8.4' },
                        { name: 'Ruby on Rails 8', lang: 'Ruby 3.4' },
                        { name: 'Angular 19', lang: 'Signals SPA' },
                        { name: 'Blazor WASM', lang: '.NET 8 C#' },
                        { name: 'Go Buffalo', lang: 'Go 1.24' },
                        { name: 'Leptos 0.7', lang: 'Rust WASM' },
                        { name: 'Jaspr Web', lang: 'Dart 3.13' },
                        { name: 'Vapor 4', lang: 'Swift 6.0' }
                      ].map((item) => (
                        <span
                          key={item.name}
                          className="px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 text-xs font-mono text-neutral-300 flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
                          <span className="text-white font-medium">{item.name}</span>
                          <span className="text-[10px] text-neutral-500">({item.lang})</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button to Lab */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3 pt-2 lg:pt-0 shrink-0">
                    <a
                      href="/lab"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all hover:scale-[1.02]"
                    >
                      <span>Explore the Engineering Lab</span>
                      <ArrowRight className="w-4 h-4 text-black" />
                    </a>
                    <span className="text-[11px] font-mono text-neutral-400">
                      Previews · Benchmarks · Architecture Diagrams
                    </span>
                  </div>
                </div>
              </div>
            </section>

            `;

  code = code.slice(0, section4Start) + teaserSection + code.slice(footerStart);
  console.log('Replaced Section 4 with compact teaser!');
} else {
  console.error('Could not locate Section 4 boundaries!');
}

// 4. Update footer to include Engineering Lab link
code = code.replace(
  'BETTER TECHNOLOGY • HAPPIER PEOPLE',
  'BETTER TECHNOLOGY • HAPPIER PEOPLE • <a href="/lab" class="text-cyan-400 hover:underline">12 STACKS. 1 PRODUCT. LAB</a>'
);

// 5. Remove floating dock from homepage
const dockStart = code.indexOf('{/* Floating Bottom Stack Dock */}');
if (dockStart !== -1) {
  code = code.slice(0, dockStart) + '</div>\n  );\n}\n';
  console.log('Removed floating bottom stack dock from homepage!');
}

// 6. Clean unused switchStack if needed or keep it harmless
fs.writeFileSync('components/resume/ResumePortfolio.tsx', code, 'utf8');
console.log('Successfully refactored ResumePortfolio.tsx!');
