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
  const files = fs.readdirSync(repoPath);
  const dockerfiles = files.filter(f => f.toLowerCase().includes('docker') || f.toLowerCase().includes('compose') || f.endsWith('.sh') || f.endsWith('.py') || f.endsWith('.cmd'));
  console.log(`[${r}] Scripts & Docker:`, dockerfiles.join(', ') || 'None found');
}
