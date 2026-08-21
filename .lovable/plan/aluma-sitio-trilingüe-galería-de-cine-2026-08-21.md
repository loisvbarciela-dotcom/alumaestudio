# ALUMA — sitio trilingüe, galería de cine

Sitio multipágina oscuro, GL/ES/EN, con el gesto firma de la luz dirigida en la home. Se sigue el briefing al pie de la letra: paleta, tipografía, copys y estructura tal como están escritos.

## Nota sobre el stack

El proyecto ya corre sobre TanStack Start (React 19 + Vite + TypeScript + Tailwind v4), que es la base fijada de la plataforma. Es equivalente en resultado a React + Vite: estático, rápido, con SSR para SEO real (mejor para hreflang y Open Graph por idioma). Los tokens van en `src/styles.css` con `@theme` (equivalente a `tailwind.config` en Tailwind v4).

## Diseño base

- Tokens: tinta #16130F, oso #F4F0E8, papel #FBF9F4, ouro #B08D4C, bruma #7E8B92, salvia #6B7A5E. Nada más.
- Oro con avaricia: una línea, un borde, un subrayado en hover, foco de teclado 2px. Nunca fondo de botón.
- Tipografía: Instrument Serif (display) + Inter (texto), cargadas con `<link>` en la raíz, `font-display: swap`, preload de la serif. Escala con salto: hero clamp(3.5rem, 10vw, 8rem), cuerpo 16–17px, etiquetas 11px mayúsculas tracking .12em.
- Radius 0, sin sombras, sin glass. Márgenes 6vw+, secciones separadas 12rem en desktop.
- Sin conmutador claro/oscuro: oscuro por diseño con secciones en papel.

## Idiomas y rutas

Rutas con prefijo de idioma y slugs traducidos:

```text
/gl/            /es/              /en/
/gl/traballo    /es/trabajo       /en/work
/gl/traballo/$slug  ...           ...
/gl/metodo      /es/metodo        /en/method
/gl/etica       /es/etica         /en/ethics
/gl/estudio     /es/estudio       /en/studio
/gl/contacto    /es/contacto      /en/contact
```

`/` detecta idioma del navegador (fallback gallego) y redirige; la elección se recuerda en localStorage. Conmutador GL/ES/EN en la cabecera que mantiene la página actual. i18n con diccionarios JSON por idioma, nada de texto duro en componentes.

## Elemento firma (home)

Vídeo destacado en bucle, muted, al 15% de luminosidad. Máscara `mask-image` con radial-gradient cuyo centro sigue al cursor con interpolación lerp (retardo físico). El titular vive dentro del haz. A los 3s sin interacción o al primer scroll, la luz se abre y revela el vídeo entero. En móvil el haz se abre solo y deriva suavemente. Con `prefers-reduced-motion`, vídeo revelado desde el inicio sin animación.

## Páginas

- **Home**: hero firma, manifiesto (tres líneas, mucho aire), traballo seleccionado (una pieza grande + dos), método en tres pasos, contacto y pie. Sin servicios, sin contadores, sin CTA flotante.
- **Traballo**: tres salas (Deporte · Documental · Publicidade) como etiquetas de texto, cuadrícula asimétrica, preview mudo de 3s al hover, título debajo en pequeño.
- **Caso**: pieza a ancho completo, ficha mínima (cliente/sala/ano/duración), *O desmontaxe* con bloques alternados fotograma + etiqueta rodado (línea oso) / xerado (línea ouro) y dos líneas de decisión, herramientas en texto pequeño, navegación a la siguiente pieza. 3 casos con placeholders visibles `[PENDIENTE: vídeo]`.
- **Método / Ética / Estudio / Contacto**: tipografía grande, poco texto. Formulario: nombre, email, tipo de proyecto (las tres salas), mensaje; envío a endpoint configurable.

## Contenido

`src/content/` con `pieces.json` (slug, titulo{gl,es,en}, sala, ano, cliente, duracion, videoUrl, posterUrl, desglose[{tipo, imagen, texto{gl,es,en}}], ferramentas[]) y `i18n/{gl,es,en}.json` con los copys literales del briefing. Sin clientes ni testimonios inventados.

## Rendimiento, accesibilidad, SEO

- Vídeos muted/loop/playsinline/preload=metadata, carga diferida fuera del viewport; imágenes WebP/AVIF con srcset.
- Contraste AA, foco visible en ouro 2px, alt en todo, pistas de subtítulos preparadas, reduced-motion en todas las animaciones.
- `head()` por ruta e idioma con title/description/OG, hreflang entre las tres versiones, JSON-LD Organization (global) y VideoObject (casos), sitemap.xml y robots.

## Orden

1. Tokens, tipografía, layout, i18n y conmutador. 2. Home con el gesto de luz. 3. Galería y plantilla de caso. 4. Método, Ética, Estudio, Contacto. 5. Pasada de rendimiento, accesibilidad y SEO.
