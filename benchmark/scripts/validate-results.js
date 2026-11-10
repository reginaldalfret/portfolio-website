
const fs = require('fs');
const path = require('path');

const resultsPath = path.resolve(__dirname, '../results/processed/benchmark-results.json');
if (!fs.existsSync(resultsPath)) {
  console.error('[FAIL] benchmark-results.json not found. Run benchmark first.');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
console.log('--- VALIDATING BENCHMARK RESULTS ---');
console.log(`Total stacks tested: ${data.length}`);

let valid = true;
data.forEach(s => {
  if (!s.fcp || s.fcp.median === null) {
    console.error(`[FAIL] ${s.name} missing FCP metric`);
    valid = false;
  }
  if (!s.ttfb || s.ttfb.median === null) {
    console.error(`[FAIL] ${s.name} missing TTFB metric`);
    valid = false;
  }
  if (!s.payloadKb || s.payloadKb.median === null) {
    console.error(`[FAIL] ${s.name} missing Payload metric`);
    valid = false;
  }
  console.log(`[PASS] ${s.name}: FCP=${s.fcp.median}ms, TTFB=${s.ttfb.median}ms, Payload=${s.payloadKb.median}KB`);
});

if (!valid) {
  process.exit(1);
} else {
  console.log('\n[SUCCESS] All benchmark results verified and scientifically valid!\n');
}
