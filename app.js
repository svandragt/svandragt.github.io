const $ = (s, el = document) => el.querySelector(s);
const esc = (s = '') => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// Deterministic gradient placeholder per project name.
function gradient(name) {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) % 360;
  return `linear-gradient(135deg, hsl(${h} 70% 35%), hsl(${(h + 60) % 360} 70% 18%))`;
}

function relDate(iso) {
  const days = Math.round((Date.now() - new Date(iso)) / 864e5);
  if (days < 1) return 'today';
  if (days < 2) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  if (days < 365) return `${Math.round(days / 30)} months ago`;
  return `${Math.round(days / 365)} years ago`;
}

const isNew = (s) => Date.now() - new Date(s.updated) < 7 * 864e5;

function card(site, i) {
  const ph = gradient(site.name);
  return `<button class="card" style="--i:${i};--ph:${ph}" data-name="${esc(site.name)}" aria-label="${esc(site.title)}: ${esc(site.description)}">
    <div class="ph"></div>
    ${site.thumb ? `<img src="${esc(site.thumb)}" alt="" decoding="async">` : ''}
    ${isNew(site) ? '<span class="badge">Updated</span>' : ''}
    <div class="label"><strong>${esc(site.title)}</strong><span>${esc(site.description)}</span></div>
  </button>`;
}

function row(title, sites) {
  if (!sites.length) return '';
  return `<section class="row" aria-label="${esc(title)}">
    <h2>${esc(title)}<small>${sites.length}</small></h2>
    <div class="track-wrap">
      <button class="arrow prev" aria-label="Scroll left" tabindex="-1"><svg viewBox="0 0 24 24"><path d="m15 5-7 7 7 7"/></svg></button>
      <div class="track">${sites.map(card).join('')}</div>
      <button class="arrow next" aria-label="Scroll right" tabindex="-1"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></button>
    </div>
  </section>`;
}

function hero(site) {
  const el = $('#hero');
  el.innerHTML = `
    <div class="hero-bg" style="background-image:${site.thumb ? `url('${esc(site.thumb)}'), ` : ''}${gradient(site.name)}"></div>
    <div class="hero-content">
      <span class="eyebrow"><b>S</b> Latest project</span>
      <h1>${esc(site.title)}</h1>
      <p>${esc(site.description)}</p>
      <div class="actions">
        <a class="btn primary" href="${esc(site.url)}"><svg viewBox="0 0 24 24"><path d="M7 4v16l13-8z"/></svg>Visit</a>
        <button class="btn ghost" data-name="${esc(site.name)}"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>More info</button>
      </div>
    </div>`;
}

// Detail dialog
const dialog = $('#detail');
function openDetail(site, trigger) {
  dialog.style.setProperty('--ph', gradient(site.name));
  $('#d-img').src = site.thumb || '';
  $('#d-title').textContent = site.title;
  $('#d-desc').textContent = site.description || 'No description yet.';
  $('#d-visit').href = site.url;
  $('#d-source').hidden = !site.source;
  if (site.source) $('#d-source').href = site.source;
  $('#d-meta').innerHTML = [
    isNew(site) ? '<b>New update</b>' : '',
    site.language && esc(site.language),
    `Updated ${relDate(site.updated)}`,
    site.stars ? `★ ${site.stars}` : '',
  ].filter(Boolean).join(' · ');
  $('#d-tags').innerHTML = site.topics.map((t) => `<li>${esc(t)}</li>`).join('');
  dialog._trigger = trigger;
  dialog.showModal();
  $('#d-visit').focus();
}
function closeDetail() {
  if (!dialog.open || dialog.classList.contains('closing')) return;
  dialog.classList.add('closing');
  setTimeout(() => {
    dialog.classList.remove('closing');
    dialog.close();
    dialog._trigger?.focus({ preventScroll: true });
  }, 240);
}
dialog.addEventListener('cancel', (e) => { e.preventDefault(); closeDetail(); });
dialog.addEventListener('click', (e) => { if (e.target === dialog) closeDetail(); });
$('#d-close').addEventListener('click', closeDetail);

