# svandragt.github.io

A visual browser for all my GitHub Pages projects.

- `config.json`: excluded repos and row categories (matched against topics and description words)
- `scripts/build.mjs`: fetches Pages repos, screenshots each site, writes `data/sites.json` and `thumbs/` (generated, not committed)
- `.github/workflows/build.yml`: builds and deploys to Pages daily, on demand, and on every push to master

Local: `npm i playwright && npx playwright install chromium && GITHUB_TOKEN=... node scripts/build.mjs`, then serve the folder (add `--no-shots` to skip screenshots).

To include private repos that publish public Pages, add a `PAGES_TOKEN` repo secret: a fine-grained token with read-only **Metadata** access to all your repositories.
