# Versión C — «Estudio»

Propuesta de rediseño de alumafilms.es en HTML/CSS/JS estático. Maquetada en español. Cumple el `BRIEF-DISENO.md` común (marca, producto, reglas técnicas, SEO, accesibilidad y política de placeholders).

## 1. Concepto

ALUMA como **productora seria** para marcas, clubes, agencias, instituciones y wedding planners, que además tiene una **línea de producto clara para particulares** («Tu película»). La web demuestra oficio con lo que un cliente B2B quiere ver antes de pedir presupuesto: un **catálogo de servicios** con público, entregable y ejemplo real; **fichas técnicas** y **créditos**; una **filmografía** completa; el **desglose rodado / generado / integrado** como marca de la casa; y un **caso real** (Ronsel, RC Celta).

Estética: editorial moderna con retícula suiza de 12 columnas. Predominio claro (papel `#FBF9F4`) con grandes bloques de tinta (`#16130F`) que marcan el ritmo vertical (caso destacado, banda de producto, secciones clave del producto, pie). Numeración grande en serif, filetes finos, datos tabulares tipo ficha técnica, oro (`#B08D4C`) solo para filetes, marcadores, foco y etiquetas sobre tinta.

Es deliberadamente distinta de una versión oscura cinematográfica (aquí la tinta es bloque, no atmósfera) y de una landing cálida de producto (aquí el producto es una línea más del catálogo, con su propia ficha), pero reconocible como ALUMA: serif editorial, oro escaso, radio 0, sin sombras, voz sobria.

### Tipografía

- **Instrument Serif** (regular + itálica) para titulares, numeración y datos destacados.
- **Inter** 400/500 para texto corrido y formularios.
- **Inter Tight** 500/600 para UI, etiquetas, navegación, botones, numeración de filas y datos tabulares. Justificación: su tracking más cerrado a 500–600 da el aire de «ficha técnica / créditos» que pide la dirección de diseño y diferencia claramente la UI del texto de lectura.
- Escala fluida con `clamp()`; H1 44→88 px; H2 34→72 px; numeración de sección 60→128 px.

### Color y contraste

Tokens de marca sin cambios. Dos derivados accesibles: `--gris #5B6368` (texto secundario sobre papel, 5,8:1) y `--oso-70 #B1AEA7` (secundario sobre tinta, 8,4:1), porque `--bruma` no alcanza AA sobre papel (3,3:1). El oro no se usa como texto sobre papel (2,9:1); sobre tinta sí (6:1), para etiquetas.

## 2. Público

1. **B2B**: responsables de marketing/comunicación de marcas, agencias, clubes y federaciones, instituciones y fundaciones, productoras. Entran por «Servicios», comprueban el caso Ronsel y la filmografía, y acaban en «Pedir propuesta» (formulario B2B con tipo de proyecto, presupuesto orientativo y plazo).
2. **Particulares y parejas** («Tu película»): entran por el CTA secundario del hero, la línea 01 del catálogo o la banda de producto, y llegan a `tu-pelicula.html`, con su propio formulario corto. Nunca se les envía al formulario B2B (fallo 2 de la auditoría).
3. **Wedding planners**: sección propia en la página del producto, con CTA y enlace a la nota del blog.

## 3. Estructura de cada página

