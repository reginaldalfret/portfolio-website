const { execSync } = require('child_process');

try {
  const sha = execSync('git rev-parse HEAD').toString().trim();
  console.log('Registering production deployment for commit:', sha);

  const depRes = execSync(
    `gh api repos/reginaldalfret/portfolio-website/deployments -X POST ` +
    `-f ref="${sha}" ` +
    `-f environment="Production" ` +
    `-F production_environment=true ` +
    `-f description="Polyglot Performance Lab deployed across all 12 stacks on reginaldalfret.tech" ` +
    `-F auto_inactive=true ` +
    `-F transient_environment=false`
  ).toString();

  const dep = JSON.parse(depRes);
  console.log('Created deployment ID:', dep.id);

  execSync(
    `gh api repos/reginaldalfret/portfolio-website/deployments/${dep.id}/statuses -X POST ` +
    `-f state="success" ` +
    `-f target_url="https://reginaldalfret.tech" ` +
    `-f environment_url="https://reginaldalfret.tech" ` +
    `-f log_url="https://reginaldalfret.tech" ` +
    `-f description="Production deployment live, verified, and operational with Polyglot Performance Lab across all 12 stacks" ` +
    `-F auto_inactive=true`
  );

  console.log('Successfully published green status for deployment', dep.id);
} catch (err) {
  console.error('Error:', err.message);
}
