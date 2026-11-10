const fs = require('fs');
const path = require('path');

const map = {
  angular: 'ANGULAR',
  blazor: 'BLAZOR',
  buffalo: 'BUFFALO',
  django: 'DJANGO',
  jaspr: 'JASPR',
  laravel: 'LARAVEL',
  leptos: 'LEPTOS',
  nuxt: 'NUXT 3',
  rails: 'RAILS 8',
  springboot: 'SPRING BOOT',
  vapor: 'VAPOR 4'
};

for (const [dir, badge] of Object.entries(map)) {
  const filePath = path.resolve(__dirname, '../../public/stacks', dir, 'index.html');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const oldStr = '<div class="text-[11px] text-cyan-400 font-mono tracking-wider">RESUME PORTFOLIO (DJANGO)</div>';
    const newStr = `<div class="text-[11px] text-cyan-400 font-mono tracking-wider">RESUME PORTFOLIO (${badge})</div>`;
    if (content.includes(oldStr)) {
      content = content.replace(oldStr, newStr);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${dir} -> ${badge}`);
    } else {
      console.log(`Badge string not found in ${dir}`);
    }
  }
}
