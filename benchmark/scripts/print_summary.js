const fs = require('fs');
const summary = JSON.parse(fs.readFileSync('benchmark/results/audit/audit-statistical-summary.json', 'utf8'));
const lh = JSON.parse(fs.readFileSync('benchmark/artifacts/lighthouse/lighthouse-summary.json', 'utf8'));

console.log('=== DESKTOP COLD SUMMARY (N=10) ===');
for (const s of summary['desktop-cold']) {
  console.log(`${s.name.padEnd(16)} | TTFB: ${s.ttfb.median}ms (mean: ${s.ttfb.mean}, std: ${s.ttfb.stdDev}) | FCP: ${s.fcp.median}ms (mean: ${s.fcp.mean}, std: ${s.fcp.stdDev}) | LCP: ${s.lcp.median}ms | Payload: ${s.payloadKb.median}KB`);
}

console.log('\n=== DESKTOP WARM SUMMARY (N=10) ===');
for (const s of summary['desktop-warm']) {
  console.log(`${s.name.padEnd(16)} | TTFB: ${s.ttfb.median}ms | FCP: ${s.fcp.median}ms | LCP: ${s.lcp.median}ms | Payload: ${s.payloadKb.median}KB`);
}

console.log('\n=== MOBILE COLD SUMMARY (N=10) ===');
for (const s of summary['mobile-cold']) {
  console.log(`${s.name.padEnd(16)} | TTFB: ${s.ttfb.median}ms | FCP: ${s.fcp.median}ms | LCP: ${s.lcp.median}ms | Payload: ${s.payloadKb.median}KB`);
}

console.log('\n=== LIGHTHOUSE SCORES ===');
for (const l of lh) {
  console.log(`${l.name.padEnd(16)} | Score: ${l.score} | FCP: ${l.fcpMs}ms | LCP: ${l.lcpMs}ms | TBT: ${l.tbtMs}ms | SI: ${l.speedIndexMs}ms | CLS: ${l.cls}`);
}