### `index.html`
- **Cabecera** fija: marca (comentario `PLACEHOLDER: logo SVG`), navegación (Servicios, Trabajo, Tu película, Método, Estudio, Contacto), conmutador GL·ES·EN·RU hacia la web real, CTA «Pedir propuesta». Menú móvil accesible (botón con `aria-expanded`/`aria-controls`, panel de tinta, Escape cierra y devuelve el foco, bloqueo de scroll).
- **Hero** en retícula 7/5: H1 con palabras clave («Producción audiovisual con IA, dirigida por cineastas, en Galicia»), subtítulo, dos CTA y fachada de YouTube de *Ronsel* (póster local, LCP con `fetchpriority="high"`). Franja de prueba con datos reales: RC Celta (Ronsel 2026, 31:42), 16 piezas, 4 idiomas, Reglamento (UE) 2024/1689.
- **01 Servicios**: catálogo de 5 líneas en filas (número, nombre, para quién, qué entregamos, ejemplo real, CTA): Tu película · Publicidad cinematográfica para redes («producción en días, no en semanas», copy del blog) · Deporte y clubes · Documental y memoria · Ficción y cortos.
- **02 Caso destacado** (tinta): póster de Ronsel, ficha técnica (cliente, año, duración, sala, idioma, aportación), sinopsis real y enlace a `caso-ronsel.html`.
- **03 Filmografía**: tabla de 16 piezas (nº, título ES + título original GL, sala, año, duración, idioma) con previsualización del póster al pasar el ratón o enfocar una fila (panel pegajoso en escritorio; oculto en móvil, donde la tabla se apila). Enlaces a `https://alumafilms.es/es/trabajo/<slug>`.
- **04 Método**: diagrama Filmamos → Generamos → Integramos y leyenda del desglose (rodado / generado / integrado) sin cifras inventadas.
- **05 Estudio**: «Alumar: dar luz», manifiesto (3 líneas reales), texto del estudio e imagen local `o-oficio.jpg`.
- **06 Ética** como ventaja competitiva: checklist de los 4 puntos reales + lectura práctica para quien contrata.
- **07 Tu película** (tinta): promesa, imagen del CDN (no carga en el sandbox), ficha con `[PRECIO: desde ___ €]` y `[PLAZO: ___ días]`, CTA a `tu-pelicula.html`.
- **08 Brief con IA** (teaser): textarea que **no genera nada**; el botón lleva al formulario y copia el texto al mensaje. Comentario HTML indica que en producción se conecta a `proposeApproach` (`src/lib/brief.functions.ts`).
- **09 Contacto B2B**: nombre, empresa, rol, email, teléfono, tipo de proyecto, presupuesto orientativo (`[validar rangos]`), fecha/plazo, mensaje, privacidad. Canales directos con placeholders de WhatsApp y teléfono. Aviso para parejas que lleva al formulario del producto.
- **Pie** (tinta): datos de empresa y legales en placeholder, redes reales, mapa del sitio, idiomas.
- **JSON-LD**: `Organization`+`ProfessionalService` (areaServed, sameAs, knowsLanguage, email), `ItemList` de 5 `Service`, `BreadcrumbList`.

### `tu-pelicula.html`
- Hero: eyebrow real, H1 «Tu película personalizada», promesa, 3 hechos, dos CTA, imagen del CDN.
- **01 Ficha técnica** (formato, duración, entrada, protagonistas, exclusividad, universos, consentimiento, precio y plazo en placeholder) + «Cómo pedirla».
- **02 No otro vídeo de boda** (tinta) con el copy literal.
- **03 Película de ejemplo**: fachada de YouTube `GvkblfoP1J8` (miniatura del CDN).
- **04 Proceso** (3 pasos literales de `love.json`).
- **05 Universos**: tabs accesibles (WAI-ARIA, flechas/Home/End, activación automática) con placeholder de fotograma por universo.
- **06 Ocasiones**: boda, aniversario, pedida, regalo.
- **07 Wedding planners** (tinta): copy literal, 3 puntos, CTA y enlace al artículo del blog.
- **08 FAQ** completa (6 preguntas, `details/summary`) + «Para seguir leyendo» con los 5 artículos del blog.
- **09 Formulario**: nombres, email, teléfono/WhatsApp, ocasión, fecha del evento, universo, historia, privacidad; campo oculto `producto=tu-pelicula`; canales directos.
- **JSON-LD**: `Service` + `Offer` (precio placeholder), `VideoObject`, `FAQPage`, `BreadcrumbList`.

### `caso-ronsel.html`
- Migas de pan, póster (LCP), H1 «Ronsel / Celta, Vigo e mar», ficha técnica (cliente, año, duración, sala, idioma, aportación; producción `[validar con el equipo]`, tomada del propio cartel).
- **01 Sinopsis** real (tinta). **02 La película**: fachada YouTube `ngDsA0Ya6RE`.
- **03 El desmontaje**: bloques alternos Rodado / Generado / Integrado con fotogramas `[PLACEHOLDER: …]` y textos `[validar con el equipo]`. Solo se afirma lo verificable: que ALUMA contribuyó con las animaciones.
- **04 Herramientas**: chips `[validar: …]`.
- **05 Siguiente pieza**: «No disponible en App Store» + CTA de propuesta.
- **JSON-LD**: `VideoObject` (duración `PT31M42S`, `productionCompany` ALUMA, `inLanguage` gl) + `BreadcrumbList`.

### Compartidos
- `styles.css`: tokens, reset, retícula, componentes (cabecera, fachada, catálogo, ficha, tabla, método, checklist, tabs, FAQ, formularios, pie), responsive 360→1920, `prefers-reduced-motion`.
- `main.js` (vanilla, sin dependencias): menú móvil, fachada YouTube (`youtube-nocookie`, el iframe solo se crea al pulsar), previsualización de la filmografía, tabs, traspaso del brief al formulario.

## 4. Decisiones SEO y de conversión