// Arrows
function wireTrack(wrap) {
  const track = $('.track', wrap);
  const prev = $('.prev', wrap), next = $('.next', wrap);
  const update = () => {
    prev.disabled = track.scrollLeft < 8;
    next.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 8;
  };
  prev.onclick = () => track.scrollBy({ left: -track.clientWidth * 0.85, behavior: 'smooth' });
  next.onclick = () => track.scrollBy({ left: track.clientWidth * 0.85, behavior: 'smooth' });
  track.addEventListener('scroll', update, { passive: true });
  new ResizeObserver(update).observe(track);
  update();
}

// Keyboard: arrow keys move between cards and rows.
function onKey(e) {
  const cardEl = e.target.closest?.('.card');
  if (!cardEl || dialog.open) return;
  const container = cardEl.parentElement;
  const cards = [...container.children];
  const i = cards.indexOf(cardEl);
  let target;
  if (container.classList.contains('track')) {
    if (e.key === 'ArrowRight') target = cards[i + 1];
    if (e.key === 'ArrowLeft') target = cards[i - 1];
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const rows = [...document.querySelectorAll('#rows .track')];
      const r = rows[rows.indexOf(container) + (e.key === 'ArrowDown' ? 1 : -1)];
      if (r) target = r.children[Math.min(i, r.children.length - 1)];
    }
  } else {
    const cols = getComputedStyle(container).gridTemplateColumns.split(' ').length;
    const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols }[e.key];
    if (step) target = cards[i + step];
  }
  if (target) {
    e.preventDefault();
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  }
}

async function main() {
  const data = await (await fetch('data/sites.json', { cache: 'no-cache' })).json();
  const sites = data.sites;
  const byName = new Map(sites.map((s) => [s.name, s]));

  if (!sites.length) {
    $('#hero').hidden = true;
    $('#rows').innerHTML = '<p style="padding:120px var(--gutter)">No projects yet.</p>';
    return;
  }
  hero(sites[0]);
  const rowsHtml = [
    row('Recently updated', sites.slice(0, 10)),
    ...data.rows.map((r) => row(r.title, sites.filter((s) => s.category === r.id))),
    row('All projects', [...sites].sort((a, b) => a.title.localeCompare(b.title))),
  ];
  $('#rows').innerHTML = rowsHtml.join('');
  document.querySelectorAll('.row').forEach((r, i) => (r.style.animationDelay = `${0.2 + i * 0.1}s`));
  document.querySelectorAll('.track-wrap').forEach(wireTrack);
  $('#generated').textContent = `${sites.length} projects · refreshed ${relDate(data.generated)}`;

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-name]');
    if (t) openDetail(byName.get(t.dataset.name), t);
  });
  document.addEventListener('keydown', onKey);

  // Search
  const q = $('#q'), results = $('#results'), rows = $('#rows'), heroEl = $('#hero');
  q.addEventListener('input', () => {
    const term = q.value.trim().toLowerCase();
    const searching = term.length > 0;
    results.hidden = !searching;
    rows.hidden = heroEl.hidden = searching;
    if (!searching) return;
    const hits = sites.filter((s) =>
      [s.name, s.title, s.description, s.language, ...s.topics].join(' ').toLowerCase().includes(term));
    results.innerHTML = `<h2>Results for “${esc(q.value.trim())}”</h2>` +
      (hits.length ? `<div class="grid">${hits.map(card).join('')}</div>` : '<p class="empty">No projects match.</p>');
    window.scrollTo({ top: 0 });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== q && !dialog.open) { e.preventDefault(); q.focus(); }
  });

  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('solid', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

main().catch((err) => {
  $('#rows').innerHTML = `<p style="padding:120px var(--gutter)">Couldn't load projects: ${esc(err.message)}</p>`;
});
