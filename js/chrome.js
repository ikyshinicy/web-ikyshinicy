/* ============================================================
   chrome.js — Injects consistent header + footer on inner pages
   ============================================================ */
(function () {
  var path = (location.pathname.split('/').pop() || 'index.html');
  if (path === '') path = 'index.html';
  var NAV = [
    ['index.html', 'Home'],
    ['projects.html', 'Projects'],
    ['galleryprompt.html', 'Gallery Prompt'],
    ['service.html', 'Service'],
    ['about.html', 'About']
  ];
  var PLAY = '<img src="assets/img/1779092530823-ikyshinicy-logo-final_zl52lm.webp" alt="Iky Shinicy logo"/>';
  var ARROW = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

  function build() {
    var header = document.querySelector('header');
    if (header) {
      header.innerHTML =
        '<a href="index.html" class="logo"><span class="logo-dot">' + PLAY + '</span> Rizky Reranza</a>' +
        '<nav id="main-nav">' +
        NAV.map(function (n) { return '<a href="' + n[0] + '"' + (n[0] === path ? ' class="active"' : '') + '>' + n[1] + '</a>'; }).join('') +
        '</nav>' +
        '<div class="header-right" style="display:flex;align-items:center;gap:12px;">' +
        '<a href="about.html" class="nav-cta">Contact Me ' + ARROW + '</a>' +
        '<div class="menu-btn" onclick="document.getElementById(\'main-nav\').classList.toggle(\'open\')"><span></span><span></span><span></span></div>' +
        '</div>';
    }

    var footer = document.querySelector('footer');
    if (footer) {
      footer.className = 'site-footer';
      footer.removeAttribute('style');
      footer.innerHTML =
        '<div class="sf-inner">' +
          '<div class="sf-brand">' +
            '<div class="sf-logo"><span class="logo-dot">' + PLAY + '</span> Rizky Reranza</div>' +
            '<p>Creative Systems Builder<br>Human-Led AI Creation</p>' +
          '</div>' +
          '<div class="sf-col"><h4>Navigation</h4>' +
            NAV.map(function (n) { return '<a href="' + n[0] + '">' + n[1] + '</a>'; }).join('') +
          '</div>' +
          '<div class="sf-col"><h4>Connect</h4><div class="sf-social">' +
            '<a href="https://instagram.com/ikyshinicy" target="_blank" rel="noopener" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg></a>' +
            '<a href="https://www.youtube.com/@ikyshinicy" target="_blank" rel="noopener" aria-label="YouTube"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor"/></svg></a>' +
            '<a href="https://www.tiktok.com/@ikyshinicy" target="_blank" rel="noopener" aria-label="TikTok"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg></a>' +
          '</div></div>' +
        '</div>' +
        '<div class="sf-bottom"><span>© 2026 Rizky Reranza. All rights reserved.</span></div>';
    }

    // Give page hero accent words a playful brush style
    document.querySelectorAll('.page-hero h1 span, .hero h1 span, .about-name span, .about-alias').forEach(function (el) {
      el.classList.add('brush-word');
    });

    // Tag body for scoped theming
    document.body.setAttribute('data-page', path.replace('.html', ''));

    // ---- Organic wave dividers (match Home design system) ----
    var CFG = {
      'projects.html':      { atmo: '#E1EFFB', heroBg: '#F7F1E8', hero: '.page-hero' },
      'project-category.html': { atmo: '#E1EFFB', heroBg: '#F7F1E8', hero: '.page-hero' },
      'galleryprompt.html': { atmo: '#E9E4F8', heroBg: '#F7F1E8', hero: '.page-hero' },
      'service.html':       { atmo: '#FBF3E7', heroBg: '#FCE7C9', hero: '.hero' },
      'about.html':         { atmo: '#F7F1E8', heroBg: null,      hero: '.about-hero' }
    };
    var P1 = 'M0,64 C240,120 480,20 720,54 C960,88 1200,38 1440,72 L1440,120 L0,120 Z';
    var P2 = 'M0,50 C280,110 500,10 760,56 C1020,102 1220,26 1440,70 L1440,120 L0,120 Z';
    function makeWave(fill, over, pathD) {
      var w = document.createElement('div');
      w.className = 'page-wave';
      if (over) w.style.background = over;
      w.innerHTML = '<svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="' + pathD + '" fill="' + fill + '"></path></svg>';
      return w;
    }
    var cfg = CFG[path];
    if (cfg) {
      if (footer) footer.parentNode.insertBefore(makeWave('#0E0E0E', cfg.atmo, P2), footer);
      if (cfg.heroBg) {
        var heroEl = document.querySelector(cfg.hero);
        if (heroEl) heroEl.insertAdjacentElement('afterend', makeWave(cfg.atmo, cfg.heroBg, P1));
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
