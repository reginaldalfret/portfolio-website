const { execSync } = require('child_process');
const fs = require('fs');

const repos = [
  { id: 'nextjs', name: 'Next.js 14', path: 'E:/Portfolio', defaultBranch: 'main', featBranch: 'feat/portfolio-lab-separation' },
  { id: 'nuxt', name: 'Nuxt 3', path: 'E:/Portfolio-nuxt', defaultBranch: 'main', featBranch: 'feat/lab-integration' },
  { id: 'django', name: 'Django 6', path: 'E:/Portfolio-django', defaultBranch: 'main', featBranch: 'feat/lab-integration' },
  { id: 'springboot', name: 'Spring Boot 3', path: 'E:/Portfolio-springboot', defaultBranch: 'main', featBranch: 'feat/lab-integration' },
  { id: 'laravel', name: 'Laravel 11', path: 'E:/Portfolio-laravel', defaultBranch: 'main', featBranch: 'feat/lab-integration' },
  { id: 'rails', name: 'Ruby on Rails 8', path: 'E:/Portfolio-rails', defaultBranch: 'main', featBranch: 'feat/lab-integration' },
  { id: 'angular', name: 'Angular 19', path: 'E:/Portfolio-angular', defaultBranch: 'main', featBranch: 'feat/lab-integration' },
  { id: 'blazor', name: 'Blazor WASM', path: 'E:/Portfolio-blazor', defaultBranch: 'main', featBranch: 'feat/lab-integration' },
  { id: 'buffalo', name: 'Go Buffalo', path: 'E:/Portfolio-buffalo', defaultBranch: 'main', featBranch: 'feat/lab-integration' },
  { id: 'leptos', name: 'Leptos 0.7', path: 'E:/Portfolio-leptos', defaultBranch: 'master', featBranch: 'feat/lab-integration' },
  { id: 'jaspr', name: 'Jaspr Web', path: 'E:/Portfolio-jaspr', defaultBranch: 'main', featBranch: 'feat/lab-integration' },
  { id: 'vapor', name: 'Vapor 4', path: 'E:/Portfolio-vapor', defaultBranch: 'main', featBranch: 'feat/lab-integration' }
];

console.log('=== MERGING ALL FEATURE BRANCHES INTO DEFAULT BRANCHES ===\n');

const results = [];

for (const r of repos) {
  console.log(`>>> Processing ${r.name} (${r.id})...`);
  const log = { id: r.id, name: r.name, defaultBranch: r.defaultBranch, featBranch: r.featBranch, success: false };

  try {
    // 1. Checkout default branch
    execSync(`git checkout ${r.defaultBranch}`, { cwd: r.path, stdio: 'inherit' });

    // 2. Pull remote default branch
    execSync(`git pull origin ${r.defaultBranch}`, { cwd: r.path, stdio: 'inherit' });

    // 3. Merge feature branch
    execSync(`git merge ${r.featBranch} -m "Merge ${r.featBranch} into ${r.defaultBranch}"`, { cwd: r.path, stdio: 'inherit' });

    // 4. Push default branch to remote origin
    execSync(`git push origin ${r.defaultBranch}`, { cwd: r.path, stdio: 'inherit' });

    // 5. Get latest commit hash
    const head = execSync('git rev-parse --short HEAD', { cwd: r.path, encoding: 'utf8' }).trim();
    log.commit = head;
    log.success = true;
    console.log(`✔ Successfully merged and pushed ${r.name} to origin/${r.defaultBranch} (commit: ${head})\n`);
  } catch (err) {
    log.error = err.message;
    console.error(`✖ Failed to merge ${r.name}:`, err.message, '\n');
  }

  results.push(log);
}

console.log('\n--- MERGE EXECUTION SUMMARY ---');
results.forEach(res => {
  console.log(`[${res.success ? 'MERGED ✔' : 'FAILED ✖'}] ${res.name.padEnd(18)} -> origin/${res.defaultBranch.padEnd(8)} (Commit: ${res.commit || 'N/A'})`);
});
