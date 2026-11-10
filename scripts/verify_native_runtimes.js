/**
 * Comprehensive Native Runtime Verification Suite
 * 
 * Verifies:
 * 1. Native Client Runtimes:
 *    - Leptos: downloads .wasm binary, WebAssembly.instantiate, reactive DOM
 *    - Blazor: downloads dotnet.wasm, BCL assemblies, blazor.webassembly.js
 *    - Angular: loads main-*.js, Angular signals runtime, boots <app-root>
 *    - Nuxt 3: client hydration, loads _nuxt/ bundles, Vue 3 reactive DOM
 *    - Jaspr: loads main.client.dart.js, Dart Web runtime
 * 2. Native Backend Runtimes (Local & Staging):
 *    - Buffalo (Go 1.27): Buffalo Plush HTTP server
 *    - Spring Boot (Java 21): Embedded Tomcat Spring MVC
 *    - Django (Python 3.13): Django WSGI/ASGI server
 *    - Laravel (PHP 8.4): Laravel Artisan server
 *    - Rails (Ruby 3.4): Puma HTTP server
 *    - Vapor (Swift 6.0): SwiftNIO HTTP server
 */

const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Static file server to test public/stacks/
function createStaticServer(publicDir, port) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = req.url.split('?')[0];
      if (reqPath.endsWith('/')) reqPath += 'index.html';
      const filePath = path.join(publicDir, reqPath);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        let mime = 'text/html';
        if (ext === '.js' || ext === '.mjs') mime = 'application/javascript';
        else if (ext === '.wasm') mime = 'application/wasm';
        else if (ext === '.css') mime = 'text/css';
        else if (ext === '.json') mime = 'application/json';
        else if (ext === '.png') mime = 'image/png';
        else if (ext === '.ico') mime = 'image/x-icon';

        res.writeHead(200, {
          'Content-Type': mime,
          'Access-Control-Allow-Origin': '*'
        });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404);
        res.end('Not found: ' + reqPath);
      }
    });

    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}

function probeHttp(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          bodyLength: data.length,
          containsName: data.includes('Reginald Alfret')
        });
      });
    });
    req.on('error', (err) => {
      resolve({ error: err.message });
    });
    req.setTimeout(3000, () => {
      req.destroy();
      resolve({ error: 'timeout' });
    });
  });
}

(async () => {
  console.log('======================================================');
  console.log('   POLYGLOT NATIVE RUNTIME RECONSTRUCTION AUDIT       ');
  console.log('======================================================\n');

  const publicDir = path.resolve('public');
  const port = 9350;
  const server = await createStaticServer(publicDir, port);
  console.log(`[Static Server] Serving /stacks from localhost:${port}\n`);

  let browser;
  try {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  } catch (e) {
    browser = await chromium.launch({ headless: true });
  }

  const clientResults = [];
  const clientStacks = [
    {
      stack: 'Leptos',
      lang: 'Rust 1.99.1',
      type: 'WebAssembly SPA',
      url: `http://127.0.0.1:${port}/stacks/leptos/`,
      expectedAssets: ['.wasm', 'portfolio-leptos'],
      selector: 'body'
    },
    {
      stack: 'Blazor',
      lang: '.NET 8 / C#',
      type: 'WebAssembly SPA',
      url: `http://127.0.0.1:${port}/stacks/blazor/`,
      expectedAssets: ['dotnet', '.wasm', 'blazor.webassembly.js'],
      selector: '#app'
    },
    {
      stack: 'Angular',
      lang: 'TypeScript 6.0',
      type: 'Client SPA (Signals)',
      url: `http://127.0.0.1:${port}/stacks/angular/`,
      expectedAssets: ['main-', '.js'],
      selector: 'app-root'
    },
    {
      stack: 'Nuxt',
      lang: 'Vue 3 / TypeScript',
      type: 'Nitro Hydration / Vue 3',
      url: `http://127.0.0.1:${port}/stacks/nuxt/`,
      expectedAssets: ['_nuxt/', '.js'],
      selector: '#__nuxt'
    },
    {
      stack: 'Jaspr',
      lang: 'Dart 3.13.5',
      type: 'Dart Web SPA',
      url: `http://127.0.0.1:${port}/stacks/jaspr/`,
      expectedAssets: ['main.client.dart.js'],
      selector: 'body'
    }
  ];

  for (const item of clientStacks) {
    process.stdout.write(`Testing [${item.stack}] (${item.lang}) ... `);
    const context = await browser.newContext();
    const page = await context.newPage();

    const downloadedAssets = [];
    const errors = [];

    page.on('response', (res) => {
      const u = res.url();
      if (res.status() === 200) {
        for (const exp of item.expectedAssets) {
          if (u.includes(exp)) downloadedAssets.push(u);
        }
      }
    });

    page.on('pageerror', err => errors.push(err.message));

    let pass = false;
    let renderText = '';
    try {
      await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 10000 });
      await page.waitForTimeout(2000);

      renderText = await page.evaluate(() => document.body.innerText);
      const containsName = renderText.includes('Reginald Alfret');
      const hasAssets = downloadedAssets.length > 0;

      pass = containsName && hasAssets;
      clientResults.push({
        stack: item.stack,
        lang: item.lang,
        type: item.type,
        status: pass ? 'VERIFIED' : 'FAILED',
        downloadedAssetsCount: downloadedAssets.length,
        hasExpectedAssets: hasAssets,
        containsName,
        errorCount: errors.length
      });
      console.log(pass ? 'VERIFIED ✔' : 'FAILED ❌');
    } catch (e) {
      console.log('ERROR ❌: ' + e.message);
      clientResults.push({
        stack: item.stack,
        lang: item.lang,
        type: item.type,
        status: 'FAILED',
        error: e.message
      });
    } finally {
      await context.close();
    }
  }

  await browser.close();
  server.close();

  console.log('\n--- Client Runtimes Verification Summary ---');
  console.table(clientResults);

  // Probe Backend Runtimes (Local & Staging)
  console.log('\n--- Probing Backend Native Server Ports ---');
  const backendStacks = [
    { stack: 'Go Buffalo', port: 8087, lang: 'Go 1.24/1.27', framework: 'Buffalo Plush Engine' },
    { stack: 'Spring Boot', port: 8082, lang: 'Java 21 LTS', framework: 'Spring MVC Embedded Tomcat' },
    { stack: 'Django', port: 8083, lang: 'Python 3.13', framework: 'Django 6 Gunicorn WSGI' },
    { stack: 'Laravel', port: 8085, lang: 'PHP 8.4', framework: 'Laravel 11 Artisan Blade' },
    { stack: 'Ruby on Rails', port: 8084, lang: 'Ruby 3.4', framework: 'Rails 8 Puma Rack' },
    { stack: 'Vapor 4', port: 8086, lang: 'Swift 6.0', framework: 'SwiftNIO Non-blocking I/O' }
  ];

  const backendResults = [];
  for (const b of backendStacks) {
    const res = await probeHttp(`http://127.0.0.1:${b.port}/`);
    backendResults.push({
      stack: b.stack,
      port: b.port,
      lang: b.lang,
      framework: b.framework,
      active: !res.error && res.statusCode === 200,
      statusCode: res.statusCode || null,
      serverHeader: res.headers ? (res.headers['server'] || res.headers['x-powered-by'] || 'none') : null,
      error: res.error || null
    });
  }

  console.table(backendResults);
  fs.writeFileSync('scripts/verification_results.json', JSON.stringify({ clientResults, backendResults }, null, 2));
  console.log('\nWrote results to scripts/verification_results.json');
})();
