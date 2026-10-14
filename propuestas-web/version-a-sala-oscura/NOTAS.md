# Versión A — «Sala oscura»

Propuesta estática (HTML/CSS/JS, sin build) para alumafilms.es. Evolución de la marca actual: galería de cine oscura (tinta, hueso, oro escaso, Instrument Serif + Inter, radius 0) convertida en una web que explica qué hace ALUMA, muestra «Tu película» y ofrece dos caminos claros desde la primera pantalla.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Portada |
| `tu-pelicula.html` | Landing completa del producto «Tu película» |
| `trabajo.html` | Portfolio con filtro por salas (Ficción · Deporte · Documental · Publicidad) |
| `styles.css` | Hoja de estilos compartida (tokens, componentes, responsive, reduced motion) |
| `main.js` | Vanilla JS compartido: haz de luz, menú móvil, fachadas de YouTube, modal `<dialog>`, tabs, filtro, fallbacks de imagen |
| `NOTAS.md` | Este documento |

Imágenes: `../assets/img/<archivo>` (locales) y las URL absolutas del CDN de Lovable para `love-hero.jpg` y `love-film-thumbnail.png`, con fallback local o de color.

## Concepto

«La luz se decide.» La sala está a oscuras y la luz cae donde el estudio decide. La portada conserva el elemento firma de la web actual (el haz de luz que sigue al cursor sobre un fotograma) pero resuelve su mayor fallo: **el titular, el subtítulo y los dos CTA viven fuera de la máscara y son legibles desde el primer pintado**. El haz solo revela la imagen; nunca esconde el mensaje.

Contraste de ritmo: el sitio es tinta, y las dos secciones que «se encienden» en papel son las que venden (la pantalla de «Tu película») y las que resuelven dudas (FAQ / proceso). El oro aparece solo como línea, etiqueta o foco; nunca como relleno.

## Público

- **B2C — parejas, familiares que regalan, pedidas, aniversarios.** Camino «Para vosotros» → `tu-pelicula.html` con su propio formulario (nombres, ocasión, fecha, universo, historia).
- **B2B — marcas, clubes deportivos, productoras, wedding planners.** Camino «Para marcas» → `#marcas` (Ronsel como prueba social, cuadrícula de trabajo, método, confianza) y formulario segmentado en `#contacto`. Los wedding planners tienen bloque propio en la landing del producto.

## Estructura de cada página

### `index.html`
1. **Cabecera fija** sobria: wordmark (placeholder de logo SVG), navegación, conmutador GL·ES·EN·RU, botón «Crea vuestra película». Menú móvil accesible (`aria-expanded`, Escape, foco gestionado, scroll bloqueado).
2. **Hero** con haz de luz sobre `marea-alta.jpg`: lerp hacia el cursor (retardo físico), se abre solo a los 2,5 s, al hacer scroll o al pulsar; en pantallas táctiles nace sobre el sujeto y se abre a los 0,9 s; con `prefers-reduced-motion` la imagen nace abierta y sin animación. Eyebrow «La luz se decide.», H1 con palabras clave, subtítulo, CTA 1 → `tu-pelicula.html`, CTA 2 → `#marcas`. Placeholder visible de vídeo MP4 en bucle.
3. **Dos caminos**: Para vosotros / Para marcas, con línea de oro que crece al pasar el cursor.
4. **Tu película** (sección papel): promesa, los tres hechos, bloque de presupuesto y plazo con placeholders, fachada de YouTube de la película de ejemplo (`GvkblfoP1J8`), CTA.
5. **Para marcas · Trabajo seleccionado** (`#marcas`): Ronsel destacado con ficha mínima (Cliente RC Celta · 2026 · 31:42 · Documental) y modal de vídeo; cuadrícula asimétrica de 6 pósters locales (cada uno abre su vídeo en modal; sin JS enlaza a `https://alumafilms.es/es/trabajo/<slug>`).
6. **Método** (Filmamos · Generamos · Integramos) + bloque de confianza (Reglamento Europeo de IA, trazabilidad, marcado, consentimiento).
7. **Estudio**: «Alumar: dar luz», fotograma `o-oficio.jpg`, manifiesto.
8. **FAQ** mixta B2C/B2B con `<details>` + `FAQPage`.
9. **Blog**: tres artículos de la sección 8 del brief (proceso, bodas, wedding planners).
10. **Contacto**: email, WhatsApp placeholder, redes; formulario segmentado (Tu película / Publicidad / Deporte / Documental / Ficción / Otro). Al elegir «Tu película» aparece un aviso que lleva al formulario propio de parejas.
11. **Pie** con datos de empresa y enlaces legales en placeholder, redes reales y conmutador de idioma.

