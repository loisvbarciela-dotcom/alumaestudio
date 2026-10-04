# Aluma: Where Light Is Decided

ALUMA — Briefing de web para Lovable

Pega este documento entero como primer prompt en Lovable. Está escrito para generarse de una sola pasada y quedar publicable en aluma.gal.

0. Qué estamos construyendo

Web pública de Aluma, un estudio audiovisual con sede en Galicia que produce piezas de calidad cinematográfica combinando rodaje real y generación por IA.

No es una web de agencia de marketing ni una landing de producto SaaS. Es una galería de cine: la obra ocupa la pantalla, el texto es mínimo y editorial, y la navegación se siente como recorrer salas. Si el resultado se parece a una plantilla de startup —hero centrado con degradado, tres tarjetas de features, sección de logos de clientes, testimonios en carrusel— está mal.

Trabajo a realizar: sitio estático multipágina, responsive, trilingüe, listo para desplegar.

1. Posicionamiento y voz

La tesis: la máquina ejecuta, compone y renderiza; solo el ser humano siente, dirige y asume el riesgo artístico. Aluma no vende "vídeos con IA", vende artesanía audiovisual dirigida.

El método: híbrido. Se filma lo que tiene alma —la mirada de un actor, la piel real, el producto del cliente— y se genera lo que sería imposible o inalcanzable. Cada pieza se publica con su desglose: qué se filmó, qué se generó, cómo se integró.

El nombre: alumar es verbo gallego, alumbrar, dar luz. No hacer luz: decidir dónde cae.

Tono de voz: sobrio, culto, confiado. Frases cortas. Cero jerga de marketing, cero hype de IA, cero exclamaciones. Nada de "revolucionamos", "potenciamos", "soluciones innovadoras", "unleash", "elevate". La obra habla. Si una frase podría estar en la web de cualquier agencia, reescríbela.

2. Idiomas

Tres versiones con conmutador visible en la cabecera: GL / ES / EN.

Gallego: idioma por defecto en aluma.gal. No es decorativo — es parte del posicionamiento y un requisito del dominio .gal.

Español: mercado nacional.

Inglés: mercado internacional.

Implementa i18n real con archivos de traducción separados (no texto duro en los componentes) y rutas /gl/, /es/, /en/. Detecta idioma del navegador en la primera visita, con fallback a gallego, y recuerda la elección.

Los textos de las tres versiones están en la sección 8. Úsalos literalmente.

3. Sistema de diseño (tokens)

Deriva todo de esta paleta. No introduzcas colores nuevos, no uses degradados de dos colores de moda, no uses acentos verde ácido ni terracota.

--tinta:    #16130F;  /* fondo dominante, casi negro cálido */
--oso:      #F4F0E8;  /* hueso — texto sobre tinta */
--papel:    #FBF9F4;  /* fondo de secciones claras */
--ouro:     #B08D4C;  /* oro viejo — ACENTO ÚNICO, con avaricia */
--bruma:    #7E8B92;  /* gris-azul atlántico — texto secundario */
--salvia:   #6B7A5E;  /* solo en datos, gráficos o etiquetas de nicho */


Regla del oro: aparece como una línea, un borde, un subrayado en hover, un detalle. Nunca como fondo de botón grande, nunca en más de un elemento por pantalla. Su escasez es lo que lo hace caro.

Tipografía. Dos familias, contraste editorial:

Display: serif de alto contraste, todo en titulares y números grandes. Usa Instrument Serif o Playfair Display de Google Fonts si no hay licencia de las de pago.

Texto/UI: grotesca neutra. Inter o Söhne si está disponible.

Escala de tipo con salto grande y deliberado: titular hero muy grande (clamp 3.5rem–8rem), cuerpo pequeño (16–17px), etiquetas diminutas en mayúsculas con tracking amplio (11px, letter-spacing 0.12em). Nada intermedio.

Espacio. Mucho aire. Márgenes laterales generosos (mínimo 6vw en desktop). Secciones separadas por al menos 12rem en desktop. La obra respira.

Formas. Border-radius 0 en todo excepto avatares. Sin sombras difusas. Sin glassmorphism. Bordes de 1px en --bruma al 20% cuando hagan falta.

4. El elemento firma

Cada web necesita una cosa que se recuerde. Aquí es la luz dirigida.

