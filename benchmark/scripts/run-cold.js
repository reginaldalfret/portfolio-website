
const { runBenchmark } = require('./collect_metrics');
runBenchmark({ viewportMode: 'desktop', cacheMode: 'cold', trials: 5 });
