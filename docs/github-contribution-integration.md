# GitHub contribution integration

## What it does

The Open Source section is statically rendered from `data/open-source-contributions.json`. That file is the last-known-good snapshot, not a browser-side API cache. The existing Liquid Glass portfolio components continue to render from that dataset if GitHub is temporarily unavailable.

The sync job uses GitHub's official REST Search API and the query `author:reginaldalfret is:pr is:merged`. It paginates in batches of 100 search results and reads the `pull_request.merged_at` timestamp returned by each search result. The author, repository, canonical PR URL, closed state, and merge timestamp are validated before a record can be displayed. It uses the same REST path both locally and in GitHub Actions so results are not accidentally restricted by a repository-scoped GraphQL search context.

## What is retrieved

The generated records contain the canonical pull-request URL and title, repository name and URL, repository ecosystem label, author-confirmed merge timestamp, labels, and a concise description derived from the PR body or title. Existing curated summaries and card themes are preserved when matching known PRs. Metrics are derived from the data and count unique repositories and normalized ecosystems separately.

The script excludes the personal `reginaldalfret` repository owner, the `SierreTechnologies` project owner, and the configured OpenTelemetry/detekt exclusions. Edit `scripts/open-source-organizations.json` to adjust display-name normalization, excluded owners/repositories, logo keys, or ecosystem links. It intentionally treats unknown owners as ecosystem labels instead of assuming every name is a corporation.

## Refresh policy and caching

- GitHub Actions runs daily at **02:17 UTC** and can be started manually with `workflow_dispatch`.
- The workflow uses GitHub's built-in short-lived `GITHUB_TOKEN`; no permanent personal access token is required in repository secrets.
- With the workflow's `contents: write` permission, Actions commits `data/open-source-contributions.json` only when content changes. The repository's existing Vercel Git integration can then build/deploy that commit.
- There is no per-visitor API polling. The browser receives only the public, checked-in snapshot.
- API requests have timeouts and bounded retries. If the search fails completely, the script exits without touching the snapshot. The sync avoids one REST detail request per PR by using authoritative merge metadata already present in search results. Results with a missing `pull_request.merged_at` are skipped. Search API results have a 1,000-hit ceiling; if that ceiling is reached, the script logs a warning and never clears the existing dataset. A zero-eligible-record refresh is treated as a failure when an existing snapshot is present, so a broken query cannot silently report success.
- The workflow logs the number of verified PRs, distinct repositories, ecosystems, additions, metadata updates, and configured exclusions.

## Security and permissions

The integration reads public PR metadata only. No token is embedded in the website, generated JSON, or client-side bundles. GitHub Actions grants `contents: write` to the workflow solely because the job commits the generated data. Locally, `GITHUB_TOKEN` is optional; an unauthenticated REST refresh is supported but can hit GitHub's lower anonymous rate limit. Never add a browser-exposed token or a `NEXT_PUBLIC_GITHUB_TOKEN` variable.

## Local commands

Run from the repository root:

```bash
npm run test:open-source
npm run sync:open-source
npm run typecheck
npm run build
```

Set `GITHUB_TOKEN` in the local shell for authenticated REST searches and the higher API rate limit. The script also supports unauthenticated searches for smaller public datasets. A dry run that compares generated output without writing is available via:

```bash
node scripts/sync-open-source.mjs --check
```

The test suite uses mocked REST search responses and deterministic fixtures; it does not depend on a live GitHub request.

## Failure behavior and debugging

1. Start with the **Sync Open Source Contributions** workflow run logs.
2. For `403`/rate-limit errors during local REST fallback, wait for the limit reset or provide a token; the stored snapshot remains in place if a complete search cannot be retrieved.
3. Check the normalization/exclusion configuration if an ecosystem label or repository is unexpected.
4. Check whether the PR is actually merged and authored by `reginaldalfret`; closed-but-unmerged pull requests do not qualify.
5. Use `workflow_dispatch` for a manual refresh. The workflow does not submit a GitHub Developer Program application.

## GitHub Developer Program

The portfolio demonstrates a practical integration of the public GitHub API, pagination, data normalization, rate-limit-aware refresh, deterministic tests, and automation. Apply at https://github.com/developer/register. Program acceptance and any additional eligibility requirements are determined by GitHub and are not guaranteed by this implementation. For support, use the contact section at https://reginaldalfret.tech/#contact.