En la home, el hero arranca casi a oscuras: la pieza destacada se reproduce en bucle silencioso pero apagada al 15% de luminosidad. Un haz de luz sigue al cursor (en móvil, se abre solo tras la carga y se mueve suavemente), revelando el vídeo solo donde el haz cae. Implementación: un radial-gradient en una máscara CSS (mask-image) que sigue la posición del puntero con interpolación suave (lerp, no seguimiento directo — el retardo es lo que lo hace sentir físico).

Tras 3 segundos sin interacción, o al primer scroll, la luz se abre y el vídeo se revela entero. El titular aparece dentro del haz.

Ese gesto es el manifiesto: la luz se decide. No lo expliques con un texto al lado; que se entienda al usarlo.

Respeta prefers-reduced-motion: con la preferencia activa, el vídeo se muestra revelado desde el principio sin animación.

5. Arquitectura del sitio

/                  Home — apertura cinemática
/traballo          El trabajo — galería en 3 salas
/traballo/[slug]   Caso — la pieza + su desglose híbrido
/metodo            El método — las fases del flujo híbrido
/etica             Ética — compromiso AI Act, trazabilidad
/estudio           Estudio — manifiesto y enfoque
/contacto          Contacto


(Rutas en gallego; en /es/ y /en/ usa trabajo/work, metodo/method, etica/ethics, estudio/studio, contacto/contact.)

Home

┌──────────────────────────────────────────┐
│ ALUMA                    GL ES EN   Menú │
├──────────────────────────────────────────┤
│                                          │
│      [vídeo en bucle, oscuro]            │
│         ·el haz sigue al cursor·         │
│                                          │
│         A luz decídese                   │
│                                          │
├──────────────────────────────────────────┤
│  Tres líneas de manifiesto, tipografía   │
│  grande, mucho aire, sin imagen          │
├──────────────────────────────────────────┤
│  TRABALLO SELECCIONADO                   │
│  [pieza grande]                          │
│  [pieza]         [pieza]                 │
├──────────────────────────────────────────┤
│  O MÉTODO — diagrama de 3 pasos          │
│  Filmamos · Xeramos · Integramos         │
├──────────────────────────────────────────┤
│  Contacto + pie                          │
└──────────────────────────────────────────┘


Sin sección de "servicios" con iconos. Sin contador de estadísticas. Sin CTA flotante.

El trabajo

Galería organizada en tres salas —Deporte · Documental · Publicidade— con filtro por sala en forma de tres etiquetas de texto, no de botones tipo pill. Miniaturas grandes en cuadrícula asimétrica (no todas del mismo tamaño). Al pasar el ratón, la miniatura reproduce un preview mudo de 3 segundos y el título aparece debajo en pequeño. Nada de superposiciones oscuras con texto centrado.

Caso (la página más importante)

Es el diferenciador de todo el negocio. Estructura:

La pieza a ancho completo, reproductor limpio.

Ficha mínima: cliente (o "peza propia"), sala, año, duración.

O desmontaxe — el desglose. Bloques alternados: a la izquierda un fotograma, a la derecha una etiqueta que dice si es rodado o xerado y dos líneas explicando la decisión. Marca visualmente cada uno: rodado con una línea --oso, generado con una línea --ouro.

Herramientas usadas, en texto pequeño.

Navegación a la pieza siguiente.

Deja preparados 3 casos de ejemplo con contenido placeholder claramente marcado ([PENDIENTE: vídeo]) para que el cliente los sustituya.

Ética

Página corta. Compromiso con el Reglamento Europeo de IA, trazabilidad de lo generado, marcado de contenido sintético cuando corresponde, y política sobre uso de imagen de personas reales. Tratada como prestigio, no como aviso legal: tipografía grande, poco texto, nada de letra pequeña.

6. Contenido y datos

