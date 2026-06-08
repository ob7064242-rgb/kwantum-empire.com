/* ═══════════════════════════════════════════
   KWANTUM EMPIRE — script.js
   ═══════════════════════════════════════════ */

/* ── Lang data ─────────────────────────── */
const i18n = {
  fr: {
    nav_accueil: "Accueil", nav_services: "Services",
    nav_projets: "Projets", nav_apropos: "À propos",
    nav_blog: "Blog", nav_contact: "Contact",
    nav_cta: "Audit gratuit",
    hero_badge: "Agence marketing digital premium",
    hero_h1a: "FAITES PASSER",
    hero_h1b: "VOTRE MARQUE",
    hero_h1c: "DANS UNE AUTRE DIMENSION",
    hero_sub: "Stratégie digitale, performance & croissance mesurable — pour les marques qui veulent dominer leur marché.",
    hero_btn1: "Demander un audit gratuit",
    hero_btn2: "Voir nos réalisations",
    hero_scroll: "Défiler",
    stat1: "+230%", stat1_label: "De trafic moyen généré",
    stat2: "+20", stat2_label: "Clients satisfaits & fidèles",
    stat3: "+300K$", stat3_label: "Investis en formation & marketing",
    footer_copy: "© 2025 Kwantum Empire. Tous droits réservés.",
  },
  en: {
    nav_accueil: "Home", nav_services: "Services",
    nav_projets: "Projects", nav_apropos: "About",
    nav_blog: "Blog", nav_contact: "Contact",
    nav_cta: "Free Audit",
    hero_badge: "Premium digital marketing agency",
    hero_h1a: "TAKE YOUR",
    hero_h1b: "BRAND INTO",
    hero_h1c: "ANOTHER DIMENSION",
    hero_sub: "Digital strategy, performance & measurable growth — for brands that want to dominate their market.",
    hero_btn1: "Request a free audit",
    hero_btn2: "See our work",
    hero_scroll: "Scroll",
    stat1: "+230%", stat1_label: "Average traffic increase",
    stat2: "+20", stat2_label: "Satisfied clients",
    stat3: "+300K$", stat3_label: "Invested in growth",
    footer_copy: "© 2025 Kwantum Empire. All rights reserved.",
  }
};
let currentLang = 'fr';

function applyLang(lang) {
  const t = i18n[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });
}

document.querySelectorAll('.lang-toggle button').forEach(btn => {
  btn.addEventListener('click', () => {
    currentLang = btn.dataset.lang;
    document.querySelectorAll('.lang-toggle button').forEach(b => b.classList.toggle('active', b.dataset.lang === currentLang));
    applyLang(currentLang);
  });
});

/* ── Active nav ────────────────────────── */
(function() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
  });
})();

/* ── Header scroll ─────────────────────── */
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });
}

/* ── Hamburger ─────────────────────────── */
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    const s = hamburger.querySelectorAll('span');
    if (open) {
      s[0].style.transform = 'rotate(45deg) translate(4.5px, 4.5px)';
      s[1].style.opacity = '0';
      s[2].style.transform = 'rotate(-45deg) translate(4.5px, -4.5px)';
    } else {
      s.forEach(x => { x.style.transform = ''; x.style.opacity = ''; });
    }
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(x => { x.style.transform = ''; x.style.opacity = ''; });
    });
  });
}

/* ── Toast ─────────────────────────────── */
function showToast(msg, icon = 'fa-check-circle') {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast'; t.className = 'toast';
    document.body.appendChild(t);
  }
  t.innerHTML = `<i class="fa-solid ${icon}"></i> ${msg}`;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

/* ── Animated counters ─────────────────── */
function animateCounter(el, end, duration = 1800) {
  const startTime = performance.now();
  const isDecimal = String(end).includes('.');
  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const val = isDecimal ? (end * ease).toFixed(1) : Math.round(end * ease);
    el.textContent = el.dataset.prefix + val + el.dataset.suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function initCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const end = parseFloat(el.dataset.end);
    el.dataset.prefix = el.dataset.prefix || '';
    el.dataset.suffix = el.dataset.suffix || '';
    el.textContent = el.dataset.prefix + '0' + el.dataset.suffix;

    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounter(el, end);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
  });
}

/* ── Fade-in on scroll ─────────────────── */
function initFadeIn() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
}

/* ── Project filter ─────────────────────── */
function initProjectFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });
}

/* ── Contact form ───────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      const errEl = field.parentElement.querySelector('.form-error');
      if (!field.value.trim()) {
        valid = false;
        if (errEl) errEl.style.display = 'block';
        field.style.borderColor = '#ff6b6b';
      } else {
        if (errEl) errEl.style.display = 'none';
        field.style.borderColor = '';
        if (field.type === 'email') {
          const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
          if (!emailValid) {
            valid = false;
            if (errEl) { errEl.style.display = 'block'; errEl.textContent = 'Adresse email invalide'; }
            field.style.borderColor = '#ff6b6b';
          }
        }
      }
    });

    if (valid) {
      const success = document.getElementById('form-success');
      if (success) { success.style.display = 'block'; }
      showToast('Message envoyé avec succès !', 'fa-paper-plane');
      form.reset();
      setTimeout(() => { if (success) success.style.display = 'none'; }, 5000);
    }
  });

  // Clear error on input
  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', () => {
      const errEl = field.parentElement.querySelector('.form-error');
      if (errEl) errEl.style.display = 'none';
      field.style.borderColor = '';
    });
  });
}

/* ── Init all ───────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCounters();
  initFadeIn();
  initProjectFilter();
  initContactForm();
});
