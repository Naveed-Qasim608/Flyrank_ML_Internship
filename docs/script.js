/* ============================================================
   Content Refresh Prioritization — Research Site Script
   Pure vanilla JS. No external frameworks.
   ============================================================ */
(function () {
  'use strict';

  /* ---------------- Loading screen ---------------- */
  window.addEventListener('load', function () {
    var loader = document.getElementById('loading-screen');
    if (loader) {
      setTimeout(function () {
        loader.classList.add('hidden');
      }, 500);
    }
  });

  /* ---------------- Theme toggle ---------------- */
  var THEME_KEY = 'crp-theme-preference';
  var root = document.documentElement;

  function getStoredTheme() {
    try { return window.__crpTheme || null; } catch (e) { return null; }
  }
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    window.__crpTheme = theme;
  }
  (function initTheme() {
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  })();

  var themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------------- Mobile nav ---------------- */
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------- Sticky nav shadow + scroll spy ---------------- */
  var siteNav = document.getElementById('site-nav');
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));

  function onScroll() {
    if (siteNav) {
      siteNav.classList.toggle('scrolled', window.scrollY > 12);
    }
    updateScrollProgress();
    updateScrollTopButton();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if ('IntersectionObserver' in window && sections.length) {
    var spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navAnchors.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spyObserver.observe(s); });
  }

  /* ---------------- Scroll progress bar ---------------- */
  var progressBar = document.getElementById('scroll-progress');
  function updateScrollProgress() {
    if (!progressBar) return;
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  /* ---------------- Scroll to top ---------------- */
  var scrollTopBtn = document.getElementById('scroll-top');
  function updateScrollTopButton() {
    if (!scrollTopBtn) return;
    scrollTopBtn.classList.toggle('visible', window.scrollY > 700);
  }
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------------- Animated counters ---------------- */
  var counters = Array.prototype.slice.call(document.querySelectorAll('[data-counter]'));
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-counter'));
    var decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals'), 10) : 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1600;
    var startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = target * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target.toFixed(decimals) + suffix;
      }
    }
    window.requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && counters.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  /* ---------------- Animated bar fills ---------------- */
  var bars = Array.prototype.slice.call(document.querySelectorAll('.bar-fill'));
  if ('IntersectionObserver' in window && bars.length) {
    var barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          el.style.width = el.getAttribute('data-value') + '%';
          barObserver.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(function (el) { barObserver.observe(el); });
  }

  /* ---------------- Typing animation (hero kicker) ---------------- */
  var typedEl = document.getElementById('typed-text');
  if (typedEl) {
    var phrases = [
      'search intelligence',
      'explainable ML',
      'content decay signals',
      'refresh prioritization'
    ];
    var phraseIndex = 0, charIndex = 0, deleting = false;

    function typeLoop() {
      var current = phrases[phraseIndex];
      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          return setTimeout(typeLoop, 1400);
        }
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(typeLoop, deleting ? 35 : 55);
    }
    setTimeout(typeLoop, 900);
  }

  /* ---------------- Ambient particle background (hero only) ---------------- */
  var canvas = document.getElementById('ambient-canvas');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var PARTICLE_COUNT = window.innerWidth < 760 ? 26 : 50;
    var animationId;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resizeCanvas() {
      var parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }

    function initParticles() {
      particles = [];
      for (var i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.6 + 0.6,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          o: Math.random() * 0.4 + 0.15
        });
      }
    }

    function getAccentColor() {
      var theme = root.getAttribute('data-theme');
      return theme === 'dark' ? '109, 150, 238' : '36, 81, 179';
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var color = getAccentColor();
      particles.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + color + ', ' + p.o + ')';
        ctx.fill();
      });
      animationId = window.requestAnimationFrame(draw);
    }

    if (!reduceMotion) {
      resizeCanvas();
      initParticles();
      draw();
      window.addEventListener('resize', function () {
        resizeCanvas();
        initParticles();
      });
    }
  }

  /* ---------------- Smooth scroll for in-page anchors ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var offset = (document.getElementById('site-nav') || {}).offsetHeight || 72;
          var top = target.getBoundingClientRect().top + window.scrollY - offset + 1;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------------- Current year in footer ---------------- */
  var yearEl = document.getElementById('current-year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

})();
