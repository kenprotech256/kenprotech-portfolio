/* ============================================================
   KENPRO STUDIO — interactions
   ============================================================ */
(function () {
  'use strict';

  var WA_NUMBER = '256702381857';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Lucide icons ---- */
  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  /* ---- Nav: solid on scroll ---- */
  function initNav() {
    var nav = document.getElementById('nav');
    if (!nav) return;
    function onScroll() {
      if (window.scrollY > 24) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* active link */
    var page = window.location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('.nav-links a, .nav-drawer-links a');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href') || '';
      if (href === page || (page === '' && href === 'index.html')) {
        links[i].classList.add('active');
      }
    }
  }

  /* ---- Mobile drawer ---- */
  function initDrawer() {
    var toggle = document.getElementById('navToggle');
    var drawer = document.getElementById('navDrawer');
    if (!toggle || !drawer) return;

    function close() {
      drawer.classList.remove('open');
      toggle.classList.remove('open');
      document.body.style.overflow = '';
    }
    toggle.addEventListener('click', function () {
      var open = drawer.classList.toggle('open');
      toggle.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    var dlinks = drawer.querySelectorAll('a');
    for (var i = 0; i < dlinks.length; i++) {
      dlinks[i].addEventListener('click', close);
    }
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ---- Scroll reveal ---- */
  function initReveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (reduce || !('IntersectionObserver' in window)) {
      for (var i = 0; i < els.length; i++) els[i].classList.add('in');
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        setTimeout(function () { el.classList.add('in'); }, delay);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    for (var j = 0; j < els.length; j++) io.observe(els[j]);
  }

  /* ---- Stat counters ---- */
  function initCounters() {
    var nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;
    if (reduce || !('IntersectionObserver' in window)) {
      for (var i = 0; i < nums.length; i++) {
        nums[i].textContent = nums[i].getAttribute('data-count') + (nums[i].getAttribute('data-suffix') || '');
      }
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var dur = 1400, start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = target % 1 !== 0 ? (target * eased).toFixed(1) : Math.round(target * eased);
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    for (var k = 0; k < nums.length; k++) io.observe(nums[k]);
  }

  /* ---- Subtle parallax on hero visual ---- */
  function initParallax() {
    if (reduce) return;
    var el = document.querySelector('[data-parallax]');
    if (!el) return;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < window.innerHeight) {
          el.style.transform = 'translateY(' + (y * 0.05) + 'px)';
        }
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---- Contact form -> WhatsApp ---- */
  function initForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var get = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var name = get('fName'), email = get('fEmail'), service = get('fService'), budget = get('fBudget'), msg = get('fMessage');

      var text = 'Hello Ken — I came through the KENPRO studio site.\n\n';
      if (name) text += 'Name: ' + name + '\n';
      if (email) text += 'Email: ' + email + '\n';
      if (service) text += 'Project: ' + service + '\n';
      if (budget) text += 'Budget: ' + budget + '\n';
      if (msg) text += '\n' + msg;

      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text), '_blank', 'noopener');

      var success = document.getElementById('formSuccess');
      if (success) { form.style.display = 'none'; success.classList.add('show'); initIcons(); }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initIcons();
    initNav();
    initDrawer();
    initReveal();
    initCounters();
    initParallax();
    initForm();
  });
})();
