
const { runBenchmark } = require('./collect_metrics');
(async () => {
  console.log('=== RUNNING FULL MULTI-PROFILE BENCHMARK SUITE ===');
  await runBenchmark({ viewportMode: 'desktop', cacheMode: 'cold', trials: 5 });
  await runBenchmark({ viewportMode: 'mobile', cacheMode: 'cold', trials: 5 });
  await runBenchmark({ viewportMode: 'desktop', cacheMode: 'warm', trials: 5 });
  console.log('=== FULL SUITE EXECUTION COMPLETE ===');
})();
