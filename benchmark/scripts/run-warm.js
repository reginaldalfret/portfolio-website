
const { runBenchmark } = require('./collect_metrics');
runBenchmark({ viewportMode: 'desktop', cacheMode: 'warm', trials: 5 });
