const fs = require('fs');

const paths = [
  'E:/Portfolio-Angular/dist/portfolio-angular',
  'E:/Portfolio-Angular/dist/portfolio-angular/browser',
  'E:/Portfolio-Blazor/publish/wwwroot',
  'E:/Portfolio-Blazor/dist/wwwroot/_framework',
  'E:/Portfolio-Blazor/publish/wwwroot/_framework',
  'E:/Portfolio-Jaspr/build/jaspr'
];

for (const p of paths) {
  if (fs.existsSync(p)) {
    console.log(`[FOUND] ${p}:`, fs.readdirSync(p).slice(0, 10).join(', '));
  } else {
    console.log(`[NOT FOUND] ${p}`);
  }
}
