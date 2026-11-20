// Fetches all GitHub Pages repos for the configured user, writes data/sites.json
// and screenshots each site into thumbs/<name>.jpg.
// Usage: GITHUB_TOKEN=... node scripts/build.mjs [--no-shots]
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const config = JSON.parse(await readFile(new URL('config.json', root), 'utf8'));
const token = process.env.GITHUB_TOKEN;
const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'pages-browser',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

async function gh(path) {
  const res = await fetch(`https://api.github.com/${path}`, { headers });
  if (!res.ok) throw new Error(`${res.status} ${path}`);
  return res.json();
}

async function listRepos() {
  if (process.env.REPOS_FILE) return JSON.parse(await readFile(process.env.REPOS_FILE, 'utf8'));
  const repos = [];
  try {
    for (let page = 1; ; page++) {
      const batch = await gh(`users/${config.user}/repos?per_page=100&page=${page}&type=owner`);
      repos.push(...batch);
      if (batch.length < 100) break;
    }
  } catch (e) {
    console.warn(`repo list failed (${e.message}), falling back to search`);
    repos.length = 0;
    for (let page = 1; ; page++) {
      const { items } = await gh(`search/repositories?q=user:${config.user}+fork:true&per_page=100&page=${page}`);
      repos.push(...items);
      if (items.length < 100) break;
    }
  }
  return repos;
}

function categorise(repo) {
  const stem = (w) => w.toLowerCase().replace(/s$/, '');
  const hay = new Set([...(repo.topics || []), ...(repo.description || '').split(/\W+/)].map(stem));
  for (const row of config.rows) {
    if (row.match.some((m) => hay.has(stem(m)))) return row.id;
  }
  return config.rows[config.rows.length - 1].id;
}

// The API's has_pages flag is unreliable, so probe each repo's Pages URL directly.
const pagesUrl = (r) => `https://${config.user}.github.io/${r.name}/`;
// Only a confirmed 404 excludes a repo; inconclusive results retry, then fall back to has_pages.
async function hasLivePages(r) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(pagesUrl(r), { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(15000) });
      if (res.ok) return true;
      if (res.status === 404) return false;
    } catch {}
    await new Promise((done) => setTimeout(done, 1000 * (attempt + 1)));
  }
  return Boolean(r.has_pages);
}
const all = (await listRepos()).filter((r) => !r.archived && !config.exclude.includes(r.name));
const live = [];
for (let i = 0; i < all.length; i += 16) {
  const batch = all.slice(i, i + 16);
  const ok = await Promise.all(batch.map(hasLivePages));
  live.push(...batch.filter((_, j) => ok[j]));
}
console.log(`${all.length} repos, ${live.length} with live Pages`);
const repos = live.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

const sites = repos.map((r) => ({
  name: r.name,
  title: r.name.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  description: r.description || '',
  // GitHub redirects this to the custom domain when one is set; the final URL is recorded after navigation.
  url: pagesUrl(r),
  source: r.html_url,
  language: r.language,
  topics: r.topics || [],
  stars: r.stargazers_count,
  updated: r.pushed_at,
  category: categorise(r),
  thumb: null,
}));

if (!process.argv.includes('--no-shots')) {
  const { createRequire } = await import('node:module');
  const { chromium } = createRequire(import.meta.url)('playwright');
  await mkdir(new URL('thumbs/', root), { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  for (const site of sites) {
    try {
      // A failed navigation throws, so the catch below skips the screenshot.
      const res = await page.goto(site.url, { waitUntil: 'load', timeout: 30000 });
      await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
      if (res?.status() === 404) {
        site.broken = true;
        console.warn(`skip ${site.name}: 404`);
        continue;
      }
      site.url = res?.url() || site.url; // final HTTP redirect target, ignores client-side URL changes
      await page.waitForTimeout(2500);
      await page.screenshot({ path: fileURLToPath(new URL(`thumbs/${site.name}.jpg`, root)), type: 'jpeg', quality: 72 });
      console.log(`shot ${site.name}`);
    } catch (e) {
      console.warn(`shot failed ${site.name}: ${e.message}`);
    }
  }
  await browser.close();
}

for (const site of sites) {
  try {
    await access(new URL(`thumbs/${site.name}.jpg`, root));
    site.thumb = `thumbs/${site.name}.jpg`;
  } catch {}
}

const published = sites.filter((s) => !s.broken);

await mkdir(new URL('data/', root), { recursive: true });
await writeFile(
  new URL('data/sites.json', root),
  JSON.stringify({ generated: new Date().toISOString(), rows: config.rows.map(({ id, title }) => ({ id, title })), sites: published }, null, 2) + '\n'
);
console.log(`wrote ${published.length} sites`);
