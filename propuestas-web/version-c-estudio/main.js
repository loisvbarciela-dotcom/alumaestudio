/* ALUMA — Versión C «Estudio» · vanilla JS, sin dependencias.
   Módulos: menú móvil · fachada YouTube · previsualización de filmografía ·
   tabs accesibles · teaser del brief. */
(function () {
  'use strict';

  /* ---------- Menú móvil ------------------------------------------------ */
  var menuBtn = document.querySelector('.menu-btn');
  var panel = document.getElementById('menu-panel');
  if (menuBtn && panel) {
    var closeMenu = function (returnFocus) {
      panel.hidden = true;
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      if (returnFocus) menuBtn.focus();
    };
    var openMenu = function () {
      panel.hidden = false;
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
      var first = panel.querySelector('a, button');
      if (first) first.focus();
    };
    menuBtn.addEventListener('click', function () {
      if (panel.hidden) openMenu(); else closeMenu(true);
    });
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) closeMenu(true);
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (e) {
      if (e.matches && !panel.hidden) closeMenu(false);
    });
  }

  /* ---------- Fachada de YouTube (el iframe solo se carga al pulsar) ---- */
  document.querySelectorAll('.facade[data-yt]').forEach(function (facade) {
    var play = facade.querySelector('.facade__play');
    if (!play) return;
    play.addEventListener('click', function () {
      var id = facade.getAttribute('data-yt');
      var title = facade.getAttribute('data-title') || 'Vídeo';
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
      iframe.title = title + ' (YouTube)';
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      facade.classList.add('facade--loaded');
      facade.appendChild(iframe);
      iframe.focus();
    });
  });

  /* ---------- Filmografía: previsualización al pasar el ratón/foco ------ */
  var filmo = document.querySelector('[data-filmo]');
  if (filmo) {
    var frame = filmo.querySelector('.filmo__frame');
    var capTitle = filmo.querySelector('[data-preview-title]');
    var capMeta = filmo.querySelector('[data-preview-meta]');
    var rows = filmo.querySelectorAll('tbody tr');
    var active = null;
    var show = function (row) {
      if (!frame || row === active) return;
      if (active) active.classList.remove('is-active');
      active = row;
      row.classList.add('is-active');
      var poster = row.getAttribute('data-poster');
      var ph = row.getAttribute('data-ph');
      var title = row.getAttribute('data-title') || '';
      var meta = row.getAttribute('data-meta') || '';
      frame.innerHTML = '';
      if (poster) {
        var img = document.createElement('img');
        img.src = poster;
        img.alt = 'Póster de ' + title;
        img.width = 1600; img.height = 900;
        img.loading = 'lazy';
        img.decoding = 'async';
        frame.appendChild(img);
      } else {
        var box = document.createElement('div');
        box.className = 'ph';
        box.textContent = ph || '[PLACEHOLDER: fotograma]';
        frame.appendChild(box);
      }
      if (capTitle) capTitle.textContent = title;
      if (capMeta) capMeta.textContent = meta;
    };
    rows.forEach(function (row) {
      row.addEventListener('mouseenter', function () { show(row); });
      row.addEventListener('focusin', function () { show(row); });
    });
    if (rows.length) show(rows[0]);
  }

  /* ---------- Tabs accesibles (WAI-ARIA, activación automática) --------- */
  document.querySelectorAll('[data-tabs]').forEach(function (tabs) {
    var list = tabs.querySelector('[role="tablist"]');
    var tabEls = Array.prototype.slice.call(tabs.querySelectorAll('[role="tab"]'));
    var panels = tabEls.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
    var select = function (i, focus) {
      tabEls.forEach(function (t, j) {
        var on = j === i;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        if (panels[j]) panels[j].hidden = !on;
      });
      if (focus) tabEls[i].focus();
    };
    tabEls.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i, false); });
    });
    if (list) {
      list.addEventListener('keydown', function (e) {
        var i = tabEls.indexOf(document.activeElement);
        if (i < 0) return;
        var n = tabEls.length, next = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % n;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + n) % n;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = n - 1;
        if (next !== null) { e.preventDefault(); select(next, true); }
      });
    }
    var initial = tabEls.findIndex(function (t) { return t.getAttribute('aria-selected') === 'true'; });
    select(initial < 0 ? 0 : initial, false);
  });

  /* ---------- Teaser del brief: lleva el texto al formulario de contacto
     En la maqueta no se genera nada. En producción, este botón llama a la
     función de servidor existente `proposeApproach` (src/lib/brief.functions.ts)
     y muestra la propuesta orientativa; aquí solo copia el brief al mensaje. */
  var briefLink = document.querySelector('[data-brief-go]');
  var briefText = document.getElementById('brief-text');
  var contactMsg = document.getElementById('c-mensaje');
  if (briefLink && briefText && contactMsg) {
    briefLink.addEventListener('click', function () {
      var text = briefText.value.trim();
      if (text && !contactMsg.value.trim()) contactMsg.value = text;
    });
  }

})();
