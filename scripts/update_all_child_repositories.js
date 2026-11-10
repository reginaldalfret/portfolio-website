const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const STACK_CONFIGS = [
  {
    id: 'nuxt',
    name: 'Nuxt 3',
    version: '3.15.4',
    language: 'Vue 3.5 / TypeScript 5.7',
    runtime: 'Node.js 22 / Nitro Server Engine',
    dir: 'E:/Portfolio-Nuxt',
    templatePath: 'components/ResumePortfolio.vue',
    repoUrl: 'https://github.com/reginaldalfret/portfolio-nuxt',
    defaultBranch: 'main',
    buildCmd: 'npm run build',
    testCmd: 'npm test',
    prereqs: 'Node.js 20+ / npm',
    installCmd: 'npm install',
    devCmd: 'npm run dev',
    classification: 'NATIVE VERIFIED (NITRO HYDRATION)',
    renderType: 'Universal Nitro SSR & Client Hydration'
  },
  {
    id: 'django',
    name: 'Django 6',
    version: '6.0a1 / 5.2',
    language: 'Python 3.13',
    runtime: 'Python 3.13 / Gunicorn 26.2 WSGI',
    dir: 'E:/Portfolio-Django',
    templatePath: 'portfolio/templates/portfolio/index.html',
    repoUrl: 'https://github.com/reginaldalfret/portfolio-django',
    defaultBranch: 'main',
    buildCmd: 'python manage.py collectstatic --noinput',
    testCmd: 'python manage.py test',
    prereqs: 'Python 3.12+ (Python 3.13 recommended)',
    installCmd: 'pip install -r requirements.txt',
    devCmd: 'python manage.py runserver 0.0.0.0:8000',
    classification: 'NATIVE VERIFIED (WSGI DAEMON)',
    renderType: 'Classic Server-Side MVT Templates'
  },
  {
    id: 'springboot',
    name: 'Spring Boot 3',
    version: '3.4.1',
    language: 'Java 21 LTS',
    runtime: 'OpenJDK 21 / Embedded Tomcat 10.1 (Virtual Threads)',
    dir: 'E:/Portfolio-SpringBoot',
    templatePath: 'src/main/resources/templates/index.html',
    repoUrl: 'https://github.com/reginaldalfret/portfolio-springboot',
    defaultBranch: 'main',
    buildCmd: './mvnw clean package -DskipTests',
    testCmd: './mvnw test',
    prereqs: 'JDK 21 (Eclipse Temurin / OpenJDK)',
    installCmd: './mvnw clean compile',
    devCmd: './mvnw spring-boot:run',
    classification: 'NATIVE VERIFIED (JVM VIRTUAL THREADS)',
    renderType: 'Spring MVC Thymeleaf SSR'
  },
  {
    id: 'laravel',
    name: 'Laravel 11',
    version: '11.38.2 / 12',
    language: 'PHP 8.4',
    runtime: 'PHP 8.4 CLI / Artisan Engine',
    dir: 'E:/Portfolio-Laravel',
    templatePath: 'resources/views/welcome.blade.php',
    repoUrl: 'https://github.com/reginaldalfret/portfolio-laravel',
    defaultBranch: 'main',
    buildCmd: 'composer install --no-dev -o',
    testCmd: 'php artisan test',
    prereqs: 'PHP 8.2+ (PHP 8.4 recommended) with mbstring, pdo, xml',
    installCmd: 'composer install',
    devCmd: 'php artisan serve --host=0.0.0.0 --port=8000',
    classification: 'NATIVE VERIFIED (ARTISAN DAEMON)',
    renderType: 'Laravel Blade Server Components'
  },
  {
    id: 'rails',
    name: 'Ruby on Rails 8',
    version: '8.0.1',
    language: 'Ruby 3.4 YJIT',
    runtime: 'Ruby 3.4 YJIT / Puma 6.5 Rack Server',
    dir: 'E:/Portfolio-Rails',
    templatePath: 'app/views/portfolio/index.html.erb',
    repoUrl: 'https://github.com/reginaldalfret/portfolio-rails',
    defaultBranch: 'main',
    buildCmd: 'bin/rails assets:precompile',
    testCmd: 'bin/rails test',
    prereqs: 'Ruby 3.3+ (Ruby 3.4 recommended), Bundler',
    installCmd: 'bundle install',
    devCmd: 'bin/rails server -b 0.0.0.0 -p 3000',
    classification: 'NATIVE VERIFIED (PUMA DAEMON)',
    renderType: 'ActionView ERB Template Streaming'
  },
  {
    id: 'angular',
    name: 'Angular 19',
    version: '19.2',
    language: 'TypeScript 6.0',
    runtime: 'Browser DOM / Standalone Signals Engine',
    dir: 'E:/Portfolio-Angular',
    templatePath: 'src/app/app.html',
    repoUrl: 'https://github.com/reginaldalfret/portfolio-angular',
    defaultBranch: 'main',
    buildCmd: 'npm run build',
    testCmd: 'npm test',
    prereqs: 'Node.js 20+ / npm',
    installCmd: 'npm install',
    devCmd: 'npm start',
    classification: 'NATIVE VERIFIED (CLIENT SPA)',
    renderType: 'Client-Side Standalone Signals SPA'
  },
  {
    id: 'blazor',
    name: 'Blazor WASM',
    version: '.NET 8.0.11',
    language: 'C# 12 / .NET 8',
    runtime: 'Mono WebAssembly Runtime / Browser VM',
    dir: 'E:/Portfolio-Blazor',
    templatePath: 'Pages/Home.razor',
    repoUrl: 'https://github.com/reginaldalfret/portfolio-blazor',
    defaultBranch: 'main',
    buildCmd: 'dotnet publish -c Release -o dist',
    testCmd: 'dotnet test',
    prereqs: '.NET 8.0 SDK',
    installCmd: 'dotnet restore',
    devCmd: 'dotnet run',
    classification: 'NATIVE VERIFIED (CLIENT WASM)',
    renderType: 'Client-Side Compiled C# WebAssembly'
  },
  {
    id: 'buffalo',
    name: 'Go Buffalo',
    version: '1.1.4 / 1.27',
    language: 'Go 1.24 / 1.27',
    runtime: 'Compiled Native Go Binary (Gorilla Mux / Plush)',
    dir: 'E:/Portfolio-Buffalo',
    templatePath: 'templates/index.plush.html',
    repoUrl: 'https://github.com/reginaldalfret/portfolio-buffalo',
    defaultBranch: 'main',
    buildCmd: 'go build -o bin/app',
    testCmd: 'go test ./...',
    prereqs: 'Go 1.22+ (Go 1.24 recommended)',
    installCmd: 'go mod download',
    devCmd: 'go run main.go',
    classification: 'NATIVE VERIFIED (NATIVE GO DAEMON)',
    renderType: 'Plush High-Speed SSR Templates'
  },
  {
    id: 'leptos',
    name: 'Leptos 0.7',
    version: '0.7.7',
    language: 'Rust 1.99.1 (Edition 2021)',
    runtime: 'wasm32-unknown-unknown / wasm-bindgen',
    dir: 'E:/Portfolio-Leptos',
    templatePath: 'dist/index.html',
    repoUrl: 'https://github.com/reginaldalfret/portfolio-leptos',
    defaultBranch: 'master',
    buildCmd: 'trunk build --release',
    testCmd: 'cargo test',
    prereqs: 'Rust 1.80+, target wasm32-unknown-unknown, trunk',
    installCmd: 'cargo fetch',
    devCmd: 'trunk serve',
    classification: 'NATIVE VERIFIED (CLIENT WASM)',
    renderType: 'Rust AOT WebAssembly Client Reactive Graph'
  },
  {
    id: 'jaspr',
    name: 'Jaspr Web',
    version: '0.23.0',
    language: 'Dart 3.13.5',
    runtime: 'Dart Web AOT JavaScript / dart2js',
    dir: 'E:/Portfolio-Jaspr',
    templatePath: 'web/index.html',
    repoUrl: 'https://github.com/reginaldalfret/portfolio-jaspr',
    defaultBranch: 'main',
    buildCmd: 'jaspr build',
    testCmd: 'dart test',
    prereqs: 'Dart SDK 3.3+, jaspr_cli',
    installCmd: 'dart pub get',
    devCmd: 'jaspr serve',
    classification: 'NATIVE VERIFIED (DART WEB)',
    renderType: 'Universal Component Tree & Web Hydration'
  },
  {
    id: 'vapor',
    name: 'Vapor 4',
    version: '4.113.2',
    language: 'Swift 6.0 / 5.10',
    runtime: 'SwiftNIO Asynchronous Non-blocking Event Loops',
    dir: 'E:/Portfolio-Vapor',
    templatePath: 'Resources/Views/index.leaf',
    repoUrl: 'https://github.com/reginaldalfret/portfolio-vapor',
    defaultBranch: 'main',
    buildCmd: 'swift build -c release',
    testCmd: 'swift test',
    prereqs: 'Swift 5.10+ / Swift 6.0 Toolchain',
    installCmd: 'swift package resolve',
    devCmd: 'swift run App',
    classification: 'NATIVE VERIFIED (SWIFTNIO DAEMON)',
    renderType: 'Leaf Dynamic Server-Side Template Engine'
  }
];

