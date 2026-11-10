
const { runBenchmark } = require('./collect_metrics');
runBenchmark({ viewportMode: 'mobile', cacheMode: 'cold', trials: 5 });
