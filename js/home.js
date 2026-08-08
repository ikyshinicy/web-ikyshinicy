/* ============================================================
   home.js — Rizky Reranza homepage logic
   ============================================================ */

// ---- Inline Lucide-style icon set ----
const ICONS = {
  camera: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/></svg>',
  book: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  globe: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  palette: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="1.2"/><circle cx="17.5" cy="10.5" r="1.2"/><circle cx="8.5" cy="7.5" r="1.2"/><circle cx="6.5" cy="12.5" r="1.2"/><path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.3-.5-.7-.5-1.2a2 2 0 0 1 2-2h1.5A4.5 4.5 0 0 0 22 11c0-5-4.5-9-10-9z"/></svg>',
  calendar: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  arrow: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'
};

const PROJECT_ICONS = [
  { icon: 'camera', bg: '#EDE7FB', fg: '#6C4BE6' },
  { icon: 'book',   bg: '#DDF3E4', fg: '#10B981' },
  { icon: 'globe',  bg: '#D9EAFC', fg: '#1B6EF3' }
];

function init() {
  const d = (typeof SITE_DATA !== 'undefined') ? SITE_DATA : null;
  if (!d) return;

  // Hero bio + stats
  const bioEl = document.getElementById('hero-bio');
  if (bioEl && d.profile && d.profile.bio) bioEl.textContent = d.profile.bio;
  setText('stat-projects', d.projects.length + '+');
  setText('stat-gallery', d.galleryprompt.length + '+');
  setText('stat-services', String(d.services.length));

  const ctaEmail = document.getElementById('cta-email');
  if (ctaEmail && d.profile.email) ctaEmail.href = 'mailto:' + d.profile.email;
  setText('footer-copy', '© 2026 ' + d.profile.name + '. All rights reserved.');

  // ---- Projects preview (3 featured) ----
  const featured = d.projects.filter(p => p.featured).slice(0, 3);
  const projList = featured.length ? featured : d.projects.slice(0, 3);
  document.getElementById('projects-preview').innerHTML = projList.map((p, i) => {
    const ic = PROJECT_ICONS[i % PROJECT_ICONS.length];
    return `
    <a href="projects.html" class="project-card">
      <span class="project-ic" style="background:${ic.bg};color:${ic.fg}">${ICONS[ic.icon]}</span>
      <div class="project-cat">${p.category} · ${p.year || '2026'}</div>
      <div class="project-title">${p.title}</div>
      <div class="project-desc">${p.desc || ''}</div>
      <span class="project-link">Lihat Project ${ICONS.arrow}</span>
    </a>`;
  }).join('');

  // ---- Gallery preview (4 random) ----
  const galleryPreview = [...d.galleryprompt].sort(() => Math.random() - 0.5).slice(0, 4);
  window.GALLERY_ITEMS = galleryPreview;
  document.getElementById('gallery-preview').innerHTML = galleryPreview.map((g, i) => `
    <div class="gallery-card" onclick="openLightbox(${i})" role="button" tabindex="0" onkeydown="if(event.key==='Enter')openLightbox(${i})">
      <div class="gallery-img">${g.image ? `<img src="${g.image}" alt="${g.title}" loading="lazy" onerror="this.style.display='none'">` : ''}</div>
      <div class="gallery-body">
        <div class="gallery-cat">${g.category || 'ChatGPT'}</div>
        <div class="gallery-title">${g.title}</div>
      </div>
    </div>`).join('');

  // ---- Services (3 core) ----
  document.getElementById('services-grid').innerHTML = `
    <a href="jasa-website.html" class="service-card">
      <span class="service-ic" style="background:#D9EAFC;color:#1B6EF3">${ICONS.globe}</span>
      <div class="service-title">Jasa Buat Website</div>
      <div class="service-desc">Landing page, website UMKM, hingga company profile. Custom dari nol, bukan template.</div>
      <span class="service-link">Lihat Layanan ${ICONS.arrow}</span>
    </a>
    <a href="service.html" class="service-card">
      <span class="service-ic" style="background:#FBE0EC;color:#C23370">${ICONS.palette}</span>
      <div class="service-title">Jasa Design</div>
      <div class="service-desc">AI visual, prompt assets, poster, dan identitas digital yang estetik dan unik.</div>
      <span class="service-link">Lihat Layanan ${ICONS.arrow}</span>
    </a>
    <a href="jasa-sewa.html" class="service-card">
      <span class="service-ic" style="background:#EDE7FB;color:#6C4BE6">${ICONS.calendar}</span>
      <div class="service-title">Sewa Web</div>
      <div class="service-desc">Website siap pakai tanpa ribet domain & hosting. Bayar bulanan, langsung online.</div>
      <span class="service-link">Lihat Layanan ${ICONS.arrow}</span>
    </a>`;
}

