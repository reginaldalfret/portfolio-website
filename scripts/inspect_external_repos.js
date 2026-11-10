const fs = require('fs');
const path = require('path');

const repos = [
  'Portfolio-Angular',
  'Portfolio-Blazor',
  'Portfolio-Buffalo',
  'Portfolio-Django',
  'Portfolio-Jaspr',
  'Portfolio-Laravel',
  'Portfolio-Leptos',
  'Portfolio-Nuxt',
  'Portfolio-Rails',
  'Portfolio-SpringBoot',
  'Portfolio-Vapor'
];

for (const r of repos) {
  const repoPath = path.join('E:', r);
  console.log(`\n========================================`);
  console.log(`REPOSITORY: E:\\${r}`);
  console.log(`========================================`);
  try {
    const files = fs.readdirSync(repoPath);
    console.log(`Files count: ${files.length}`);
    console.log(files.slice(0, 15).join(', '));
  } catch (err) {
    console.log(`Error reading ${r}: ${err.message}`);
  }
}
