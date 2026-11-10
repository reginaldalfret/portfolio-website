const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Simple static server for testing
function createServer(dir, port) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = req.url.split('?')[0];
      // strip /stacks/<id>
      reqPath = reqPath.replace(/^\/stacks\/[a-zA-Z0-9_-]+\/?/, '/');
      if (reqPath === '/' || reqPath.endsWith('/')) reqPath += 'index.html';
      const filePath = path.join(dir, reqPath);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        let mime = 'text/html';
        if (ext === '.js') mime = 'application/javascript';
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
  console.log('=== TESTING GENUINE CLIENT-SIDE APPS ===');

  let browser;
  try {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  } catch (e) {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  }

  const tests = [
    { name: 'Angular 19', route: 'angular', dir: 'E:/Portfolio-Angular/dist/portfolio-angular/browser', port: 9101 },
    { name: 'Leptos WASM', route: 'leptos', dir: 'E:/Portfolio-Leptos/dist', port: 9102 },
    { name: 'Blazor WASM', route: 'blazor', dir: 'E:/Portfolio-Blazor/publish/wwwroot', port: 9103 },
    { name: 'Nuxt 3', route: 'nuxt', dir: 'E:/Portfolio-Nuxt/.output/public', port: 9104 },
    { name: 'Jaspr Web', route: 'jaspr', dir: 'E:/Portfolio-Jaspr/build/jaspr', port: 9105 }
  ];

  for (const t of tests) {
    console.log(`\nTesting ${t.name}...`);
    const srv = await createServer(t.dir, t.port);
    const context = await browser.newContext();
    const page = await context.newPage();

    const consoleLogs = [];
    const requestedUrls = [];
    page.on('console', msg => consoleLogs.push(msg.text()));
    page.on('request', req => requestedUrls.push(req.url()));

    try {
      await page.goto(`http://127.0.0.1:${t.port}/stacks/${t.route}/`, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(2000);

      const title = await page.title();
      const bodyText = await page.innerText('body');
      const hasName = bodyText.includes('Reginald') || bodyText.includes('REGINALD');
      const wasmRequests = requestedUrls.filter(u => u.endsWith('.wasm'));

      console.log(`  [${t.name}] Title: "${title}"`);
      console.log(`  [${t.name}] Contains Name: ${hasName ? 'YES' : 'NO'}`);
      console.log(`  [${t.name}] WASM Requests (${wasmRequests.length}):`, wasmRequests.slice(0, 3).join(', '));
      console.log(`  [${t.name}] Total Network Requests: ${requestedUrls.length}`);
    } catch (err) {
      console.log(`  [${t.name}] ERROR: ${err.message}`);
    }

    await context.close();
    srv.close();
  }

  await browser.close();
  console.log('\nTesting complete.');
})();
