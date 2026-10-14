# Auditoría de alumafilms.es — SEO, diseño y orientación comercial

**Fecha:** 14 de octubre de 2026
**Alcance:** código del repositorio `alumaestudio` (TanStack Start + React 19 + Tailwind v4, editado con Lovable), contenidos en `src/content/`, `sitemap.xml`/`robots.txt` y analítica del proyecto publicada en Lovable (16/09–13/10/2026).
**Limitación:** desde el entorno de trabajo no se puede abrir el dominio público (bloqueo de red), así que la auditoría se basa en el código fuente, en una captura de la portada facilitada por Lovable y en la analítica. No se han medido Core Web Vitals reales ni posiciones en Google; donde algo es una inferencia, se indica.

---

## 0. Resumen ejecutivo

La web tiene una identidad visual excelente y coherente (galería de cine oscura, oro escaso, serif editorial) y una base técnica sólida (SSR, i18n real en 4 idiomas, canonical y hreflang, sitemap generado). **El problema no es estético: es comercial.** La web está diseñada para impresionar, no para vender, y el producto con más potencial de ventas a corto plazo, **«Tu película» (dos fotos → una película)**, está escondido y mal conectado al contacto.

Los diez problemas que más dinero cuestan, por orden:

| # | Problema | Impacto | Esfuerzo |
|---|---|---|---|
| 1 | La portada no dice qué se vende ni tiene CTA: el titular nace oculto y «Tu película» no aparece | Muy alto | Bajo |
| 2 | El botón «Crea ya tu película» lleva a un formulario de **campañas B2B** sin opción para el producto | Muy alto | Bajo |
| 3 | El primer acceso a `alumafilms.es` redirige siempre a **gallego** desde el servidor | Alto | Bajo |
| 4 | Sin precio orientativo, sin plazos, sin testimonios, sin WhatsApp: el comprador particular no tiene con qué decidir | Muy alto | Medio |
| 5 | Sin páginas legales (aviso legal, privacidad, cookies) y formulario sin capa informativa RGPD | Alto (riesgo legal y de confianza) | Bajo |
| 6 | Sin `og:image` en casi todas las páginas: los enlaces compartidos en WhatsApp/Instagram/Facebook salen sin imagen | Alto (B2C vive de compartir) | Bajo |
| 7 | H1 y títulos sin las búsquedas reales («regalo original», «vídeo de boda», «película personalizada», «IA») | Alto | Bajo |
| 8 | Sin datos estructurados de producto/servicio, FAQ, negocio local ni migas | Medio | Bajo |
| 9 | 64 URLs de piezas con contenido mínimo (16 piezas × 4 idiomas, ninguna con desglose) y un blog de 3 artículos | Medio | Medio |
| 10 | Imágenes muy pesadas (PNG de 1,2–2,2 MB en el carrusel del manifiesto y en el hero) | Medio | Bajo |

**Resultado actual (analítica de Lovable, 16/09–13/10/2026):** 71 visitantes, 112 páginas vistas, **84 % de rebote**, **11 s de sesión media**, 1,58 páginas por visita. Tráfico orgánico casi nulo (Google 2, Bing 1); el 87 % llega directo. España es el primer país identificado (24 visitantes), seguido de EE. UU. (13); 30 visitas no tienen país. 56 % escritorio, 44 % móvil.

---

## 1. Lo que funciona (y hay que conservar)

- **Identidad de marca muy por encima de la media** del sector: paleta propia (tinta, hueso, papel, oro viejo, bruma), Instrument Serif + Inter, radios a cero, sin plantillas de startup. Transmite «estudio de cine», no «agencia».
- **Posicionamiento diferencial claro:** «Filmamos lo que tiene alma. Generamos lo imposible.» + transparencia (desglose rodado/generado) + cumplimiento del Reglamento Europeo de IA. Es un argumento de venta real frente a la «IA barata».
- **Base técnica correcta:** SSR (bueno para SEO), `canonical` y `hreflang` por página (`src/lib/seo.ts`), sitemap con alternates (`scripts/generate-sitemap.ts`), 404 localizada con `noindex`, redirecciones 301 de rutas sin idioma, `robots.txt` abierto, fachadas de YouTube/Instagram que no cargan JS de terceros hasta el clic.
- **Prueba social real con mucho peso:** el documental *Ronsel* para el **RC Celta**.
- **El copy del producto «Tu película»** (`src/content/love.json`) está bien escrito, es honesto y responde objeciones (FAQ).