Todos los textos y las piezas del portfolio salen de archivos de datos editables (/src/content/*.json o similar), no incrustados en JSX.

Estructura de cada pieza: slug, titulo{gl,es,en}, sala, ano, cliente, duracion, videoUrl, posterUrl, desglose[{tipo, imagen, texto{gl,es,en}}], ferramentas[].

No inventes clientes reales ni testimonios. Donde falte contenido, usa placeholders visibles.

Vídeo: acepta URLs de Mux o Cloudflare Stream; mientras tanto usa <video> con MP4 local y poster. Todos los vídeos de fondo: muted, loop, playsinline, preload="metadata" y carga diferida fuera del viewport.

7. Técnica

React + Vite + TypeScript + Tailwind. Sin librería de componentes pesada.

Los tokens de la sección 3 van en tailwind.config como colores con nombre, no como valores sueltos repetidos.

Rendimiento: la web vive de vídeo pesado. Lighthouse >90 en móvil. Imágenes en AVIF/WebP con srcset. Fuentes con font-display: swap y preload de la display.

Accesibilidad: contraste AA mínimo, foco de teclado visible (una línea --ouro de 2px), prefers-reduced-motion respetado en todas las animaciones, texto alternativo en todo, subtítulos en los vídeos.

SEO/AEO: meta y Open Graph por página y por idioma, hreflang entre las tres versiones, JSON-LD de tipo Organization + VideoObject en los casos, sitemap.xml. Objetivo: que un motor de IA que busque "estudio audiovisual IA Galicia" pueda citar la página.

Formulario de contacto: nombre, email, tipo de proyecto (select con las tres salas), mensaje. Sin campos innecesarios. Envío a un endpoint configurable.

Preparado para desplegar en dominio propio aluma.gal.

8. Copys definitivos

Usa estos textos literalmente. No los "mejores" ni los alargues.

Hero

GL A luz decídese ES La luz se decide EN Light is a decision

Subtítulo (una línea, bajo el titular):

GL Estudio audiovisual híbrido. Galicia. ES Estudio audiovisual híbrido. Galicia. EN Hybrid film studio. Galicia, Spain.

Manifiesto (home, tres líneas sueltas con mucho aire)

GL Somos cineastas primeiro, enxeñeiros despois. Filmamos o que ten alma. Xeramos o imposible. A IA non asina o noso traballo: execútao baixo a nosa dirección.

ES Somos cineastas primero, ingenieros después. Filmamos lo que tiene alma. Generamos lo imposible. La IA no firma nuestro trabajo: lo ejecuta bajo nuestra dirección.

EN We are filmmakers first, engineers second. We film what has soul. We generate the impossible. AI doesn't sign our work — it executes under our direction.

El método (tres pasos)

Paso GL ES EN 01 Filmamos — O que ten alma: a mirada, a pel, o produto. Filmamos — Lo que tiene alma: la mirada, la piel, el producto. We film — What has soul: the gaze, the skin, the product. 02 Xeramos — O que sería faraónico, imposible ou inalcanzable. Generamos — Lo que sería faraónico, imposible o inalcanzable. We generate — What would be impossible or out of reach. 03 Integramos — Sen costura. E amosamos como se fixo. Integramos — Sin costura. Y enseñamos cómo se hizo. We integrate — Seamlessly. And we show the seams anyway.

Ética (entradilla)

GL — Cumprimos o Regulamento Europeo de IA. Todo o xerado queda trazado. Ningunha persoa real aparece nas nosas pezas sen o seu consentimento expreso. A transparencia non é un aviso legal: é parte do oficio.

ES — Cumplimos el Reglamento Europeo de IA. Todo lo generado queda trazado. Ninguna persona real aparece en nuestras piezas sin su consentimiento expreso. La transparencia no es un aviso legal: es parte del oficio.

EN — We comply with the EU AI Act. Everything generated is traceable. No real person appears in our work without explicit consent. Transparency isn't a disclaimer — it's part of the craft.

Contacto

GL ES EN Titular Falemos da túa próxima campaña. Hablemos de tu próxima campaña. Let's talk about your next campaign. Botón Enviar Enviar Send

Pie

ALUMA · Estudio audiovisual · Galicia · aluma.gal Enlaces: Instagram, LinkedIn, Vimeo. Aviso legal, privacidad, cookies.

9. Qué NO hacer

Hero centrado con degradado de fondo y dos botones.

Tres tarjetas con iconos de línea explicando "servicios".

Sección "Por qué elegirnos" o contadores animados de proyectos.

Carrusel de testimonios o logos de clientes falsos.

Emojis en la interfaz.

La palabra "IA" en el titular del hero.

Botones con esquinas redondeadas y sombra.

Modo claro/oscuro conmutable: el sitio es oscuro por diseño, con secciones claras puntuales.

10. Orden de trabajo sugerido

Tokens, tipografía, layout base y conmutador de idioma.

Home completa con el elemento firma funcionando.

Galería y plantilla de caso con los 3 casos placeholder.

Método, Ética, Estudio, Contacto.

Pasada de rendimiento, accesibilidad y SEO.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://alumaestudio.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/71ded700-1f2f-48d9-b27d-9d4ae2456189).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
