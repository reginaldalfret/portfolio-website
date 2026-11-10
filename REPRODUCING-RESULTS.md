# REPRODUCING BENCHMARK RESULTS

## Step-by-Step Instructions

```bash
# 1. Clone repository
git clone https://github.com/reginaldalfret/portfolio-website.git
cd portfolio-website

# 2. Install dependencies
npm install

# 3. Run desktop benchmark trials (5 iterations per stack)
npm run benchmark:desktop

# 4. Run mobile benchmark trials (390x844 viewport)
npm run benchmark:mobile

# 5. Validate output integrity
npm run benchmark:validate
```

All outputs are saved to:
- Raw runs: `/benchmark/results/raw/`
- Summary CSV: `/benchmark/reports/comparison.csv`
- Summary Markdown: `/benchmark/reports/summary.md`
