# Briefing común — 3 nuevas versiones HTML de alumafilms.es

Este documento es la base compartida para las tres propuestas de rediseño (A, B y C).
Resume lo que hay en el repositorio, qué falla hoy y las reglas que deben cumplir las tres versiones.
El diagnóstico completo está en `auditoria/AUDITORIA.md`.

---

## 1. Qué es ALUMA

- **Marca:** ALUMA (Aluma Films). Dominio: `https://alumafilms.es`. Email público: `info@alumafilms.es`.
- **Qué hace:** estudio audiovisual híbrido con sede en Galicia. Rodaje real + generación con IA **dirigida plano a plano por personas**. «La máquina ejecuta; solo el ser humano siente, dirige y asume el riesgo artístico.»
- **Nombre:** *alumar* es verbo gallego: alumbrar, dar luz. «No hacer luz: decidir dónde cae.»
- **Idiomas del sitio:** gallego (por defecto), español, inglés y ruso. **Las propuestas se maquetan en español** (mercado principal) con un conmutador GL · ES · EN · RU que enlaza a la web actual.
- **Redes reales:** Instagram `https://www.instagram.com/aluma.films/` · TikTok `https://www.tiktok.com/@aluma.films` · YouTube `https://www.youtube.com/@AlumaFilmsGalicia` · LinkedIn `https://www.linkedin.com/company/146671485/`
- **Cliente real verificable:** **RC Celta** — documental *Ronsel* (2026, 31:42, «Celta, Vigo e mar»; Aluma contribuyó con las animaciones). Es la única referencia de cliente que se puede citar. No inventar más clientes, logos ni testimonios.
- **Cumplimiento:** Reglamento Europeo de IA, trazabilidad de lo generado, marcado de contenido sintético, imagen de personas reales solo con consentimiento expreso y por escrito.

## 2. El producto a vender: «Tu película» (dos fotos → una película)

Datos reales (de `src/content/love.json`). **No inventar nada fuera de esto; lo que falte va como placeholder.**

- **Promesa:** «Dos fotografías. Vuestra historia de amor. Un universo que solo existe para vosotros.»
- **Qué es:** una película cinematográfica de **3–4 minutos**, **exclusiva**, protagonizada por la pareja. No es un vídeo de fotos con efectos: las fotos son la referencia para crear a los protagonistas; se construye una historia con escenas, dirección y montaje de cine.
- **Entrada:** **dos fotografías, una de cada persona** + una conversación (cómo os conocisteis, qué os une, qué queréis hacer sentir). Se revisa juntos que las fotos sean adecuadas.
- **Proceso (3 pasos):** 1) Dos fotos y una conversación. 2) La película se decide juntos (guion, época, tono, momentos clave; la fidelidad de los rostros es criterio central). 3) Un estreno que solo es vuestro (dirección de la IA plano a plano, ritmo, imagen, montaje).
- **Universos de partida (no es catálogo cerrado):** Antigua Roma · Años veinte · El espacio · Vuestro universo (futuro, recuerdo, fantasía, mezcla imposible).
- **Ocasiones:** boda (estreno perfecto), aniversario, pedida de mano, regalo especial.
- **B2B:** wedding planners y profesionales de bodas («Una propuesta diferente. Un momento que se recuerda.»).
- **Precio y plazos:** hoy NO se publican («se concretan según la historia y la fecha del evento»). En las propuestas: placeholder visible `[PRECIO: desde ___ €]` y `[PLAZO: ___ días]`, para que el cliente decida.
- **Consentimiento:** se trabaja con el consentimiento expreso de las dos personas; uso de fotos y película acordado antes de producir.
- **Película de ejemplo (real):** YouTube `GvkblfoP1J8` → `https://youtu.be/GvkblfoP1J8` · embed `https://www.youtube-nocookie.com/embed/GvkblfoP1J8?autoplay=1&rel=0`
- **Copys literales disponibles (ES):** eyebrow «ALUMA · Cine para historias de amor»; título «Tu película personalizada»; CTA «Crea ya tu película»; «No otro vídeo de boda»; «Hay momentos que merecen algo que nadie haya visto antes.»; «El amor cambia de época. Los protagonistas sois vosotros.»; «¿Dónde comienza vuestra película?»; «Vosotros imagináis. Nosotros dirigimos.»; «Vuestra historia todavía no se ha rodado.»; FAQ completa en `src/content/love.json` (clave `es.faqs`).