### `tu-pelicula.html`
1. Hero con `love-hero.jpg` del CDN (fallback local `cinza-e-ouro.jpg`; si tampoco carga, color de marca), apertura lenta de la luz, migas, eyebrow, H1 «Tu película personalizada», intro, tres hechos, CTA «Crea ya tu película» (→ formulario) y «Ver la película».
2. «No otro vídeo de boda».
3. Película de ejemplo (fachada; el iframe de `youtube-nocookie.com` solo se carga al pulsar).
4. Universos: tabs accesibles (`role=tablist`, flechas, Inicio/Fin). Cada universo tiene su enlace «Empezar en…» que preselecciona el universo en el formulario (también por `?universo=antigua-roma`).
5. Proceso en tres pasos (sección papel).
6. Ocasiones: boda, aniversario, pedida de mano, regalo especial.
7. Presupuesto y plazo con placeholders y el texto real de love.json.
8. Bloque wedding planners.
9. FAQ completa de love.json + `FAQPage`.
10. Cierre «Vuestra historia todavía no se ha rodado.» + formulario específico: nombres, email, teléfono/WhatsApp, quién escribe (pareja / regalo / wedding planner), ocasión, fecha, universo preferido, historia, privacidad.

### `trabajo.html`
Hero breve «Cuatro salas», filtro por salas (`aria-pressed`, estado en el hash: `#ficcion`, `#deporte`…), cuadrícula de las 16 piezas de `pieces.json` (13 pósters locales, «Invasión alienígena» con miniatura de YouTube y fallback, 2 reels verticales de deporte con placeholder de fotograma y enlace a Instagram), cierre con CTA a «Tu película».

## Decisiones SEO

- `<title>` ≤ 60 y `meta description` ≤ 155 en las tres páginas, con palabras clave («cine con IA», «película personalizada con dos fotos», «ficción, deporte, documental y publicidad»).
- Un único H1 por página; jerarquía H1 → H2 → H3 respetada.
- `canonical` a `https://alumafilms.es/es/...`, `hreflang` gl/es/en/ru con las URL reales del sitemap de producción y `x-default` a la versión ES.
- Open Graph + Twitter con imagen absoluta (`/placeholders/marea-alta.jpg`, `love-hero.jpg` del CDN, `/posters/ronsel.jpg`), `theme-color`.
- JSON-LD: `ProfessionalService` (areaServed, sameAs, makesOffer) + `FAQPage` en portada; `Service` + `Offer` (precio placeholder) + `VideoObject` + `FAQPage` + `BreadcrumbList` en el producto; `CollectionPage` + `BreadcrumbList` + `VideoObject` (Ronsel) en trabajo.
- Rendimiento: imagen LCP con `fetchpriority="high"`, resto `loading="lazy"`, `width/height` o `aspect-ratio` en todo contenedor de imagen, `preconnect` a Google Fonts, `display=swap`, iframes de YouTube solo al pulsar (`youtube-nocookie.com`).
- Enlaces a secciones no maquetadas (ética, blog, fichas de piezas) → web real `https://alumafilms.es/es/...`.

## Decisiones de conversión

- Primera pantalla: qué hace ALUMA (H1 + subtítulo) + dos caminos + CTA principal siempre visible en la cabecera.
- «Tu película» aparece en portada con hechos, precio/plazo (placeholder) y película de ejemplo; su CTA lleva a una landing propia, no al formulario B2B.
- Formulario B2B segmentado por tipo de proyecto; el formulario de parejas pide lo que de verdad hace falta para valorar (ocasión, fecha, universo, historia) y deja las fotos para después, por email y con consentimiento.
- Prueba social real y única: Ronsel para el RC Celta en portada y en trabajo. Sin testimonios, cifras ni clientes inventados.
- Canales rápidos: email real y WhatsApp en placeholder en portada y en la landing.
- Voz: sobria, cálida, sin exclamaciones ni hype; los copys del producto son los literales de `love.json`.

## Accesibilidad

Landmarks (`header`, `nav` con nombres únicos, `main`, `footer`), skip link, foco visible 2 px oro, contraste AA (en secciones papel se usan `--bruma-dark` y `--ouro-dark`), `alt` en todas las imágenes, formularios con `label`, tabs y menú con teclado, modal `<dialog>` nativo (Escape, foco), `prefers-reduced-motion` respetado (haz abierto, sin transiciones). HTML validado con html-validate: el único aviso restante es el `action="[ENDPOINT FORMULARIO]"` intencionado.

