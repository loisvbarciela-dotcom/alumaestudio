/* ALUMA — Versión B «Tu película primero»
   JavaScript mínimo, sin dependencias. Todo funciona sin él salvo la fachada de YouTube. */
(function () {
  'use strict';

  var doc = document;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Cabecera: estado al hacer scroll + menú móvil ---------- */
  var header = doc.querySelector('.header');
  var menuBtn = doc.querySelector('.menu-btn');
  var menu = doc.getElementById('menu-movil');

  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    if (!menuBtn || !menu) return;
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.classList.toggle('is-open', open);
    menuBtn.querySelector('span:last-child').textContent = open ? 'Cerrar' : 'Menú';
  }
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menuBtn.focus();
      }
    });
  }

  /* ---------- Imágenes remotas: si no cargan, se muestra el placeholder ---------- */
  function markMissing(img) {
    var host = img.closest('[data-remote]');
    if (host) host.classList.add('is-missing');
  }
  Array.prototype.forEach.call(doc.querySelectorAll('[data-remote] img'), function (img) {
    img.addEventListener('error', function () { markMissing(img); });
    if (img.complete && img.naturalWidth === 0) markMissing(img);
  });

  /* ---------- Fachada de YouTube (youtube-nocookie, solo al pulsar) ---------- */
  Array.prototype.forEach.call(doc.querySelectorAll('.facade[data-video]'), function (facade) {
    var play = facade.querySelector('.facade__play');
    if (!play) return;
    play.addEventListener('click', function () {
      var id = facade.getAttribute('data-video');
      var title = facade.getAttribute('data-title') || 'Película';
      var iframe = doc.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
      iframe.title = title;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      facade.appendChild(iframe);
      facade.classList.add('is-playing');
      play.remove();
    });
  });

  /* ---------- Tabs accesibles (Universos) ---------- */
  Array.prototype.forEach.call(doc.querySelectorAll('[data-tabs]'), function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    var panels = Array.prototype.slice.call(root.querySelectorAll('[role="tabpanel"]'));
    if (!tabs.length) return;

    function activate(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
      });
      panels.forEach(function (p) {
        p.hidden = p.id !== tab.getAttribute('aria-controls');
      });
      if (focus) tab.focus();
      // Mantener la pestaña activa a la vista en móvil (lista desplazable)
      if (tab.scrollIntoView && !reduceMotion) {
        try { tab.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' }); } catch (err) { /* sin soporte */ }
      }
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { activate(tab, false); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
        else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === 'Home') next = tabs[0];
        else if (e.key === 'End') next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); activate(next, true); }
      });
    });
  });

  /* ---------- «Empezar en este universo»: preselecciona el universo en el formulario ---------- */
  var universeSelect = doc.getElementById('f-universo');
  if (universeSelect) {
    Array.prototype.forEach.call(doc.querySelectorAll('[data-universo]'), function (link) {
      link.addEventListener('click', function () {
        var value = link.getAttribute('data-universo');
        Array.prototype.forEach.call(universeSelect.options, function (opt) {
          if (opt.value === value || opt.text === value) universeSelect.value = opt.value;
        });
      });
    });
  }

  /* ---------- Barra CTA fija (solo móvil): tras el hero, se oculta en el formulario ---------- */
  var bar = doc.querySelector('[data-stickybar]');
  var hero = doc.querySelector('.hero, .pagehead');
  var formSection = doc.getElementById('empezar') || doc.getElementById('contacto-profesionales');
  if (bar && hero && 'IntersectionObserver' in window) {
    var heroVisible = true;
    var formVisible = false;
    var focusables = bar.querySelectorAll('a, button');

    function update() {
      var show = !heroVisible && !formVisible;
      bar.classList.toggle('is-visible', show);
      bar.setAttribute('aria-hidden', show ? 'false' : 'true');
      Array.prototype.forEach.call(focusables, function (el) { el.tabIndex = show ? 0 : -1; });
    }
    new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting;
      update();
    }, { threshold: 0.15 }).observe(hero);

    if (formSection) {
      new IntersectionObserver(function (entries) {
        formVisible = entries[0].isIntersecting;
        update();
      }, { threshold: 0.1 }).observe(formSection);
    }
    update();
  }

  /* ---------- Enlaces de WhatsApp: aviso de que el número es un placeholder ---------- */
  Array.prototype.forEach.call(doc.querySelectorAll('[data-whatsapp]'), function (a) {
    a.addEventListener('click', function (e) {
      if (a.getAttribute('href').indexOf('[') === 0) {
        e.preventDefault();
        window.alert('Número de WhatsApp pendiente de configurar: [WHATSAPP: +34 ___]');
      }
    });
  });
})();