function setText(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }

// ---- Scroll reveal ----
const observer = new IntersectionObserver(els => {
  els.forEach(el => { if (el.isIntersecting) el.target.classList.add('visible'); });
}, { threshold: 0.08 });

// ---- Mobile menu ----
function toggleMenu() { document.getElementById('main-nav').classList.toggle('open'); }

// ---- Background music (reff loop) ----
const REFF_START = 145, REFF_END = 205;
const music = document.getElementById('bg-music');
if (music) {
  music.volume = 0.3;
  music.addEventListener('timeupdate', () => {
    if (music.currentTime >= REFF_END || music.currentTime < REFF_START) music.currentTime = REFF_START;
  });
  setInterval(() => { if (!music.paused) sessionStorage.setItem('musicTime', music.currentTime); }, 1000);
  window.addEventListener('beforeunload', () => sessionStorage.setItem('musicTime', music.currentTime));
  music.addEventListener('play', updateMusicBtn);
  music.addEventListener('pause', updateMusicBtn);
}
function prepareMusic() {
  const saved = parseFloat(sessionStorage.getItem('musicTime') || '0');
  music.currentTime = (saved >= REFF_START && saved < REFF_END) ? saved : REFF_START;
}
function updateMusicBtn() {
  const btn = document.getElementById('music-btn');
  if (!btn) return;
  const playing = !music.paused;
  const play = btn.querySelector('.play-icon'), pause = btn.querySelector('.pause-icon');
  const indicator = btn.querySelector('.music-indicator');
  if (play) play.style.display = playing ? 'none' : 'block';
  if (pause) pause.style.display = playing ? 'block' : 'none';
  if (indicator) indicator.style.background = playing ? 'var(--sky)' : 'var(--white)';
}
function toggleMusic() {
  if (!music) return;
  if (music.paused) { prepareMusic(); music.play().catch(() => {}); sessionStorage.setItem('musicStarted', 'true'); }
  else { music.pause(); sessionStorage.removeItem('musicStarted'); }
}

// ---- Support bar (footer) ----
fetch('partials/support-section.html').then(r => r.text()).then(html => {
  const el = document.getElementById('support-section');
  if (el) el.innerHTML = html;
}).catch(() => {});

// ---- Boot ----
init();
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
if (music && sessionStorage.getItem('musicStarted')) { prepareMusic(); music.play().catch(() => {}); }

// ---- Gallery Lightbox ----
let _lbCurrent = null;
function openLightbox(i) {
  const items = window.GALLERY_ITEMS || [];
  const g = items[i];
  if (!g) return;
  _lbCurrent = g;
  const img = document.getElementById('lb-img');
  img.src = g.image || '';
  img.alt = g.title || '';
  document.getElementById('lb-cat').textContent = g.category || 'ChatGPT';
  document.getElementById('lb-title').textContent = g.title || '';
  document.getElementById('lb-prompt').textContent = g.prompt || 'Prompt tidak tersedia.';
  const copyTxt = document.getElementById('lb-copy-txt');
  const copyBtn = document.getElementById('lb-copy');
  if (copyTxt) copyTxt.textContent = 'Copy Prompt';
  if (copyBtn) copyBtn.classList.remove('copied');
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function copyPrompt() {
  if (!_lbCurrent) return;
  const text = _lbCurrent.prompt || '';
  const done = () => {
    const t = document.getElementById('lb-copy-txt');
    const b = document.getElementById('lb-copy');
    if (t) t.textContent = 'Copied!';
    if (b) b.classList.add('copied');
    setTimeout(() => { if (t) t.textContent = 'Copy Prompt'; if (b) b.classList.remove('copied'); }, 1800);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  } else { fallbackCopy(text, done); }
}
function fallbackCopy(text, cb) {
  const ta = document.createElement('textarea');
  ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); } catch (e) {}
  document.body.removeChild(ta); cb();
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ---- Scroll doodles: reveal on view + subtle parallax ----
(function () {
  const doodles = Array.from(document.querySelectorAll('.scroll-doodle'));
  if (!doodles.length) return;
  const revealObs = new IntersectionObserver(els => {
    els.forEach(el => { if (el.isIntersecting) el.target.classList.add('in'); });
  }, { threshold: 0.2 });
  doodles.forEach((d, i) => {
    d.dataset.speed = (i % 2 === 0) ? '0.06' : '-0.05';
    d.dataset.base = d.getBoundingClientRect().top + window.scrollY;
    revealObs.observe(d);
  });
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      doodles.forEach(d => {
        if (!d.classList.contains('in')) return;
        const speed = parseFloat(d.dataset.speed || '0');
        const base = parseFloat(d.dataset.base || '0');
        const offset = (y - base) * speed;
        d.style.transform = 'translateY(' + offset.toFixed(1) + 'px)';
      });
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
})();