## 3. Qué falla hoy (resumen de la auditoría) — las tres versiones deben resolverlo

1. **La portada no vende nada:** el titular nace oculto en la oscuridad (efecto haz de luz) y no hay ninguna llamada a la acción ni mención al producto «Tu película». 84 % de rebote y 11 s de sesión media (analítica de Lovable, 16/09–13/10/2026: 71 visitantes, 112 páginas vistas).
2. **El CTA del producto lleva a un formulario B2B** («Hablemos de tu próxima campaña», desplegable con Ficción/Deporte/Documental/Publicidad, y un generador de propuestas de campaña con IA delante). Una pareja no encuentra su opción.
3. **Casi todo el mundo aterriza en gallego:** en el primer acceso la raíz `/` redirige a `/gl` desde el servidor, sin mirar el idioma del navegador. En el desglose por página, `/gl` suma 58 registros y `/es` solo 3, aunque España es el primer país.
4. **SEO débil:** H1 de portada sin palabras clave («Ideas que merecen luz»), sin `og:image` en casi todas las páginas (las imágenes de Lovable son rutas relativas y se descartan), sin `FAQPage`/`Service`/`LocalBusiness`, artículo del producto fuera del sitemap y con fecha futura, enlaces legales sin destino.
5. **Prueba social desaprovechada:** el documental para el RC Celta no aparece en portada.
6. **Sin canales rápidos de contacto:** ni teléfono ni WhatsApp; para B2C son críticos.

## 4. Identidad visual (tokens actuales)

```
--tinta:  #16130F  fondo dominante, casi negro cálido
--oso:    #F4F0E8  hueso — texto sobre tinta
--papel:  #FBF9F4  fondo de secciones claras
--ouro:   #B08D4C  oro viejo — acento único, con avaricia
--bruma:  #7E8B92  gris-azul atlántico — texto secundario
--salvia: #6B7A5E  solo datos/etiquetas de nicho
Display: "Instrument Serif" (fallback Playfair Display, Georgia) · Texto/UI: "Inter"
Radius 0 · sin sombras difusas · bordes 1px bruma 20 % · etiquetas 11px mayúsculas tracking .12em
```

Cada versión puede reinterpretar la identidad (proporciones, claro/oscuro, ritmo, peso tipográfico, incluso una tipografía de apoyo de Google Fonts) **pero debe seguir siendo reconociblemente ALUMA**: oro como acento escaso, serif editorial, sobriedad. Nada de plantillas de startup (degradados de moda, tarjetas con iconitos, emojis, glassmorphism, botones redondeados con sombra).

**Voz:** sobria, culta, cálida, frases cortas, sin exclamaciones ni hype de IA («revolucionamos», «potenciamos», «soluciones innovadoras»). Puede ser más directa y comercial que la web actual: decir qué es, para quién, cuánto (placeholder), cuándo y cómo pedirlo.

## 5. Recursos existentes

### 5.1 Imágenes locales (copiadas en `propuestas-web/assets/img/`; desde una carpeta de versión: `../assets/img/<archivo>`)

Todas JPG 16:9 (1600×900 aprox.). Las de pósters **llevan el título incrustado** en la imagen; las tres de `placeholders` están limpias (sin texto) y sirven de fondo.

