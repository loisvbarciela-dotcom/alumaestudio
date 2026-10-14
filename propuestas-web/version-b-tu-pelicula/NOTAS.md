# Versión B — «Tu película primero»

Propuesta de portada para alumafilms.es en la que **la portada es la página de venta del producto «Tu película»** (dos fotos → una película de 3–4 minutos protagonizada por la pareja). El estudio y su portfolio pasan a un segundo plano («Para marcas», enlazado a la web real).

Archivos: `index.html` (landing del producto), `wedding-planners.html` (landing B2B), `styles.css`, `main.js`, `NOTAS.md`. Imágenes locales en `../assets/img/`.

---

## 1. Concepto

- **Producto primero, conversión B2C, mobile-first.** Todo lo que ve la persona en los primeros 15 segundos responde a: qué es, para quién, cuánto dura, cómo se pide. Es la respuesta directa a los fallos de la auditoría: portada que no vendía nada, CTA que llevaba a un formulario B2B, sin WhatsApp ni teléfono.
- **Estética: cálida, editorial y cinematográfica.** Fondos papel/hueso (`--papel`, `--papel-2`), texto tinta, oro solo en filetes, numerales y detalles. Bandas oscuras «tipo sala de cine» para los momentos de película (ejemplo, formulario, pie).
- **Motivos propios de la versión:**
  - *Fotograma panorámico con barras cinemascope* (`.frame`): contenedor 16:9 con un fotograma 2.39:1 centrado; las barras aparecen de forma natural.
  - *Tipografía de créditos de cine* (`.credits`): «UNA PELÍCULA DE ALUMA · Protagonizada por ___ y ___» en versalitas con tracking y nombre en cursiva serif.
  - *Motivo de entrada/estreno*: el CTA principal es una «entrada» (`.btn--ticket`, con muescas laterales y línea de corte) y el formulario es un ticket con talón perforado («Entrada · Estreno · ALUMA», «Admite dos»).
  - *Dispositivo «2 fotos → 1 película»* en el hero: dos marcos de foto que convergen (SVG) en el fotograma panorámico.
- Nada de corazones, letras script, rosas ni clichés de boda; nada de plantillas de startup. Radius 0, sin sombras, bordes 1 px.
- Tipografías: Instrument Serif (display) + Inter (texto), vía Google Fonts con `preconnect` y `display=swap`.

## 2. Público

1. **Parejas que se casan** (núcleo): hero, película de ejemplo, comparativa «No otro vídeo de boda», ocasión «Boda», FAQ sobre proyección.
2. **Quien busca un regalo**: aniversario, pedida, San Valentín/Navidad, bodas de oro y plata. La sección «Ocasiones» enlaza a los artículos del blog y aclara el consentimiento cuando la película es un regalo.
3. **Wedding planners y proveedores** (secundario): teaser en la landing + página propia `wedding-planners.html` con formulario específico.

## 3. Estructura

### `index.html`
1. **Cabecera** mínima y sticky: wordmark ALUMA (`<!-- PLACEHOLDER: logo SVG -->`), anclas (Cómo funciona, Universos, Precio, Preguntas, Wedding planners), conmutador GL·ES·EN·RU a las URLs reales del producto, CTA «Reservar fecha». En móvil, botón «Menú» con panel accesible (`aria-expanded`, cierre con Escape).
2. **Hero**: eyebrow «ALUMA · Cine para historias de amor», H1 «Vuestra película de amor, a partir de dos fotos.», subtítulo con 3–4 minutos / exclusiva / ocasiones, CTA principal «Crea vuestra película» (→ `#empezar`) y secundario «Ver una película de ejemplo» (→ `#pelicula`), línea de confianza (consentimiento, Reglamento Europeo de IA, hecho en Galicia). Visual: dispositivo «2 fotos → 1 película» con la miniatura del CDN y fallback a placeholder.
3. **Tres datos** (Dos fotografías · 3–4 minutos de cine · Una pieza exclusiva).
4. **Película de ejemplo** (banda oscura): fachada de YouTube `GvkblfoP1J8`; el iframe de `youtube-nocookie.com` solo se inyecta al pulsar.
5. **No otro vídeo de boda**: comparativa honesta «Un montaje de fotos» vs «Vuestra película» (seis criterios, con reconocimiento de que un montaje rápido tiene su sitio) + enlace al artículo sobre apps gratuitas.
6. **Cómo funciona**: 3 pasos literales de `love.json` + línea temporal de cinco hitos + `[PLAZO: ___ días]` + figura `o-oficio.jpg` con la cita del método.
7. **Universos**: tabs accesibles (`role=tablist`, flechas, Home/End) con fotograma placeholder y «Empezar en este universo», que preselecciona el universo en el formulario.
8. **Ocasiones**: boda, aniversario, pedida, San Valentín/Navidad/regalo, bodas de oro y plata, otra; enlaces al blog; nota sobre consentimiento cuando es un regalo.
9. **Qué recibís + Precio**: checklist (lo real afirmado, lo no confirmado como `[validar: …]`) y caja de precio sticky con `[PRECIO: desde ___ €]`, qué incluye y forma de reserva como placeholders, nota honesta y CTA «Pedir propuesta».
10. **Testimonios**: tres huecos `[TESTIMONIO REAL: …]`.
11. **Confianza**: consentimiento expreso, uso de las fotos, guion acordado, Reglamento Europeo de IA + «Quién hay detrás» con el documental *Ronsel* (RC Celta) como única prueba social real y enlaces al portfolio y a la ética.
12. **FAQ** con `<details>` (las seis de `love.json` + qué fotos sirven, proyección en la boda, entrega, plazo) y `FAQPage` en JSON-LD.
13. **Teaser wedding planners** (`#wedding-planners`) → `wedding-planners.html`.
14. **Formulario `#empezar`** (banda oscura, ticket): nombres, email, teléfono/WhatsApp, ocasión, fecha, universo, «cómo os conocisteis», cómo nos conocisteis, privacidad obligatoria. WhatsApp `[WHATSAPP: +34 ___]` y email real al lado.
15. **Pie**: declaración del estudio, enlaces del producto, «Para marcas» (web real), redes reales, legales placeholder.
16. **Barra CTA fija** solo en móvil: aparece al salir del hero y se oculta al llegar al formulario (`IntersectionObserver`); `aria-hidden` y `tabindex` se sincronizan.

