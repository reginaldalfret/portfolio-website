const { chromium } = require('playwright');
const path = require('path');

const STACKS = [
  'nextjs',
  'nuxt',
  'django',
  'springboot',
  'laravel',
  'rails',
  'angular',
  'blazor',
  'buffalo',
  'leptos',
  'jaspr',
  'vapor'
];

(async () => {
  console.log('=== RUNNING COMPREHENSIVE 12-STACK ACCEPTANCE TEST SUITE ===');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  const results = [];

  for (const stack of STACKS) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    
    let url;
    if (stack === 'nextjs') {
      url = 'https://reginaldalfret.tech/';
    } else {
      url = `https://reginaldalfret.tech/stacks/${stack}`;
    }

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(1000);

      const title = await page.title();
      const hero = await page.$eval('h1', el => el.innerText.trim()).catch(() => 'NOT FOUND');
      const prs = await page.$$eval('#open-source a', els => els.length).catch(() => 0);
      const stackCards = await page.$$eval('#stacks .grid > div', els => els.length).catch(() => 0);
      
      const passHero = hero.includes('REGINALD ALFRET');
      const passPRs = prs >= 30;
      const passStacks = stackCards >= 12;

      const status = passHero && passPRs && passStacks ? 'PASS' : 'WARN';
      results.push({ stack, status, title, hero, prs, stackCards });
      console.log(`[${status}] ${stack.toUpperCase()}: Hero="${hero}", PRs=${prs}, Stacks=${stackCards}`);
    } catch (err) {
      console.error(`[FAIL] ${stack.toUpperCase()}: ${err.message}`);
      results.push({ stack, status: 'FAIL', error: err.message });
    } finally {
      await page.close();
    }
  }

  await browser.close();

  console.log('\n=== TEST SUMMARY ===');
  const passed = results.filter(r => r.status === 'PASS').length;
  console.log(`Passed: ${passed} / ${STACKS.length} stacks`);
})();
