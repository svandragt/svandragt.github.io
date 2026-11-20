# svandragt.github.io

A visual browser for all my GitHub Pages projects.

- `config.json`: excluded repos and row categories (matched against topics and description words)
- `scripts/build.mjs`: fetches Pages repos, screenshots each site, writes `data/sites.json` and `thumbs/`
- `.github/workflows/build.yml`: runs the build daily, on demand, and when config/scripts change

Local: `npm i playwright && npx playwright install chromium && GITHUB_TOKEN=... node scripts/build.mjs`, then serve the folder (add `--no-shots` to skip screenshots).
