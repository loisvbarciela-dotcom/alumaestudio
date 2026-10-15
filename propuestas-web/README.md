# Propuestas para alumafilms.es — octubre 2026

Entregables del análisis y rediseño de la web de ALUMA. Nada de esta carpeta modifica la web publicada: es una carpeta aparte, fuera de `src/` y `public/`, que Lovable no sirve.

| Carpeta / archivo | Contenido |
|---|---|
| [`auditoria/AUDITORIA.md`](auditoria/AUDITORIA.md) | Auditoría de SEO, diseño y orientación comercial con datos reales de analítica y plan de acción priorizado |
| [`version-a-sala-oscura/`](version-a-sala-oscura/) | **Versión A — Sala oscura:** evolución de la marca actual que ahora vende. Portada, Tu película y Trabajo |
| [`version-b-tu-pelicula/`](version-b-tu-pelicula/) | **Versión B — Tu película primero:** la portada es la landing de venta del producto. Landing y página para wedding planners |
| [`version-c-estudio/`](version-c-estudio/) | **Versión C — Estudio:** productora con catálogo de servicios y caso real. Portada, Tu película y caso Ronsel (RC Celta) |
| [`blog-tu-pelicula/`](blog-tu-pelicula/) | 30 artículos SEO para vender «Tu película» en español, gallego, inglés y ruso, con calendario editorial y guía de publicación. Versión lista para la web en `src/content/posts-tu-pelicula.json` |
| [`capturas/`](capturas/) | Capturas de escritorio (página completa) y móvil (primera pantalla) de cada página |
| [`BRIEF-DISENO.md`](BRIEF-DISENO.md) | Briefing común de las tres versiones (marca, producto, recursos, reglas) |
| [`assets/img/`](assets/img/) | Copia de las imágenes existentes del repositorio que usan las versiones |
| [`index.html`](index.html) | Índice navegable de todo lo anterior |

## Cómo verlas

Las versiones son HTML estático, sin instalación:

```sh
# desde la raíz del repositorio
python3 -m http.server 8000
# y abrir http://localhost:8000/propuestas-web/
```

También se pueden abrir con doble clic en `propuestas-web/index.html`, o arrastrar la carpeta `propuestas-web` a cualquier hosting estático (por ejemplo, para enseñarlas a otra persona). Las páginas llevan `canonical` a alumafilms.es; si se suben a un dominio público de pruebas, conviene protegerlo o añadir `noindex` para no duplicar contenido.

**Imágenes remotas:** la imagen principal y la miniatura de «Tu película» se cargan desde el CDN de Lovable (`https://alumafilms.es/__l5e/...`), y los vídeos desde YouTube. Necesitan conexión. Si no cargan, cada versión muestra un fondo de marca o una imagen local; por eso en algunas capturas aparece un recuadro de placeholder en lugar del fotograma.

## Qué tienen en común las tres versiones

- Titular con palabras clave **legible desde el primer segundo** y CTA visibles sin hacer scroll.
- **«Tu película» presente y bien conectada**: formulario propio con ocasión, fecha del evento y universo (se acabó mandar a las parejas a un formulario de campañas).
- **Prueba social real**: el documental *Ronsel* para el RC Celta.
- **SEO técnico completo** en cada página: `title` y `description` dentro de límites, `canonical`, `hreflang` (gl/es/en/ru + x-default), Open Graph y Twitter con imagen absoluta, y JSON-LD (`Organization`/`ProfessionalService`, `Service` + `Offer`, `FAQPage`, `VideoObject`, `BreadcrumbList`).
- **Accesibilidad**: un H1 por página, foco visible, menú móvil y pestañas operables con teclado, `prefers-reduced-motion`.
- **Rendimiento**: sin frameworks, vídeos de YouTube que solo se cargan al pulsar, imágenes diferidas.
- **Honestidad**: ni un precio, plazo, testimonio, cliente o cifra inventados. Todo lo que falta está marcado.

## Verificación realizada

En las 9 páginas (navegador Chromium automatizado, 360 px y 1440 px):

- 0 errores de JavaScript en consola.
- Sin scroll horizontal a 360 px.
- Todos los enlaces relativos, anclas e imágenes locales existen.
- Un único H1, `title` ≤ 60 caracteres, `description` ≤ 155, `canonical` presente y JSON-LD válido.
- Sin exclamaciones ni datos inventados en el texto visible.

## Placeholders que hay que completar

Búsqueda rápida en cualquier versión: `grep -n "PLACEHOLDER\|\[PRECIO\|\[PLAZO\|\[WHATSAPP\|\[URL\|\[ENDPOINT\|validar" *.html`

Los principales, comunes a las tres:

1. **Precio de partida y plazo** de «Tu película» (`[PRECIO: desde ___ €]`, `[PLAZO: ___ días]`).
2. **WhatsApp y teléfono.**
3. **Endpoint de los formularios** (en Lovable, conectarlos a la función de contacto existente y añadir «Tu película» a los tipos de proyecto).
4. **Páginas legales**: aviso legal (con NIF/razón social), privacidad y cookies.
5. **Logo en SVG.**
6. **Testimonios reales** (versión B) y **fotogramas** de los universos y del desglose de Ronsel.
7. **Vídeo MP4 en bucle** para el hero (versión A).

Cada carpeta tiene un `NOTAS.md` con la lista completa de su versión y cómo llevarla a Lovable.

## Cómo elegir

- **¿Quieres vender «Tu película» ya?** → Versión B. Es la que más convierte en B2C y la más rápida de lanzar (puede vivir como landing en `/es/tu-pelicula` sin tocar el resto).
- **¿Quieres conservar la marca tal cual y arreglar la venta?** → Versión A.
- **¿Quieres crecer con marcas, clubes e instituciones?** → Versión C.
- **Combinación recomendada:** portada de la A o la C, página de producto de la B y página de wedding planners de la B.

## Cómo llevarla a Lovable

Lovable trabaja sobre el proyecto React actual (TanStack Start). La forma más segura es pedirle que **reproduzca una sección cada vez** usando los componentes, rutas e i18n existentes, adjuntando la captura y el HTML de referencia. Por ejemplo:

> «Rehaz la portada siguiendo `propuestas-web/version-a-sala-oscura/index.html` y su captura: mantén SiteShell, las rutas por idioma y los textos en `src/content/i18n/*.json`. El titular y los dos CTA deben verse desde el primer pintado. Añade la sección de “Tu película” y el bloque de Ronsel.»

Antes de publicar, conviene aplicar también los arreglos rápidos de la auditoría (redirección de idioma, `og:image` absoluta, formulario de «Tu película», páginas legales).
