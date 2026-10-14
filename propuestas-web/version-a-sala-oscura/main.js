/* ALUMA — Versión A «Sala oscura». Vanilla JS, sin dependencias. */
(function () {
  'use strict';

  var doc = document;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var coarse = window.matchMedia('(pointer: coarse)');

  /* --------------------------------------------------------------
     1. Cabecera: estado al hacer scroll
     -------------------------------------------------------------- */
  var header = doc.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --------------------------------------------------------------
     2. Menú móvil accesible
     -------------------------------------------------------------- */
  var toggle = doc.querySelector('[data-menu-toggle]');
  var nav = doc.getElementById('menu');
  if (toggle && nav) {
    var label = toggle.querySelector('.menu-toggle__label');
    var lastFocus = null;
    var mqDesktop = window.matchMedia('(min-width: 961px)');

    var setMenu = function (open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('is-open', open);
      doc.body.classList.toggle('menu-open', open);
      if (label) label.textContent = open ? 'Cerrar' : 'Menú';
      if (open) {
        lastFocus = doc.activeElement;
        var first = nav.querySelector('a, button');
        if (first) first.focus();
      } else if (lastFocus && lastFocus.focus) {
        lastFocus.focus();
        lastFocus = null;
      }
    };

    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && nav.classList.contains('is-open')) setMenu(false);
    });
    var onDesktop = function (e) {
      if (e.matches && nav.classList.contains('is-open')) setMenu(false);
    };
    if (mqDesktop.addEventListener) mqDesktop.addEventListener('change', onDesktop);
  }

  /* --------------------------------------------------------------
     3. Hero «la luz se decide»: haz que sigue al cursor con retardo
        físico (lerp) y se abre solo a los ~2,5 s o al hacer scroll.
        El titular y los CTA viven fuera de la máscara: siempre legibles.
     -------------------------------------------------------------- */
  var hero = doc.querySelector('[data-beam]');
  if (hero) {
    var lit = hero.querySelector('.hero__lit');
    var glow = hero.querySelector('.hero__glow');
    var CLOSED = 0.26;
    var OPEN = 2.2;
    var isOpen = false;
    var target = { x: 50, y: 50, r: CLOSED };
    var cur = { x: 50, y: 50, r: CLOSED };

    var paint = function (x, y, rf) {
      var r = rf * Math.min(hero.clientWidth, hero.clientHeight);
      var at = x.toFixed(2) + '% ' + y.toFixed(2) + '%';
      var mask = 'radial-gradient(circle ' + r.toFixed(1) + 'px at ' + at +
        ', #000 0%, #000 42%, rgba(0,0,0,0.35) 74%, transparent 100%)';
      lit.style.webkitMaskImage = mask;
      lit.style.maskImage = mask;
      if (glow) {
        glow.style.backgroundImage = 'radial-gradient(circle ' + (r * 0.9).toFixed(1) + 'px at ' + at +
          ', rgba(176,141,76,0.22) 0%, transparent 100%)';
      }
    };

    var finish = function () {
      hero.classList.add('is-open');
      lit.style.webkitMaskImage = '';
      lit.style.maskImage = '';
      if (glow) glow.style.backgroundImage = '';
    };

    var reveal = function () {
      if (isOpen) return;
      isOpen = true;
      target.r = OPEN;
      target.x = 50;
      target.y = 50;
      hero.classList.add('is-opening');
    };

    if (reduced.matches || !lit) {
      finish();
    } else {
      var isCoarse = coarse.matches;
      if (isCoarse) {
        cur.x = target.x = 70;
        cur.y = target.y = 46;
        cur.r = target.r = 0.55;
      }
      var t0 = performance.now();
      var tick = function (now) {
        if (isCoarse && !isOpen) {
          var s = (now - t0) / 2600;
          target.x = 66 + Math.cos(s) * 6;
          target.y = 46 + Math.sin(s * 0.8) * 6;
        }
        cur.x += (target.x - cur.x) * 0.07;
        cur.y += (target.y - cur.y) * 0.07;
        cur.r += (target.r - cur.r) * (isCoarse ? 0.14 : 0.055);
        paint(cur.x, cur.y, cur.r);
        if (isOpen && OPEN - cur.r < 0.02) {
          finish();
          return;
        }
        requestAnimationFrame(tick);
      };
      paint(cur.x, cur.y, cur.r);
      requestAnimationFrame(tick);

      hero.addEventListener('pointermove', function (e) {
        if (isOpen) return;
        var rc = hero.getBoundingClientRect();
        target.x = ((e.clientX - rc.left) / rc.width) * 100;
        target.y = ((e.clientY - rc.top) / rc.height) * 100;
      });
      hero.addEventListener('click', function (e) {
        if (!e.target.closest('a, button')) reveal();
      });
      window.addEventListener('scroll', function onFirstScroll() {
        reveal();
        window.removeEventListener('scroll', onFirstScroll);
      }, { passive: true });
      window.setTimeout(reveal, isCoarse ? 900 : 2500);
    }
  }

  /* --------------------------------------------------------------
     4. Imágenes remotas: fallback local o caja de color de marca
     -------------------------------------------------------------- */
  var markMissing = function (img) {
    var box = img.closest('[data-media]');
    if (box) box.classList.add('is-missing');
  };
  doc.querySelectorAll('[data-media] img').forEach(function (img) {
    var fb = img.getAttribute('data-fallback');
    var tried = false;
    var onError = function () {
      if (fb && !tried) {
        tried = true;
        img.src = fb;
      } else {
        markMissing(img);
        img.removeEventListener('error', onError);
      }
    };
    img.addEventListener('error', onError);
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) onError();
  });

  /* --------------------------------------------------------------
     5. Fachadas de YouTube (el iframe solo se carga al pulsar)
     -------------------------------------------------------------- */
  var makeIframe = function (id, title) {
    var f = doc.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
    f.title = title;
    f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    f.setAttribute('allowfullscreen', '');
    f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    f.setAttribute('loading', 'eager');
    return f;
  };

  doc.querySelectorAll('.yt[data-yt]').forEach(function (box) {
    var btn = box.querySelector('.yt__btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var id = box.getAttribute('data-yt');
      var title = box.getAttribute('data-title') || 'Vídeo de ALUMA';
      box.classList.add('is-playing');
      box.replaceChildren(makeIframe(id, title));
    });
  });

  /* --------------------------------------------------------------
     6. Modal de vídeo (<dialog>) para la cuadrícula de trabajo
     -------------------------------------------------------------- */
  var modal = doc.getElementById('video-modal');
  if (modal && typeof modal.showModal === 'function') {
    var frame = modal.querySelector('.modal__frame');
    var mTitle = modal.querySelector('.modal__title');
    var mExt = modal.querySelector('.modal__ext');
    var closeBtn = modal.querySelector('[data-close]');

    doc.querySelectorAll('[data-video]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var id = el.getAttribute('data-video');
        var title = el.getAttribute('data-title') || el.textContent.trim();
        if (mTitle) mTitle.textContent = title;
        if (mExt) mExt.href = 'https://youtu.be/' + id;
        frame.replaceChildren(makeIframe(id, title));
        modal.showModal();
      });
    });
    modal.addEventListener('close', function () {
      frame.replaceChildren();
    });
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.close();
    });
    if (closeBtn) closeBtn.addEventListener('click', function () { modal.close(); });
  }

  /* --------------------------------------------------------------
     7. Tabs accesibles (universos): flechas, Inicio, Fin
     -------------------------------------------------------------- */
  doc.querySelectorAll('[data-tabs]').forEach(function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (t) { return doc.getElementById(t.getAttribute('aria-controls')); });
    var select = function (i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        if (panels[j]) panels[j].hidden = !on;
      });
      if (focus) tabs[i].focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        var n = tabs.length;
        var k = null;
        if (e.key === 'ArrowRight') k = (i + 1) % n;
        else if (e.key === 'ArrowLeft') k = (i - 1 + n) % n;
        else if (e.key === 'Home') k = 0;
        else if (e.key === 'End') k = n - 1;
        if (k !== null) {
          e.preventDefault();
          select(k, true);
        }
      });
    });
    var initial = tabs.findIndex(function (t) { return t.getAttribute('aria-selected') === 'true'; });
    select(initial < 0 ? 0 : initial);
  });

  /* --------------------------------------------------------------
     8. Formularios: pista para parejas y preselección de universo
     -------------------------------------------------------------- */
  var tipo = doc.getElementById('tipo');
  var tipoHint = doc.getElementById('tipo-hint');
  if (tipo && tipoHint) {
    var syncHint = function () { tipoHint.hidden = tipo.value !== 'tu-pelicula'; };
    tipo.addEventListener('change', syncHint);
    syncHint();
  }

  var universo = doc.getElementById('universo');
  if (universo) {
    var setUniverse = function (v) {
      if (!v) return;
      var opt = Array.prototype.find.call(universo.options, function (o) { return o.value === v; });
      if (opt) universo.value = v;
    };
    doc.querySelectorAll('[data-universo]').forEach(function (a) {
      a.addEventListener('click', function () { setUniverse(a.getAttribute('data-universo')); });
    });
    try {
      setUniverse(new URLSearchParams(window.location.search).get('universo'));
    } catch (err) { /* sin parámetros */ }
  }

  /* --------------------------------------------------------------
     9. Filtro por salas (trabajo.html)
     -------------------------------------------------------------- */
  var filter = doc.querySelector('[data-filter]');
  if (filter) {
    var buttons = Array.prototype.slice.call(filter.querySelectorAll('button[data-value]'));
    var items = Array.prototype.slice.call(doc.querySelectorAll('[data-sala]'));
    var status = doc.getElementById('filter-status');
    var apply = function (value, push) {
      var n = 0;
      buttons.forEach(function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-value') === value ? 'true' : 'false');
      });
      items.forEach(function (it) {
        var show = value === 'all' || it.getAttribute('data-sala') === value;
        it.hidden = !show;
        if (show) n += 1;
      });
      if (status) status.textContent = n === 1 ? '1 pieza' : n + ' piezas';
      if (push && window.history && window.history.replaceState) {
        window.history.replaceState(null, '', value === 'all' ? window.location.pathname : '#' + value);
      }
    };
    buttons.forEach(function (b) {
      b.addEventListener('click', function () { apply(b.getAttribute('data-value'), true); });
    });
    var fromHash = window.location.hash.replace('#', '');
    var known = buttons.some(function (b) { return b.getAttribute('data-value') === fromHash; });
    apply(known ? fromHash : 'all', false);
  }
})();