- **Resuelve los 6 fallos de la auditoría**: H1 con palabras clave y visible desde el primer píxel; CTA doble en el hero (propuesta / producto); formulario de pareja separado del B2B; conmutador de idioma explícito con `hreflang` y `x-default` → ES; `og:image` absoluta en todas las páginas; `FAQPage`, `Service`/`Offer`, `VideoObject`, `ProfessionalService`; el caso del RC Celta en portada (hero + sección propia + filmografía); placeholders visibles de WhatsApp y teléfono.
- `<title>` ≤ 60 y `description` ≤ 155 en las tres páginas; `canonical` a `https://alumafilms.es/es/...`; `theme-color`; Open Graph + Twitter.
- Enlaces internos de la versión en rutas relativas; secciones no maquetadas (blog, ética, trabajo, piezas) a la web real.
- Prueba social solo con datos verificables (RC Celta, 16 piezas, 4 idiomas, Reglamento (UE) 2024/1689). Sin testimonios, logos, cifras ni precios inventados.
- Accesibilidad: un H1 por página, jerarquía sin saltos, `alt` en todas las imágenes, landmarks, `label` en todos los campos, foco visible 2 px oro, contraste AA, `lang="gl"` en títulos gallegos, tabla con `caption` y `scope`, tabs y menú con ARIA, `prefers-reduced-motion`.
- Rendimiento: `width`/`height` o `aspect-ratio` en todas las imágenes, `loading="lazy"` salvo la LCP, `preconnect` a Google Fonts, `display=swap`, sin frameworks ni build. YouTube solo al pulsar.

## 5. Placeholders (buscar `PLACEHOLDER` y `[` en el HTML)

Texto: `[PRECIO: desde ___ €]`, `[PLAZO: ___ días]`, `[WHATSAPP: +34 ___]`, `[TELÉFONO]`, `[ZONA DE SERVICIO]`, `[NIF/RAZÓN SOCIAL]`, `[DIRECCIÓN POSTAL]`, `[URL AVISO LEGAL]`, `[URL POLÍTICA DE PRIVACIDAD]`, `[URL COOKIES]`, `[ENDPOINT FORMULARIO]` (action de los dos formularios), `[validar rangos]` (presupuesto), `[validar con el equipo]` y `[validar: …]` (caso Ronsel), `[LOGO SVG]` (comentario en cabecera y pie).

Imagen/vídeo: cajas con borde discontinuo `[PLACEHOLDER: fotograma …]` en los universos de «Tu película», en el desmontaje de Ronsel y en la previsualización de las dos piezas verticales de Instagram.

JSON-LD: `Offer.price = "[PRECIO]"`, `VideoObject.uploadDate` y `duration` de la película de ejemplo. **Sustituir antes de publicar**: Google ignora o penaliza valores no válidos.

Imágenes remotas del CDN de Lovable (`love-hero.jpg`, `love-film-thumbnail.png`): no cargan en el sandbox; en el navegador del cliente sí. Sus contenedores tienen `aspect-ratio`, color de marca y `alt`.

## 6. Cómo portarla a Lovable

1. **Tokens**: añadir `--gris` y `--oso-70` al tema (`src/index.css`); cargar `Inter Tight` 500/600 junto a Inter e Instrument Serif. Conservar el token de fuente cirílica para RU.
2. **Registro de secciones**: cada sección numerada (`.head` + bloque) se corresponde con un componente del registro localizado existente; los copys van a `src/content/i18n/<lang>.json` y `love.json` (todos los textos de esta maqueta en ES ya existen allí o se añaden como claves nuevas: catálogo de servicios, franja de prueba, ética práctica, ocasiones, textos del caso).
3. **Filmografía**: generar la tabla desde `pieces.json` (título por idioma, `sala`, `ano`, `duracion`, `idioma`, `posterUrl`); la previsualización es un `useState` con el `slug` activo.
4. **Caso Ronsel**: convertir `caso-ronsel.html` en la plantilla de `/$lang/trabajo/$slug` usando `desglose` y `ferramentas` de `pieces.json` (hoy vacíos: rellenar con el equipo).
5. **Formularios**: el B2B sustituye al actual de contacto (añadir empresa, rol, presupuesto y plazo al esquema validado con `LANGS`); el de «Tu película» es nuevo, con `producto=tu-pelicula` para enrutar la notificación. Sin estados de éxito simulados.
6. **Brief con IA**: el teaser llama a `proposeApproach` y muestra la respuesta en la misma caja; el botón «Pedir propuesta con este brief» prerrellena el mensaje del formulario.
7. **SEO**: meta por página y JSON-LD en el `head` de cada ruta; `x-default` → ES; regenerar `scripts/generate-sitemap.ts` tras añadir la página de caso.
8. **Redirección de idioma**: resolver en el servidor con `Accept-Language` antes de redirigir `/` a `/gl` (fallo 3 de la auditoría).
