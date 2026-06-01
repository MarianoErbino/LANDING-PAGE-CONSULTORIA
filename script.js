/* ============================================================
   SilverRiver Consulting — interactions
   ============================================================ */
(() => {
  'use strict';

  /* ---------- Splash / intro animation ---------- */
  const splash = document.getElementById('splash');
  const splashSkip = document.getElementById('splashSkip');
  const SPLASH_DURATION = 3600; // total ms, sincronizado con la animación CSS

  function dismissSplash() {
    if (!splash || splash.classList.contains('is-leaving')) return;
    splash.classList.add('is-leaving');
    document.body.classList.remove('has-splash');
    setTimeout(() => splash.remove(), 800);
  }

  if (splash) {
    // Si ya se mostró en esta sesión, saltar
    if (sessionStorage.getItem('sr_splash_shown') === '1') {
      splash.remove();
      document.body.classList.remove('has-splash');
    } else {
      sessionStorage.setItem('sr_splash_shown', '1');
      const timer = setTimeout(dismissSplash, SPLASH_DURATION);
      // Permitir saltar con botón o tecla
      if (splashSkip) splashSkip.addEventListener('click', () => { clearTimeout(timer); dismissSplash(); });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
          clearTimeout(timer); dismissSplash();
        }
      }, { once: true });
    }
  } else {
    document.body.classList.remove('has-splash');
  }

  /* ---------- Nav: shrink on scroll + mobile burger ---------- */
  const nav     = document.getElementById('nav');
  const burger  = document.getElementById('burger');
  const mobile  = document.getElementById('navMobile');

  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  onScroll();
  document.addEventListener('scroll', onScroll, { passive: true });

  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-mobile-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mobile.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      nav.classList.remove('is-mobile-open');
      burger.setAttribute('aria-expanded', 'false');
    })
  );

  /* ---------- Scroll reveal ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

  /* ---------- Counter animation ---------- */
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.to);
      const dur = 1400;
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent = target % 1 === 0 ? Math.round(val) : val.toFixed(1);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target % 1 === 0 ? target : target.toFixed(1);
      };
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.counter').forEach(el => counterIO.observe(el));

  /* ---------- Hero animated canvas (silver river particles) ---------- */
  const canvas = document.getElementById('heroCanvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];
    const PARTICLE_N = 60;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width  = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function init() {
      particles = [];
      for (let i = 0; i < PARTICLE_N; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.6 + 0.6,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // dots
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.55)';
        ctx.fill();
      }

      // connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.18 * (1 - d / 140)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();
    window.addEventListener('resize', () => { resize(); init(); });
  }

  /* ---------- Smooth scroll for in-page anchors (extra polish on older browsers) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = nav.offsetHeight - 8;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();