---

## 2. Orientación comercial y conversión

### 2.1 La portada no vende

- El H1 vive dentro de la máscara del haz de luz (`src/components/aluma/LightBeamHero.tsx`, capa `maskedRefs[1]`): durante los primeros segundos el visitante ve una pantalla casi negra con un fragmento de titular. En la captura de Lovable solo se lee «luz».
- El texto del H1 («Ideas que merecen luz») no dice qué hace la empresa, para quién ni dónde.
- En toda la portada (`src/routes/$lang.index.tsx`) **no hay ninguna mención a «Tu película»**, ni precio, ni CTA de compra; el único enlace de acción es «Enviar» al final, que lleva a un formulario de campañas.
- «Trabajo seleccionado» muestra la primera pieza del JSON (ninguna está marcada como `destacada`), no *Ronsel*.
- En móvil aparece «Mueve el cursor para abrir la luz» aunque no hay cursor.

**Consecuencia probable:** el 84 % de rebote y los 11 s de sesión media son coherentes con una primera pantalla que no explica nada.

### 2.2 El embudo del producto está roto

- Los tres CTA de `LovePage.tsx` («Crea ya tu película», «Crea ya la película de vuestra pareja») llevan a `/es/contacto`.
- La página de contacto (`ContactPage.tsx`) se titula «Hablemos de tu próxima campaña.», coloca **antes del formulario** un generador de propuestas de campaña con IA (`BriefAdvisor`) y el desplegable «Tipo de proyecto» solo ofrece Ficción / Deporte / Documental / Publicidad (`ROOMS`). **No existe la opción «Tu película».**
- No se pide lo que el estudio necesita para presupuestar al particular: fecha del evento, ocasión, universo deseado, nombres.
- No hay canal inmediato (WhatsApp/teléfono). En regalos y bodas, la decisión se toma hablando.

### 2.3 Faltan los elementos que decide un comprador particular

| Elemento | Estado | Recomendación |
|---|---|---|
| Precio | No se publica («sin tarifas genéricas») | Publicar un **«desde ___ €»** o 2–3 paquetes. Sin ancla de precio, el particular asume que es caro y se va |
| Plazo | No se publica | Indicar plazo habitual y fecha límite para bodas («reserva con ___ semanas») |
| Testimonios / reseñas | No hay | Pedir 2–3 testimonios reales (aunque sean de pruebas con conocidos, con permiso) y enlazar a reseñas de Google |
| Caras del equipo | No hay | Página «Quiénes somos» con personas reales: en B2C se compra a personas |
| Ejemplos | 1 película de ejemplo | Añadir 2–3 fragmentos cortos (15–30 s) de universos distintos y versión vertical para redes |
| Garantías | Consentimiento sí; revisiones no | Explicar cuántas rondas de revisión del guion/montaje incluye |
| Canal rápido | No hay | WhatsApp Business con mensaje predefinido |
| Urgencia honesta | No hay | Calendario de fechas disponibles por temporada de bodas, San Valentín, Navidad |

### 2.4 Mensaje y segmentación

- La web mezcla dos negocios con compradores distintos: **B2B** (marcas, clubes, instituciones: «campañas») y **B2C** (parejas y regalos: «Tu película»), sin una puerta de entrada para cada uno. La navegación pone «Tu película» como un ítem más entre siete.
- El tono de marca (sobrio, sin exclamaciones) es un acierto, pero la web prioriza manifiesto sobre propuesta. Recomendación: mantener el tono y añadir **claridad**: qué es, para quién, cuánto, cuándo, cómo pedirlo.
- Wedding planners: hay un bloque, pero no una página propia con condiciones de colaboración, dossier descargable ni formulario profesional. Es el canal con más palanca (un planner = muchas bodas al año).

