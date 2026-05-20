/* ============================================================
   SPIC MACAY — Shared JavaScript Engine
   Handles: Nav, Drawer, Scroll Reveal, Countdown,
            Stat Counter, Toast, Progress Bar
   ============================================================ */

'use strict';

/* ── DOM Ready ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initDrawer();
  initScrollReveal();
  initCountdown();
  initStatCounters();
  initProgressBar();
  initFooterGrid();
});

/* ── Navigation: shrink on scroll ───────────────────────── */
function initNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 60) {
      nav.style.paddingBlock = '10px';
    } else {
      nav.style.paddingBlock = '';
    }
    lastY = y;
  }, { passive: true });
}

/* ── Mobile Drawer ───────────────────────────────────────── */
function initDrawer() {
  const overlay  = document.getElementById('drawerOverlay');
  const drawer   = document.getElementById('mobileDrawer');
  const menuBtn  = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('drawerClose');
  if (!overlay || !drawer || !menuBtn) return;

  function open() {
    overlay.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    overlay.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', open);
  overlay.addEventListener('click', close);
  if (closeBtn) closeBtn.addEventListener('click', close);

  // close on link click
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
}

/* ── Scroll Reveal ───────────────────────────────────────── */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
}

/* ── Countdown Timer ─────────────────────────────────────── */
function initCountdown() {
  const days  = document.getElementById('cdDays');
  const hours = document.getElementById('cdHours');
  const mins  = document.getElementById('cdMins');
  const secs  = document.getElementById('cdSecs');
  if (!days) return;

  const target = new Date('2026-05-25T06:00:00+05:30').getTime();

  function tick() {
    const now  = Date.now();
    const diff = target - now;
    if (diff <= 0) {
      days.textContent = hours.textContent = mins.textContent = secs.textContent = '00';
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    days.textContent  = String(d).padStart(2, '0');
    hours.textContent = String(h).padStart(2, '0');
    mins.textContent  = String(m).padStart(2, '0');
    secs.textContent  = String(s).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);
}

/* ── Stat Counters (animated on reveal) ─────────────────── */
function initStatCounters() {
  const cells = document.querySelectorAll('[data-target]');
  if (!cells.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const suffix = el.dataset.suffix || '';
      let start = 0;
      const duration = 1800;
      const step = target / (duration / 16);
      function update() {
        start = Math.min(start + step, target);
        el.textContent = Math.floor(start) + suffix;
        if (start < target) requestAnimationFrame(update);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(update);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  cells.forEach(c => io.observe(c));
}

/* ── Reading Progress Bar ────────────────────────────────── */
function initProgressBar() {
  const bar = document.getElementById('progressBar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
  }, { passive: true });
}

/* ── Footer Grid: responsive columns ────────────────────── */
function initFooterGrid() {
  const grid = document.querySelector('.footer-grid');
  if (!grid) return;
  function update() {
    grid.style.gridTemplateColumns = window.innerWidth >= 768 ? 'repeat(3,1fr)' : '1fr';
  }
  update();
  window.addEventListener('resize', update, { passive: true });
}

/* ── Toast Notification ──────────────────────────────────── */
window.showToast = function(msg, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  const icon = type === 'success' ? '✓' : '✕';
  toast.className = 'toast toast-' + type;
  toast.innerHTML = `<span style="font-size:1.1rem;">${icon}</span><span style="font-size:0.9rem;">${msg}</span>`;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });
  setTimeout(() => toast.classList.remove('show'), 4000);
};

/* ── Newsletter Subscribe ────────────────────────────────── */
window.subscribeNewsletter = function() {
  const input = document.getElementById('newsletterEmail');
  if (!input) return;
  const email = input.value.trim();
  if (!email || !email.includes('@')) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }
  input.value = '';
  showToast('Thank you! You\'ve been added to our newsletter.', 'success');
};

/* ── Smooth anchor scroll ────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
