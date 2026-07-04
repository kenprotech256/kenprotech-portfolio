/* ============================================================
   KenPro Tech — shared interactions
   Mobile nav · scroll reveals · WhatsApp contact form
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Mobile nav ── */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Scroll reveals ── */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ── WhatsApp contact form (pricing page) ── */
  var form = document.getElementById('waForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var contact = form.contact.value.trim();
      var type = form.type.value;
      var message = form.message.value.trim();
      var text =
        'Hi KenPro Tech, my name is ' + name + '.\n' +
        'Project type: ' + type + '\n' +
        'Reach me on: ' + contact + '\n\n' +
        message;
      window.open('https://wa.me/256702381857?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });
  }
})();
