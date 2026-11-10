const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Static server serving public directory as root
function createPublicServer(publicDir, port) {
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

        res.writeHead(200, { 'Content-Type': mime, 'Access-Control-Allow-Origin': '*' });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404);
        res.end('Not found: ' + reqPath);
      }
    });
    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}

(async () => {
  console.log('=== VERIFYING RECONSTRUCTED PUBLIC CLIENT RUNTIMES ===');

  const publicDir = path.resolve('public');
  const server = await createPublicServer(publicDir, 9200);

  let browser;
  try {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  } catch (e) {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  }

  const clientStacks = [
    { name: 'Angular 19', url: 'http://127.0.0.1:9200/stacks/angular/' },
    { name: 'Leptos WASM', url: 'http://127.0.0.1:9200/stacks/leptos/' },
    { name: 'Blazor WASM', url: 'http://127.0.0.1:9200/stacks/blazor/' },
    { name: 'Nuxt 3', url: 'http://127.0.0.1:9200/stacks/nuxt/' },
    { name: 'Jaspr Web', url: 'http://127.0.0.1:9200/stacks/jaspr/' }
  ];

  for (const s of clientStacks) {
    console.log(`\nTesting [${s.name}] -> ${s.url}`);
    const context = await browser.newContext();
    const page = await context.newPage();

    const networkRequests = [];
    page.on('request', r => networkRequests.push({ url: r.url(), resourceType: r.resourceType() }));

    const consoleLogs = [];
    page.on('console', m => consoleLogs.push(m.text()));

    try {
      await page.goto(s.url, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(2000);

      const title = await page.title();
      const bodyText = await page.innerText('body');
      const hasReginald = bodyText.includes('Reginald') || bodyText.includes('REGINALD');

      const wasmFiles = networkRequests.filter(r => r.url.endsWith('.wasm'));
      const jsFiles = networkRequests.filter(r => r.url.endsWith('.js') || r.resourceType === 'script');

      console.log(`  Title: "${title}"`);
      console.log(`  Rendered Text Contains "Reginald": ${hasReginald ? 'YES' : 'NO'}`);
      console.log(`  WASM Files Downloaded (${wasmFiles.length}):`, wasmFiles.map(w => path.basename(w.url)).slice(0, 5).join(', ') || 'None');
      console.log(`  JS Files Downloaded (${jsFiles.length}):`, jsFiles.map(j => path.basename(j.url.split('?')[0])).slice(0, 5).join(', '));
      console.log(`  Total Network Requests: ${networkRequests.length}`);
    } catch (e) {
      console.log(`  ERROR: ${e.message}`);
    }

    await context.close();
  }

  await browser.close();
  server.close();
  console.log('\nVerification complete.');
})();
