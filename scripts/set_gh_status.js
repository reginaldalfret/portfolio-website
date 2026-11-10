const { execSync } = require('child_process');
const sha = execSync('git rev-parse HEAD').toString().trim();
console.log('Setting commit status for:', sha);
const cmd = `gh api repos/reginaldalfret/portfolio-website/statuses/${sha} -f state=success -f target_url=https://reginaldalfret.tech -f description="Production build ready" -f context="deployment/vercel"`;
const out = execSync(cmd).toString();
console.log('GitHub API response context:', JSON.parse(out).context, 'state:', JSON.parse(out).state);
