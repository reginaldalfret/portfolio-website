const fs = require('fs');
const path = require('path');

const checks = [
  { name: 'Angular Dist', path: 'E:/Portfolio-Angular/dist' },
  { name: 'Blazor Publish/Dist', path: 'E:/Portfolio-Blazor/dist' },
  { name: 'Blazor Wwwroot', path: 'E:/Portfolio-Blazor/wwwroot' },
  { name: 'Leptos Dist', path: 'E:/Portfolio-Leptos/dist' },
  { name: 'Nuxt Output', path: 'E:/Portfolio-Nuxt/.output/public' },
  { name: 'Jaspr Build', path: 'E:/Portfolio-Jaspr/build' }
];

for (const c of checks) {
  console.log(`\n========================================`);
  console.log(`CHECK: ${c.name} (${c.path})`);
  console.log(`========================================`);
  try {
    if (fs.existsSync(c.path)) {
      const files = fs.readdirSync(c.path);
      console.log(`Exists: YES (${files.length} items):`, files.slice(0, 10).join(', '));
    } else {
      console.log(`Exists: NO`);
    }
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
}