### `wedding-planners.html`
1. Cabecera con anclas propias (Por qué, Colaboración, En el evento, Dossier, Para parejas) y CTA «Hablemos».
2. Cabecera de página: H1 «Una propuesta diferente. Un momento que se recuerda.», texto literal de `love.json`, CTAs y fotograma con créditos.
3. **Por qué ofrecerlo** (cuatro argumentos; tres literales de `plannerPoints`) + enlace al artículo para wedding planners.
4. **Película de ejemplo** (misma fachada).
5. **Cómo funciona la colaboración**: cuatro pasos + caja de condiciones con `[CONDICIONES/COMISIÓN: validar]`, `[PRECIO]`, `[PLAZO]`, `[ZONA DE SERVICIO]`.
6. **Cómo se integra en el evento**: proyección en el banquete, estreno privado, regalo de los invitados, después de la boda.
7. **Dossier** `[PLACEHOLDER: PDF dossier]` con botón de descarga placeholder.
8. **Formulario para profesionales**: empresa, contacto, email, teléfono, web/Instagram, nº aproximado de bodas al año (rangos), zona, mensaje, privacidad.
9. Pie y barra fija móvil.

## 4. Decisiones SEO y de conversión

- **Un H1 por página con la palabra clave** («película de amor a partir de dos fotos»); `<title>` ≤ 60 y `meta description` ≤ 155 en ambas páginas.
- `canonical` a `https://alumafilms.es/es/tu-pelicula` y `hreflang` gl/es/en/ru + `x-default` (ES). La página B2B usa URLs futuras `/<lang>/<producto>/wedding-planners`; hasta que existan las traducciones, el conmutador de idioma enlaza a la página del producto en cada idioma.
- Open Graph/Twitter con imagen absoluta que ya existe en producción (`/placeholders/o-oficio.jpg`). Sustituir por el hero real del producto cuando esté subido al mismo dominio.
- **JSON-LD** en `index.html`: `Organization` (areaServed, sameAs), `Service` + `Offer` (precio placeholder), `VideoObject` (película de ejemplo; `uploadDate` como placeholder), `FAQPage`, `BreadcrumbList`. En `wedding-planners.html`: `Organization`, `Service` B2B, `BreadcrumbList`.
- **Conversión**: CTA visible sin scroll en móvil y escritorio; segundo CTA de bajo compromiso (ver ejemplo); barra fija móvil; WhatsApp y email junto al formulario; formulario específico de parejas (no el B2B); «Empezar en este universo» preselecciona el campo; honestidad explícita en precio, plazos y comparativa (sin cifras inventadas).
- **Rendimiento**: `fetchpriority="high"` solo en la imagen LCP, `loading="lazy"` en el resto, `width/height` o `aspect-ratio` en todas, fuentes con `swap`, cero dependencias salvo Google Fonts y el embed al pulsar.
- **Accesibilidad**: landmarks, `lang="es"`, un H1, jerarquía H2→H3, `alt` en todas las imágenes, `label` en todos los campos, foco visible 2 px oro, tabs ARIA con teclado, `prefers-reduced-motion` respetado (se anulan animaciones y scroll suave), contraste AA (bruma y oro oscurecidos para texto pequeño sobre papel).

## 5. Placeholders (buscar `PLACEHOLDER` y `[` en los HTML)

