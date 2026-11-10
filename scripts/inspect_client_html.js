const fs = require('fs');

const targets = [
  { name: 'Leptos', file: 'E:/Portfolio-Leptos/dist/index.html' },
  { name: 'Blazor', file: 'E:/Portfolio-Blazor/publish/wwwroot/index.html' },
  { name: 'Angular', file: 'E:/Portfolio-Angular/dist/portfolio-angular/browser/index.html' },
  { name: 'Nuxt', file: 'E:/Portfolio-Nuxt/.output/public/index.html' },
  { name: 'Jaspr', file: 'E:/Portfolio-Jaspr/build/jaspr/index.html' }
];

for (const t of targets) {
  console.log(`\n========================================`);
  console.log(`HTML INSPECTION: ${t.name} (${t.file})`);
  console.log(`========================================`);
  if (fs.existsSync(t.file)) {
    const html = fs.readFileSync(t.file, 'utf8');
    console.log(`Size: ${html.length} bytes`);
    // Print script and link tags
    const scripts = html.match(/<script[\s\S]*?<\/script>/gi) || [];
    console.log(`Scripts found (${scripts.length}):`);
    scripts.forEach(s => console.log('  ' + s.substring(0, 120)));
    const links = html.match(/<link[\s\S]*?>/gi) || [];
    console.log(`Links found (${links.length}):`);
    links.slice(0, 5).forEach(l => console.log('  ' + l.substring(0, 120)));
  } else {
    console.log('File not found');
  }
}