### 2.5 Captación y medición

- No hay captación de leads fríos (newsletter, guía descargable «Cómo elegir las fotos», dossier para planners).
- La única analítica visible es la de Lovable. Recomendado: **Google Search Console** (imprescindible para SEO), GA4 o similar con **eventos de conversión** (clic en CTA, envío de formulario, clic en WhatsApp, reproducción del vídeo de ejemplo) y, si se hace publicidad, píxel de Meta con consentimiento.

---

## 3. SEO

### 3.1 Técnico

| Hallazgo | Dónde | Impacto | Solución |
|---|---|---|---|
| La raíz `/` redirige en servidor siempre a `/gl` (en SSR no hay `window`, se usa `DEFAULT_LANG`) | `src/routes/index.tsx:14` | Alto: el visitante español y el que llega desde enlaces a la raíz ven gallego; en la analítica `/gl` suma 58 registros y `/es` 3 | Detectar `Accept-Language` en servidor o mostrar en `/` un selector de idioma indexable; valorar `es` como idioma por defecto y `x-default` |
| `og:image`/`twitter:image` solo se añaden si la URL empieza por `https://`, pero las imágenes de Lovable y los pósters son rutas relativas | `src/lib/seo.ts:26`, usos en `$lang.index.tsx`, `$lang.$section.index.tsx`, `$lang.$section.$slug.tsx` | Alto: enlaces compartidos sin imagen | Convertir a absoluta con `SITE_URL + ruta` antes de la comprobación |
| JSON-LD `VideoObject` con `thumbnailUrl` relativo y sin `uploadDate` en 15 de 16 piezas (`ano: null`) | `$lang.$section.$slug.tsx:109-111`, `pieces.json` | Medio: los vídeos no son elegibles para resultados enriquecidos | URL absoluta, `uploadDate` real y `duration` en ISO 8601 |
| JSON-LD `Article` sin `image`, `dateModified`, `publisher` con logo ni `mainEntityOfPage` | `$lang.$section.$slug.tsx` | Medio | Completar |
| Sin `FAQPage` en la página del producto (las 6 preguntas ya existen) | `LovePage.tsx` | Medio | Añadir JSON-LD FAQPage |
| Sin `Service`/`Product` + `Offer`, ni `LocalBusiness`/`ProfessionalService`, ni `BreadcrumbList` | — | Medio | Añadir |
| `Organization` sin `logo`, `sameAs` (redes), `email`, `contactPoint` | `src/lib/seo.ts` | Bajo-medio | Completar |
| El artículo del producto (`duas-fotos-unha-pelicula`) tiene fecha **16/10/2026** (futura) y **no está en el sitemap** | `src/content/posts.json`, `public/sitemap.xml` | Medio | Corregir fecha y regenerar el sitemap (`scripts/generate-sitemap.ts`) |
| Sitemap sin `lastmod` | `scripts/generate-sitemap.ts` | Bajo | Añadir fecha de modificación |
| 64 URLs de piezas con contenido mínimo (título + una línea), ninguna con desglose pese a ser la promesa de marca | `pieces.json` (16 piezas, 16 con `desglose: []`) | Medio: «thin content» multiplicado por 4 idiomas | Escribir desglose y ficha de cada pieza o agrupar en una página de sala |
| Se cargan 3 familias de Google Fonts en todas las páginas (Playfair solo hace falta en ruso) y la serif se pide dos veces (preload + stylesheet) | `src/routes/__root.tsx:107-124` | Bajo-medio (LCP) | Cargar Playfair solo en `/ru`, autoalojar fuentes o usar `font-display: swap` con subset |
| Imágenes pesadas: 9 PNG del manifiesto ≈ 13,8 MB en total; hero PNG de 1,65 MB; miniatura de la película PNG de 2,1 MB; pósters JPG de 1600 px sin `srcset` | `src/assets/**`, `public/posters` | Medio (móvil) | WebP/AVIF, `srcset`/`sizes`, 1200 px máx. para tarjetas |
| Enlaces legales del pie son `<span>` sin destino | `Footer.tsx:56-58` | Alto (legal) y bajo (SEO) | Crear las páginas y enlazarlas |
| `x-default` apunta a gallego | `src/lib/seo.ts` | Bajo | Apuntar a `es` o a un selector |