const paritySpecContent = fs.readFileSync('STACK-PARITY-SPEC.md', 'utf8');

function generateReadme(stack) {
  return `# Reginald Alfret V — Portfolio (${stack.name})
## 12 Stacks. 1 Product. — Native ${stack.name} Implementation

**Author:** Reginald Alfret V  
**Role:** Open-Source Contributor · AI & Data Science Engineer · Full-Stack Developer  
**Live Personal Portfolio:** [https://reginaldalfret.tech](https://reginaldalfret.tech)  
**Central Engineering Lab:** [https://reginaldalfret.tech/lab](https://reginaldalfret.tech/lab)  
**Repository:** [${stack.repoUrl}](${stack.repoUrl})  
**Runtime Classification:** \`${stack.classification}\`

---

### 1. Executive Summary

This repository is one of **twelve independent native technology implementations** of the personal portfolio of Reginald Alfret V. 

The core concept is:

**12 STACKS. 1 PRODUCT.**

Rather than rendering static HTML replicas or shared client templates, this repository is built genuinely within the **${stack.name}** ecosystem, utilizing ${stack.language} and native framework conventions (${stack.renderType}).

---

### 2. Architectural Specification

| Metric / Attribute | Specification |
|---|---|
| **Framework** | ${stack.name} (${stack.version}) |
| **Language** | ${stack.language} |
| **Runtime Engine** | ${stack.runtime} |
| **Render Paradigm** | ${stack.renderType} |
| **Verification Status** | ${stack.classification} |
| **Parent Ecosystem** | 12 Stacks. 1 Product. Engineering Showcase |

---

### 3. Navigation & Ecosystem Integration

This application includes contextual integration back to the master portfolio ecosystem:

1. **Top Context Banner:** Identifies that this deployment is part of the 12 Stacks. 1 Product experiment.
2. **Personal Portfolio Link:** Direct link to [https://reginaldalfret.tech](https://reginaldalfret.tech).
3. **Engineering Lab Link:** Direct link to [https://reginaldalfret.tech/lab](https://reginaldalfret.tech/lab) where users can compare this framework's performance, memory footprint, and architecture against the other 11 stacks.

---

### 4. Prerequisites & Local Development

#### Prerequisites
- ${stack.prereqs}

#### Installation
\`\`\`bash
git clone ${stack.repoUrl}.git
cd ${path.basename(stack.dir)}
${stack.installCmd}
\`\`\`

#### Running Development Server
\`\`\`bash
${stack.devCmd}
\`\`\`

#### Production Build
\`\`\`bash
${stack.buildCmd}
\`\`\`

#### Running Test Suite
\`\`\`bash
${stack.testCmd}
\`\`\`

---

### 5. Benchmark & Empirical Telemetry

All performance metrics for this ${stack.name} implementation were audited under controlled scientific conditions (10 automated test trials, Navigation Timing Level 2, Resource Timing manifests, Lighthouse CLI).

View verified telemetry, cold/warm cache comparisons, and payload breakdowns in the [Polyglot Engineering Lab](https://reginaldalfret.tech/lab).

---

### 6. License & Copyright

© 2026 Reginald Alfret V. All rights reserved.
`;
}