| Archivo | Contenido | Pieza / uso | YouTube |
|---|---|---|---|
| `ronsel.jpg` (1280×720) | Cartel azul «RONSEL · Celta, Vigo e mar», escudo del Celta | Documental para RC Celta (2026, 31:42). **Prueba social principal** | `ngDsA0Ya6RE` |
| `app-store.jpg` | Barco de papel, lago, «Non dispoñible na App Store» | Publicidad (6 parques de Galicia) | `g0QzeoHYYT4` |
| `ultima-abella.jpg` | Abeja sobre girasol, «A última abella» | Ficción 0:31 | `fYnmob3ieSY` |
| `viaxe-40-anos.jpg` | Anciana al atardecer, «unha viaxe de 40 anos» | Ficción 0:31 (mensaje en una botella) | `I7tRBYuUTe0` |
| `cita-teixido.jpg` | Joven bajo la lluvia, «Cita en Teixido» | Ficción 0:31 (leyenda gallega) | `JGo1n0Yrlhg` |
| `o-inocente.jpg` | Hombre con moratón, «O inocente» | Ficción 0:31 | `DvK3KZe7pTk` |
| `tellarizar.jpg` | Farero junto a la lente del faro, «Tellarizar» | Ficción 0:31 | `mEZa5qSnaaA` |
| `meu-fillo.jpg` | Madre de luto, «Meu fillo» | Ficción 0:31 | `I1GmkUQuT6s` |
| `tempo.jpg` | Reloj de bolsillo, «Tempo» | Ficción 0:31 | `pmqH7ZhKO6A` |
| `a-ultima-fornada.jpg` | Ciudad nocturna junto al mar, «A última fornada» | Ficción 0:31 | `qJhzSIGoIRQ` |
| `mayday.jpg` | Marinero con impermeable amarillo y radio, «Mayday» | Ficción 0:31 | `hIM1wL2VGnU` |
| `os-cans.jpg` | Dos hombres en una corredoira nocturna, «Santa Compaña» | Ficción 0:31 | `P52r6OrGezQ` |
| `o-falsificador.jpg` | Pintor y retrato, «O falsificador» | Ficción 0:31 | `cnXtjINwgX4` |
| `cinza-e-ouro.jpg` (1920×1088, sin texto) | Ciudad en miniatura de ceniza, tonos grises | Fondo / textura | — |
| `marea-alta.jpg` (1920×1088, sin texto) | Remeros en una trainera al atardecer | Fondo / deporte | — |
| `o-oficio.jpg` (1920×1088, sin texto) | Manos tallando madera, luz cálida | Fondo / oficio / artesanía | — |
| `favicon.ico` | Favicon actual | — | — |

Más piezas con vídeo: «Invasión alienígena» (YouTube `xLEAk5nbSrw`, miniatura `https://i.ytimg.com/vi/xLEAk5nbSrw/maxresdefault.jpg`); verticales de deporte en Instagram: «Camiseta Reconquista» `https://www.instagram.com/reel/DW_-gyEjVn8/` y «Viaje en el tiempo» `https://www.instagram.com/reel/DXBheeMDZHd/`.

### 5.2 Imágenes alojadas en el CDN de Lovable (URL absoluta; **no se ven desde el sandbox**, sí en el navegador del cliente)

| URL | Qué es |
|---|---|
| `https://alumafilms.es/__l5e/assets-v1/366846b8-e9ab-4737-af7a-298781b66aa1/love-hero.jpg` | Imagen hero actual de «Tu película» (1920×1072) |
| `https://alumafilms.es/__l5e/assets-v1/a4fd8c17-f218-4d3b-a8f3-51efadc3b126/love-film-thumbnail.png` | Miniatura de la película de ejemplo (1365×768) |
| `https://alumafilms.es/__l5e/assets-v1/aa765015-a739-4eed-a9b9-cf84c47da340/abella-no-text-2.png` | Abeja/girasol sin texto (hero actual de portada) |
| `https://alumafilms.es/__l5e/assets-v1/3b577aba-b079-4c91-9bfc-8857cf2b1444/aluma-manifesto-01.png` … `-09.png` | 9 piezas cuadradas del «Manifiesto visual» (ids en `src/assets/manifesto/*.asset.json`) |

Como estas imágenes no cargan en el sandbox, todo contenedor de imagen remota debe tener `aspect-ratio`, `background-color` de marca y `alt` correcto para que la maqueta no se rompa (y para que la captura de verificación sea legible).

### 5.3 Vídeo
No hay MP4 en el repositorio. Para vídeo de fondo usar póster + placeholder `[PLACEHOLDER: vídeo MP4/WebM en bucle, 8–12 s, muted]`. Para reproducir, fachada de YouTube (`youtube-nocookie.com`, el iframe solo se carga al pulsar).

## 6. Reglas técnicas (todas las versiones)