### 3.2 On-page y contenidos

- **H1 de portada sin palabras clave** («Ideas que merecen luz»). Propuesta: «Cine con inteligencia artificial, dirigido por personas» o «Estudio de cine e IA en Galicia», dejando «La luz se decide» como firma.
- **Página del producto:** el `title` («Tu película personalizada — ALUMA») y la `description` están bien encaminados, pero el H1 «Tu película personalizada» no recoge cómo busca la gente. Las búsquedas reales giran en torno a «regalo original para los novios», «vídeo para proyectar en la boda», «regalo de aniversario original», «convertir fotos en vídeo con IA», «película personalizada», «pedida de mano original». La página debe nombrarlas en H2 y FAQ.
- **Blog:** 3 artículos (uno es el anuncio del producto). Para posicionar el producto hace falta un clúster de contenidos alrededor de bodas, regalos y vídeo con IA, con enlaces internos hacia `/es/tu-pelicula`. **Se entregan 30 artículos en `../blog-tu-pelicula/`.**
- **El artículo no enlaza al producto:** `BlogArticle` renderiza solo texto; no hay CTA ni enlaces internos al final de cada post. Hay que añadir un bloque CTA y permitir enlaces en el cuerpo.
- **Idiomas:** mantener cuatro idiomas multiplica por cuatro el coste de cada contenido. Prioridad comercial: **español** (mercado nacional) y **gallego** (local y de marca). El ruso solo compensa si hay un canal de venta concreto (la analítica registra 1 visita de Rusia).
- **SEO local:** no hay dirección, zona de servicio ni teléfono (NAP). Crear y verificar **Perfil de Empresa de Google** («productora audiovisual» en la zona), enlazarlo y pedir reseñas.

### 3.3 Visibilidad en buscadores con IA (AEO)

El briefing original pedía que un motor de IA pudiera citar la web para «estudio audiovisual IA Galicia». Para eso faltan frases declarativas claras (qué, quién, dónde, para quién, desde cuándo), FAQ en HTML visible con su schema, y páginas de servicio con datos concretos. Las tres propuestas lo incorporan.

---

## 4. Diseño y experiencia de usuario

### 4.1 Puntos fuertes
Dirección de arte coherente, mucho aire, jerarquía editorial, sin ruido. Carrusel del manifiesto accesible. Fichas de pieza limpias. Respeto de `prefers-reduced-motion`.

### 4.2 Problemas

| Hallazgo | Detalle | Recomendación |
|---|---|---|
| Hero que esconde el mensaje | El efecto firma tapa el titular y los CTA | Mantener el gesto de luz como capa decorativa sobre un titular siempre legible |
| Contraste insuficiente en secciones claras | Oro `#B08D4C` sobre papel: **2,95:1**; bruma sobre papel: **3,33:1** (AA pide 4,5:1 en texto normal). Afecta a etiquetas del método y de universos | Usar un oro oscurecido para texto sobre papel (p. ej. `#8A6A2F`) y tinta al 70 % para secundarios |
| Texto de 11 px en mayúsculas con opacidad reducida | Pie: bruma al 70 % sobre tinta | Subir a 12–13 px y opacidad completa |
| Navegación saturada | 7 secciones + 4 idiomas, sin botón de acción | Agrupar (Trabajo, Tu película, Estudio, Blog, Contacto) y añadir CTA |
| Punto suelto en tarjetas | «Ficción · » cuando la pieza no tiene año | `WorkPage.tsx:78`, `$lang.index.tsx:139`: ocultar el separador si `ano` es nulo |
| Sin caras ni personas | Ni equipo ni fotos de rodaje | Añadir equipo y making-of: refuerza «dirigido por personas» |
| Logo como texto | «Aluma» en mayúsculas espaciadas | Logotipo SVG propio |
| Móvil | 44 % del tráfico; hero de 86 vh que no explica nada | Primera pantalla móvil con titular, beneficio y CTA visibles sin scroll |

