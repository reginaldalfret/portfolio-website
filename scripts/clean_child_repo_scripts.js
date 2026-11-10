const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== CLEANING RESIDUAL SCRIPTS IN CHILD REPOSITORIES ===\n');

const targets = [
  { repo: 'E:/Portfolio-angular', file: 'src/app/app.html' },
  { repo: 'E:/Portfolio-buffalo', file: 'templates/index.plush.html' },
  { repo: 'E:/Portfolio-springboot', file: 'src/main/resources/templates/index.html' }
];

targets.forEach(({ repo, file }) => {
  const fullPath = path.join(repo, file);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');

  // Strip residual script blocks with old metrics
  content = content.replace(/<script>[\s\S]*?polyglot-performance-lab-metrics[\s\S]*?<\/script>/g, '');
  content = content.replace(/<script>[\s\S]*?window\.exportLabCSV[\s\S]*?<\/script>/g, '');
  content = content.replace(/<script>[\s\S]*?window\.exportLabJSON[\s\S]*?<\/script>/g, '');
  content = content.replace(/<script>[\s\S]*?switchLabTab[\s\S]*?<\/script>/g, '');

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Cleaned residual scripts in ${fullPath}`);

  // Git commit and push on feat/lab-integration
  try {
    const status = execSync('git status --porcelain', { cwd: repo, encoding: 'utf8' }).trim();
    if (status) {
      console.log(`Committing updates in ${repo}...`);
      execSync('git add .', { cwd: repo, stdio: 'inherit' });
      execSync('git commit -m "fix(lab): remove deprecated benchmark script leftovers and link to central lab"', { cwd: repo, stdio: 'inherit' });
      execSync('git push origin feat/lab-integration', { cwd: repo, stdio: 'inherit' });
      console.log(`Pushed updates to ${repo} feat/lab-integration\n`);
    } else {
      console.log(`No changes needed in ${repo}\n`);
    }
  } catch (err) {
    console.error(`Error updating git for ${repo}:`, err.message);
  }
});

console.log('Child repository cleanup complete!');