- HTML5 estático, sin frameworks ni build. CSS propio en `styles.css` (por versión) y, si hace falta, un `main.js` pequeño en vanilla JS. Únicas dependencias externas permitidas: Google Fonts y el embed de YouTube al hacer clic.
- Responsive real 360 → 1920 px, sin scroll horizontal. Mobile-first: 44 % del tráfico es móvil.
- Accesibilidad: jerarquía H1→H2→H3 correcta, un único H1 por página, `alt` en todas las imágenes, foco visible (2 px ouro), contraste AA, `lang="es"`, landmarks (`header`, `nav`, `main`, `footer`), formularios con `label`, `prefers-reduced-motion` respetado.
- Rendimiento: `width`/`height` o `aspect-ratio` en imágenes, `loading="lazy"` salvo la imagen LCP (que lleva `fetchpriority="high"`), `preconnect` a Google Fonts, `font-display: swap`.
- SEO on-page por página: `<title>` ≤ 60 caracteres con palabra clave, `meta description` ≤ 155, `canonical` a la URL definitiva en `https://alumafilms.es/es/...`, `hreflang` gl/es/en/ru + `x-default` (apuntando a la versión ES), Open Graph + Twitter con imagen absoluta (usar `https://alumafilms.es/posters/<archivo>.jpg` o `https://alumafilms.es/placeholders/<archivo>.jpg`, que ya existen en producción), `theme-color`, JSON-LD (`Organization`/`ProfessionalService` con `areaServed` y `sameAs`; en la página del producto `Service` + `Offer` con precio placeholder, `FAQPage`, `VideoObject` de la película de ejemplo y `BreadcrumbList`).
- Enlaces: entre páginas de la misma versión, rutas relativas (`index.html`, `tu-pelicula.html`…). Para secciones no maquetadas (blog, ética, trabajo…) enlazar a la web real `https://alumafilms.es/es/...`.
- Formularios: estáticos, `method="post"` con `action` placeholder (`[ENDPOINT FORMULARIO]`), sin simular envíos ni mensajes de éxito falsos. Casilla de privacidad obligatoria con enlace a `[URL POLÍTICA DE PRIVACIDAD]`.

## 7. Placeholders

Cuando falte algo, se pone un placeholder **visible y coherente**, nunca un dato inventado:

- En texto: `[PRECIO: desde ___ €]`, `[PLAZO: ___ días]`, `[TESTIMONIO REAL: nombre, ocasión, cita]`, `[WHATSAPP: +34 ___]`, `[TELÉFONO]`, `[ZONA DE SERVICIO]`, `[NIF/RAZÓN SOCIAL]`, `[URL AVISO LEGAL]`, `[ENDPOINT FORMULARIO]`, `[LOGO SVG]`.
- En imagen/vídeo: caja con borde discontinuo y etiqueta `[PLACEHOLDER: descripción de lo que va aquí]`.
- Además, un comentario HTML `<!-- PLACEHOLDER: … -->` junto a cada uno, para localizarlos con una búsqueda.

**Prohibido inventar:** precios, plazos, testimonios, clientes, cifras, premios, valoraciones, número de parejas atendidas, «líderes»/«nº 1».

## 8. Artículos del blog que se pueden enlazar (se entregan en `blog-tu-pelicula/`)

URL futura `https://alumafilms.es/es/blog/<slug>`:

- `regalo-original-para-los-novios` — Regalo original para los novios: una película en la que ellos son los protagonistas
- `convertir-fotos-en-video-con-ia` — Convertir fotos en vídeo con IA: apps gratuitas o una película dirigida
- `regalo-aniversario-original` — Regalo de aniversario original: una película sobre vuestra historia
- `como-se-hace-una-pelicula-con-dos-fotos` — Así se hace una película de amor con dos fotos, paso a paso
- `wedding-planners-experiencias-personalizadas` — Wedding planners: cómo diferenciar vuestra propuesta con experiencias personalizadas

## 9. Entregable de cada versión

Carpeta `propuestas-web/version-<x>-<nombre>/` con:

- `index.html` y las páginas que pida su dirección de diseño.
- `styles.css` (+ `main.js` opcional).
- `NOTAS.md`: concepto, público, estructura de cada página, decisiones SEO/conversión, lista de placeholders y cómo llevarla a Lovable.

Las versiones no modifican nada fuera de su carpeta.