---

## 5. Aspectos legales y de confianza (España)

- **LSSI-CE:** falta el aviso legal con titular, NIF, domicilio y email. Es obligatorio para webs con actividad económica.
- **RGPD:** el formulario recoge nombre, email, teléfono y mensaje sin primera capa informativa (responsable, finalidad, legitimación, derechos) ni enlace a la política de privacidad.
- **Cookies:** si se añaden analítica o píxeles, hará falta banner de consentimiento.
- **Imagen e IA:** el compromiso de consentimiento por escrito está bien comunicado. Conviene publicar un modelo de autorización de uso de imagen para «Tu película» (genera confianza y agiliza la venta).

---

## 6. Plan de acción priorizado

### Semana 1 — arreglos rápidos (en el proyecto actual de Lovable)
1. Portada: titular legible desde el primer segundo, H1 con palabras clave y dos CTA («Crea vuestra película» / «Proyectos para marcas»). Añadir una sección «Tu película» en la portada.
2. Contacto: añadir «Tu película» al desplegable (o un formulario propio en la página del producto con fecha del evento y ocasión) y mover `BriefAdvisor` detrás del formulario o a una página para marcas.
3. Raíz `/`: dejar de forzar gallego en servidor.
4. `og:image` absoluta en todas las páginas.
5. Páginas legales y capa RGPD en formularios.
6. Corregir la fecha del artículo del producto y regenerar el sitemap.
7. WhatsApp Business y teléfono visibles.

### Mes 1 — conversión y contenidos
8. Precio «desde» o paquetes y plazo orientativo.
9. Testimonios reales y Perfil de Empresa de Google.
10. Datos estructurados: `Service` + `Offer`, `FAQPage`, `BreadcrumbList`, `ProfessionalService`.
11. Landing para wedding planners con dossier descargable.
12. Empezar a publicar el calendario de 30 artículos (2 por semana) con CTA al producto.
13. Search Console + eventos de conversión.

### Trimestre — autoridad y escala
14. Desglose «rodado/generado» de al menos 4 piezas (empezando por *Ronsel*).
15. Optimización de imágenes (WebP/AVIF, `srcset`).
16. 2–3 películas de ejemplo más, cortas y verticales para redes.
17. Revisar si el ruso compensa su coste de mantenimiento.

---

## 7. Las tres propuestas de rediseño

| | Versión A — Sala oscura | Versión B — Tu película primero | Versión C — Estudio |
|---|---|---|---|
| Idea | Evolución de la marca actual, que ahora vende | La portada es la landing del producto | Productora con catálogo de servicios y autoridad |
| Público principal | Mixto: parejas y marcas, con dos puertas de entrada | Parejas, regalos y wedding planners | Marcas, clubes, agencias, instituciones; producto como línea propia |
| Estética | Oscura y cinematográfica, haz de luz conservado | Clara y cálida, editorial, bandas de cine | Retícula suiza, clara con bloques de tinta, fichas técnicas |
| Páginas | Portada + Tu película + Trabajo | Landing del producto + Wedding planners | Portada + Tu película + Caso Ronsel |
| Cuándo elegirla | Si se quiere mantener la marca tal cual y corregir la venta | Si el objetivo inmediato es vender «Tu película» | Si se quiere crecer en B2B sin perder el producto |

Las tres resuelven los puntos 1, 2, 4, 6, 7 y 8 del resumen, usan los recursos existentes del repositorio y marcan con placeholders todo lo que falta (precio, plazo, testimonios, WhatsApp, logo SVG, vídeos MP4, textos legales).
