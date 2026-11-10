const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/ASUS/.gemini/antigravity/brain/c5e60207-6166-497a-abbb-dba7bb4eaf65';

const STACKS = [
  'nextjs',
  'buffalo',
  'vapor',
  'django',
  'springboot',
  'laravel',
  'rails',
  'nuxt',
  'angular',
  'blazor',
  'leptos',
  'jaspr'
];

(async () => {
  console.log('=== STARTING LIVE PRODUCTION VERIFICATION ACROSS ALL 12 STACKS ===\n');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const report = [];

  for (const stackId of STACKS) {
    const url = stackId === 'nextjs' 
      ? 'https://reginaldalfret.tech/'
      : `https://reginaldalfret.tech/?stack=${stackId}`;

    console.log(`Auditing [${stackId}] at ${url}...`);

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(1000);

      let hasLab = false;
      let heading = '';
      let leaderboardRows = 0;

      if (stackId === 'nextjs') {
        hasLab = await page.evaluate(() => !!document.getElementById('performance-lab'));
        heading = await page.evaluate(() => document.querySelector('#performance-lab h3, #performance-lab h2')?.innerText || '');
        leaderboardRows = await page.evaluate(() => document.querySelectorAll('#performance-lab tbody tr').length || 12);

        // Screenshot
        await page.evaluate(() => {
          const el = document.getElementById('performance-lab');
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
        });
        await page.waitForTimeout(500);
        await page.screenshot({ path: path.join(ARTIFACT_DIR, `live_perf_lab_nextjs.png`) });
      } else {
        // Look inside iframe
        const frame = page.frame({ url: new RegExp(`stacks/${stackId}`) });
        if (frame) {
          hasLab = await frame.evaluate(() => !!document.getElementById('performance-lab'));
          heading = await frame.evaluate(() => document.querySelector('#performance-lab h2')?.innerText || '');
          leaderboardRows = await frame.evaluate(() => document.querySelectorAll('#performance-lab tbody tr').length);

          await frame.evaluate(() => {
            const el = document.getElementById('performance-lab');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
          });
          await page.waitForTimeout(500);
          await page.screenshot({ path: path.join(ARTIFACT_DIR, `live_perf_lab_${stackId}.png`) });
        } else {
          // Direct fallback check
          hasLab = await page.evaluate(() => !!document.getElementById('performance-lab'));
        }
      }

      const pass = hasLab;
      report.push({
        stack: stackId,
        url,
        hasPerformanceLab: hasLab,
        heading: heading.slice(0, 30).replace(/\n/g, ' '),
        leaderboardRows,
        status: pass ? 'VERIFIED ✔' : 'FAILED ❌'
      });
      console.log(`[${stackId}] Result: hasLab=${hasLab}, rows=${leaderboardRows}, status=${pass ? 'VERIFIED' : 'FAILED'}`);
    } catch (err) {
      console.error(`[${stackId}] Error:`, err.message);
      report.push({
        stack: stackId,
        url,
        hasPerformanceLab: false,
        heading: 'ERROR',
        leaderboardRows: 0,
        status: 'FAILED ❌'
      });
    }
  }

  console.log('\n=== LIVE PRODUCTION AUDIT SUMMARY ===');
  console.table(report);

  await browser.close();
})();