## Placeholders (buscar `PLACEHOLDER` o `[` en el HTML)

| Placeholder | Dónde |
|---|---|
| `[PRECIO: desde ___ €]` | index (sección Tu película), tu-pelicula (bloque precio), JSON-LD `Offer.price` |
| `[PLAZO: ___ días]` | index, tu-pelicula |
| `[WHATSAPP: +34 ___]` | index (contacto), tu-pelicula (precio y formulario) |
| `[ENDPOINT FORMULARIO]` | `action` de los dos formularios |
| `[URL POLÍTICA DE PRIVACIDAD]`, `[URL AVISO LEGAL]`, `[URL COOKIES]` | casillas de privacidad y pie |
| `[NIF/RAZÓN SOCIAL]`, `[DIRECCIÓN · ZONA DE SERVICIO]`, `[TELÉFONO]` | pie |
| `<!-- PLACEHOLDER: logo SVG -->` | cabecera y pie |
| `[PLACEHOLDER: vídeo MP4/WebM en bucle, 8–12 s, muted]` | hero de portada (hoy: póster `marea-alta.jpg`) |
| `[PLACEHOLDER: fotograma del universo «…», 16:9]` | cuatro paneles de universos |
| `[PLACEHOLDER: fotograma vertical «Camiseta Reconquista» / «Viaje en el tiempo»]` | trabajo (reels de Instagram) |
| `[FECHA DE PUBLICACIÓN ISO 8601]` | `VideoObject.uploadDate` en JSON-LD de tu-pelicula y trabajo |

No se ha inventado ningún precio, plazo, testimonio, cliente, cifra ni premio.

## Cómo llevarla a Lovable

1. **Tokens y tipografía** ya coinciden con `src/styles.css` (`--tinta`, `--oso`, `--papel`, `--ouro`, `--bruma`, `--salvia`; Instrument Serif + Inter). Añadir `--tinta-2`, `--ouro-dark` y `--bruma-dark` al `@theme`.
2. **Hero**: `LightBeamHero.tsx` ya implementa el lerp; el cambio es sacar `h1`, subtítulo y CTA de la capa enmascarada (hoy `maskedRefs[1]`) y añadir el scrim. La lógica de `main.js` §3 es una traducción 1:1.
3. **Secciones** → componentes en `src/components/aluma/`: `Paths`, `LoveTeaser`, `FeaturedWork` (Ronsel + grid), `Method` + `Trust`, `Faq` (con `<details>` y JSON-LD generado desde el mismo array), `Posts`, `Contact` (select segmentado).
4. **Textos** → `src/content/i18n/<lang>.json` (nuevas claves: `hero.eyebrow`, `hero.lead`, `paths`, `loveTeaser`, `faqHome`, `contact.types`) y `love.json` para la landing (ya contiene todos los copys usados).
5. **Landing del producto** → ruta `/<lang>/tu-pelicula` existente; añadir tabs de universos, ocasiones, bloque de precio y el formulario de parejas. El endpoint actual de contacto debe aceptar el campo `tipo` y los campos de pareja, o crear un segundo server function.
6. **SEO**: pasar `og:image` a URL absolutas, añadir `FAQPage`/`Service`/`VideoObject` en el `head` de cada ruta y regenerar el sitemap con `scripts/generate-sitemap.ts`.
7. **Redirección de idioma**: fuera de esta versión, pero es el fallo n.º 3 del brief: resolver `/` según `Accept-Language` antes de redirigir a `/gl`.

## Verificación realizada

- Capturas en 1440×900 y 390×844 (página completa y primera pantalla) de las tres páginas, más 360 px: sin scroll horizontal (`scrollWidth === clientWidth`, ningún elemento fuera del viewport).
- Cero errores de consola JS en todas las páginas y en las interacciones (menú móvil, haz de luz, modo reducido, modal, tabs con teclado, fachada de YouTube, filtro, aviso del formulario).
- Todas las rutas locales a imágenes existen. Las del CDN de alumafilms.es y de YouTube no cargan en el sandbox (proxy): se ve el fallback local o de color, como estaba previsto.
- Nota para captura de página completa: las imágenes llevan `loading="lazy"`, así que una captura `fullPage` sin desplazarse antes muestra los pósters inferiores como cajas oscuras. El script `shot2.mjs` del scratchpad recorre la página antes de capturar.
