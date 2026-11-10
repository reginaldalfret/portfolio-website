const https = require('https');

const STACKS = [
  { id: 'nextjs', name: 'Next.js 14', path: '/' },
  { id: 'buffalo', name: 'Go Buffalo', path: '/stacks/buffalo' },
  { id: 'vapor', name: 'Vapor 4', path: '/stacks/vapor' },
  { id: 'django', name: 'Django 6', path: '/stacks/django' },
  { id: 'laravel', name: 'Laravel 11', path: '/stacks/laravel' },
  { id: 'rails', name: 'Ruby on Rails 8', path: '/stacks/rails' },
  { id: 'springboot', name: 'Spring Boot 3', path: '/stacks/springboot' },
  { id: 'nuxt', name: 'Nuxt 3', path: '/stacks/nuxt' },
  { id: 'jaspr', name: 'Jaspr Web', path: '/stacks/jaspr' },
  { id: 'leptos', name: 'Leptos 0.7', path: '/stacks/leptos' },
  { id: 'angular', name: 'Angular 19', path: '/stacks/angular' },
  { id: 'blazor', name: 'Blazor WASM', path: '/stacks/blazor' }
];

function checkHeader(stack) {
  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'reginaldalfret.tech',
      path: stack.path,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          id: stack.id,
          name: stack.name,
          path: stack.path,
          statusCode: res.statusCode,
          headers: res.headers,
          bodyLength: data.length
        });
      });
    });
    req.on('error', err => resolve({ id: stack.id, error: err.message }));
    req.end();
  });
}

(async () => {
  const results = [];
  for (const s of STACKS) {
    const res = await checkHeader(s);
    results.push(res);
    console.log(`[${s.id}] Status: ${res.statusCode}, Server: ${res.headers['server']}, Cache: ${res.headers['x-vercel-cache']}, Content-Type: ${res.headers['content-type']}, Length: ${res.bodyLength}`);
  }
  const fs = require('fs');
  fs.writeFileSync('benchmark/artifacts/server-headers-audit.json', JSON.stringify(results, null, 2));
})();
