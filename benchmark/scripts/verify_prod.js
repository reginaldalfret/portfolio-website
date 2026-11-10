const { chromium } = require('playwright');
const path = require('path');

(async () => {
  let browser;
  try {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  } catch (e) {
    try {
      browser = await chromium.launch({ channel: 'chrome', headless: true });
    } catch (e2) {
      browser = await chromium.launch({ headless: true });
    }
  }

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const outDir = 'C:/Users/ASUS/.gemini/antigravity/brain/c5e60207-6166-497a-abbb-dba7bb4eaf65';

  console.log('1. Testing ?stack=springboot...');
  await page.goto('https://reginaldalfret.tech/?stack=springboot', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(outDir, 'verify_prod_springboot.png') });

  console.log('2. Testing ?stack=angular...');
  await page.goto('https://reginaldalfret.tech/?stack=angular', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(outDir, 'verify_prod_angular.png') });

  console.log('3. Testing main page...');
  await page.goto('https://reginaldalfret.tech/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(outDir, 'verify_prod_main.png') });

  console.log('4. Testing Engineering Lab tab...');
  // Find tab button that matches Engineering Lab or Performance Lab
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await btn.innerText();
    if (text.includes('Performance Lab') || text.includes('Engineering Lab') || text.includes('Benchmark')) {
      await btn.click();
      await page.waitForTimeout(1000);
      break;
    }
  }
  await page.screenshot({ path: path.join(outDir, 'verify_prod_lab.png') });

  console.log('5. Testing GitHub repo status...');
  await page.goto('https://github.com/reginaldalfret/portfolio-website', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(outDir, 'verify_prod_github.png') });

  await browser.close();
  console.log('All verification screenshots saved successfully.');
})();
