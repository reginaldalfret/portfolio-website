const fs = require('fs');
const ignores = [
  'E:/Portfolio-Django/.dockerignore',
  'E:/Portfolio-Laravel/.dockerignore',
  'E:/Portfolio-Buffalo/.dockerignore',
  'E:/Portfolio-SpringBoot/.dockerignore',
  'E:/Portfolio-Rails/.dockerignore',
  'E:/Portfolio-Vapor/.dockerignore'
];
const content = `.git\n.venv\nvenv\nENV\nnode_modules\ntarget\ntmp\n.gradle\n.idea\n.vscode\n*.log\n`;
for (const f of ignores) {
  try {
    fs.writeFileSync(f, content);
    console.log('Wrote', f);
  } catch (e) {
    console.error(e.message);
  }
}