Texto visible:
- `[PRECIO: desde ___ €]` (caja de precio, FAQ, condiciones B2B, JSON-LD `Offer.price`)
- `[PLAZO: ___ días]` (línea temporal, FAQ, condiciones B2B)
- `[TESTIMONIO REAL: …]` ×3 (cita y firma)
- `[WHATSAPP: +34 ___]` (botón junto al formulario y barra fija; el `href` es `[WHATSAPP: https://wa.me/34___]` y `main.js` avisa si se pulsa sin configurar)
- `[CONDICIONES/COMISIÓN: validar …]`, `[ZONA DE SERVICIO: validar …]` (B2B)
- `[validar: …]` en entrega, versión para proyección, revisiones, qué incluye el precio, forma de reserva, conservación de las fotos, criterios de las fotos, requisitos de proyección, contenido del dossier, formato para redes
- `[NIF/RAZÓN SOCIAL]`, `[URL AVISO LEGAL]`, `[URL POLÍTICA DE PRIVACIDAD]`, `[URL COOKIES]`, `[ENDPOINT FORMULARIO]` (action de los dos formularios), `[PLACEHOLDER: URL del PDF dossier]`
- JSON-LD: `VideoObject.uploadDate` = `[validar: fecha de publicación …]`

Imagen / vídeo (cajas con borde discontinuo):
- `[FOTO 1]` / `[FOTO 2]` (hero)
- `[PLACEHOLDER: fotograma de la película]` (hero y cabecera B2B; solo se muestra si la imagen del CDN no carga)
- `[PLACEHOLDER: miniatura de la película de ejemplo]` (fachada; ídem)
- `[PLACEHOLDER: fotograma de ejemplo · Antigua Roma / Años veinte / El espacio / Vuestro universo]`
- `[PLACEHOLDER: PDF dossier para profesionales]`
- `<!-- PLACEHOLDER: logo SVG -->` en el wordmark

Datos reales usados sin modificar: copys de `src/content/love.json` (es), redes, email, documental *Ronsel* (RC Celta, 2026, 31:42), ID de YouTube de la película de ejemplo, artículos del blog previstos.

## 6. Cómo llevarla a Lovable

1. **Ruta**: convertir `index.html` en la página `/es/tu-pelicula` (y, si se decide que el producto sea la portada, en `/es`). Mantener el registro de secciones localizado y el `SiteShell` del proyecto para que el conmutador de idioma y la navegación sigan funcionando; añadir `wedding-planners` como ruta hija del producto en `LANGS`/registro de slugs.
2. **Contenido**: todos los textos del producto están en `love.json`; los nuevos (comparativa, ocasiones, qué recibís, precio, confianza, FAQ extra, formulario, B2B) deben añadirse a los archivos de contenido localizados para GL/ES/EN/RU. Para RU, usar el token de fuente de display cirílica del proyecto (Instrument Serif no tiene glifos cirílicos).
3. **Estilos**: los tokens de `:root` coinciden con los del proyecto (`--tinta`, `--oso`, `--papel`, `--ouro`, `--bruma`, `--salvia`); los componentes nuevos (`.frame`, `.credits`, `.btn--ticket`, `.ticket`, `.device`, `.facade`, `.tabs`, `.timeline`, `.stickybar`) se traducen a Tailwind o a CSS modular manteniendo radius 0 y sin sombras.
4. **Formularios**: sustituir `action="[ENDPOINT FORMULARIO]"` por la server function de contacto existente, ampliando `contact-schema.ts` con los campos de pareja (nombres, ocasión, fecha, universo, historia, origen) y los de profesionales (empresa, web, bodas al año, zona). Validar el idioma con `LANGS`. No añadir mensajes de éxito simulados.
5. **Vídeo**: reutilizar la fachada; el iframe de `youtube-nocookie.com` se crea al pulsar.
6. **SEO**: pasar `<title>`, `description`, OG y los bloques JSON-LD a `seo.ts`; sustituir placeholders de precio/fecha antes de publicar o retirar `Offer`/`uploadDate` hasta tenerlos; regenerar el sitemap con `scripts/generate-sitemap.ts`.
7. **Imágenes**: subir fotogramas reales de los cuatro universos, el logo SVG, el dossier PDF; `o-oficio.jpg` y `ronsel.jpg` ya existen en `public/`.
8. **WhatsApp**: definir el número y el texto prefijado (`https://wa.me/34…?text=…`).

## 7. Verificación realizada

- Servido con `python3 -m http.server`; capturas con Playwright (Chromium) a 1440×900 y 390×844, página completa y primera pantalla, de las dos páginas; revisión por recortes.
- Sin errores de consola ni `pageerror` (los fallos de red de CDN/YouTube se filtran y son esperables en el sandbox).
- Sin scroll horizontal a 360, 390, 768, 1024, 1440 y 1920 px en ambas páginas.
- Todas las rutas locales a imágenes existen (`o-oficio.jpg`, `ronsel.jpg`, `favicon.ico`).
- Comprobados: barra fija móvil (oculta en hero y formulario, visible entre ambos), menú móvil (apertura, cierre con Escape), tabs (clic, flechas, Home/End), preselección del universo en el formulario, FAQ, fachada de YouTube, JSON-LD parseable, un H1 por página, `alt` y `label` completos, títulos ≤ 60 y descripciones ≤ 155.