function processStack(stack) {
  console.log(`\n==================================================`);
  console.log(`PROCESSING [${stack.id.toUpperCase()}]: ${stack.name}`);
  console.log(`==================================================`);

  if (!fs.existsSync(stack.dir)) {
    console.error(`Directory not found: ${stack.dir}`);
    return;
  }

  // 1. Git checkout feature branch
  try {
    const branches = execSync('git branch', { cwd: stack.dir, encoding: 'utf8' });
    if (branches.includes('feat/lab-integration')) {
      execSync('git checkout feat/lab-integration', { cwd: stack.dir, stdio: 'pipe' });
      console.log(`Switched to existing branch feat/lab-integration`);
    } else {
      execSync('git checkout -b feat/lab-integration', { cwd: stack.dir, stdio: 'pipe' });
      console.log(`Created and checked out branch feat/lab-integration`);
    }
  } catch (err) {
    console.error(`Git branch error in ${stack.id}:`, err.message);
  }

  // 2. Write STACK-PARITY-SPEC.md
  fs.writeFileSync(path.join(stack.dir, 'STACK-PARITY-SPEC.md'), paritySpecContent, 'utf8');
  console.log(`Wrote STACK-PARITY-SPEC.md`);

  // 3. Write README.md
  fs.writeFileSync(path.join(stack.dir, 'README.md'), generateReadme(stack), 'utf8');
  console.log(`Wrote standardized README.md`);

  // 4. Update template file with ecosystem context banner, return nav, and contextual teaser
  const fullTpl = path.join(stack.dir, stack.templatePath);
  if (fs.existsSync(fullTpl)) {
    let tpl = fs.readFileSync(fullTpl, 'utf8');

    // Context Banner
    const bannerHTML = `
<!-- ========================================================================= -->
<!-- 12 STACKS. 1 PRODUCT. ECOSYSTEM CONTEXT BANNER                            -->
<!-- ========================================================================= -->
<header class="w-full bg-neutral-950/95 border-b border-white/10 px-4 py-2.5 backdrop-blur-md sticky top-0 z-50">
  <div class="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
    <div class="flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
      <span class="text-neutral-400">PART OF THE <strong class="text-white">12 STACKS. 1 PRODUCT.</strong> EXPERIMENT</span>
      <span class="hidden sm:inline text-neutral-600">|</span>
      <span class="hidden sm:inline px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
        Current Implementation: <strong class="text-white">${stack.name}</strong>
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
</header>
`;

    // Context Teaser
    const teaserHTML = `
<!-- ========================================================================= -->
<!-- 12 STACKS. 1 PRODUCT. CENTRAL ENGINEERING LAB CONTEXT TEASER              -->
<!-- ========================================================================= -->
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
        <span>⚡</span> Compare ${stack.name} Against 11 Other Native Frameworks
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
</section>
`;

    // Standardized Footer
    const footerHTML = `
<!-- ========================================================================= -->
<!-- 12 STACKS. 1 PRODUCT. STANDARDIZED UNIFIED FOOTER                         -->
<!-- ========================================================================= -->
<footer class="pt-8 pb-12 text-center text-xs text-neutral-500 space-y-3 font-mono border-t border-white/10 mt-8">
  <div class="text-neutral-400 font-semibold tracking-wider">
    BETTER TECHNOLOGY • HAPPIER PEOPLE
  </div>
  <div class="flex flex-wrap items-center justify-center gap-3 text-neutral-400">
    <span>© 2026 Reginald Alfret V</span>
    <span>•</span>
    <span class="text-neutral-300">Engineered natively with <strong class="text-white">${stack.name}</strong></span>
    <span>•</span>
    <a href="https://reginaldalfret.tech" class="text-neutral-300 hover:text-white transition-colors">Personal Portfolio</a>
    <span>•</span>
    <a href="https://reginaldalfret.tech/lab" class="text-cyan-400 hover:text-cyan-300 transition-colors">Engineering Lab</a>
    <span>•</span>
    <a href="${stack.repoUrl}" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Source Code</a>
  </div>
</footer>
`;

    // Inject Banner at top of body or first container
    if (!tpl.includes('PART OF THE 12 STACKS. 1 PRODUCT.')) {
      if (tpl.includes('<body')) {
        const bodyEnd = tpl.indexOf('>', tpl.indexOf('<body')) + 1;
        tpl = tpl.slice(0, bodyEnd) + '\n' + bannerHTML + '\n' + tpl.slice(bodyEnd);
      } else if (tpl.includes('<main')) {
        const mainEnd = tpl.indexOf('>', tpl.indexOf('<main')) + 1;
        tpl = tpl.slice(0, mainEnd) + '\n' + bannerHTML + '\n' + tpl.slice(mainEnd);
      } else if (tpl.includes('<template>')) {
        const tplEnd = tpl.indexOf('>', tpl.indexOf('<template')) + 1;
        tpl = tpl.slice(0, tplEnd) + '\n' + bannerHTML + '\n' + tpl.slice(tplEnd);
      }
      console.log(`Injected context banner into ${stack.templatePath}`);
    }

    // Replace or add contextual teaser
    if (tpl.includes('id="engineering-lab-teaser"')) {
      // already present
    } else if (tpl.includes('id="stacks"') || tpl.includes('id="performance-lab"')) {
      tpl = tpl.replace(/<section[^>]*id="(?:stacks|performance-lab)"[\s\S]*?<\/section>/, teaserHTML);
      console.log(`Replaced previous heavy dashboard with clean teaser in ${stack.templatePath}`);
    } else if (tpl.includes('<footer')) {
      tpl = tpl.replace('<footer', teaserHTML + '\n\n<footer');
      console.log(`Added teaser before footer in ${stack.templatePath}`);
    }

    // Standardize Footer
    if (tpl.includes('<!-- 12 STACKS. 1 PRODUCT. STANDARDIZED UNIFIED FOOTER -->')) {
      // already present
    } else if (tpl.includes('<footer')) {
      tpl = tpl.replace(/<footer[\s\S]*?<\/footer>/, footerHTML);
      console.log(`Replaced footer with standardized footer in ${stack.templatePath}`);
    }

    fs.writeFileSync(fullTpl, tpl, 'utf8');
  }

  // 5. Git add & commit
  try {
    execSync('git add -A', { cwd: stack.dir, stdio: 'pipe' });
    const status = execSync('git status --porcelain', { cwd: stack.dir, encoding: 'utf8' }).trim();
    if (status) {
      execSync('git commit -m "feat: integrate engineering lab context navigation and standardize documentation"', { cwd: stack.dir, stdio: 'pipe' });
      const hash = execSync('git rev-parse HEAD', { cwd: stack.dir, encoding: 'utf8' }).trim();
      console.log(`Committed changes to feat/lab-integration (${hash})`);
    } else {
      console.log(`Working tree clean, nothing to commit.`);
    }
  } catch (err) {
    console.error(`Git commit error in ${stack.id}:`, err.message);
  }

  // 6. Push feat/lab-integration to origin
  try {
    console.log(`Pushing branch feat/lab-integration to origin...`);
    execSync('git push -u origin feat/lab-integration --force', { cwd: stack.dir, stdio: 'pipe' });
    console.log(`Successfully pushed feat/lab-integration to ${stack.repoUrl}`);
  } catch (err) {
    console.error(`Git push error in ${stack.id}:`, err.message);
  }
}

for (const s of STACK_CONFIGS) {
  processStack(s);
}

console.log('\n=== ALL CHILD REPOSITORIES PROCESSED ===');
