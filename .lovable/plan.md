# Página de traballo: 4 salas, Ficción con YouTube

## Contexto
La galería pasa a 4 salas: **Ficción · Fútbol · Documental · Publicidade**. Los 8 cortos de Ficción se muestran con las miniaturas subidas y un botón de play; al pulsar se abre la ficha de la pieza dentro de la web, con el reproductor de YouTube embebido a ancho completo. Los enlaces de YouTube llegarán después (estructura primero).

## Pasos

1. **Salas nuevas** (`src/lib/i18n.ts` + `i18n/{gl,es,en}.json`): `ROOMS = ["ficcion", "futbol", "documental", "publicidade"]` con nombres traducidos. La sala "deporte" pasa a llamarse "fútbol" (Marea alta queda en ella de momento; se reubica si procede).

2. **Miniaturas**: convertir las 8 imágenes subidas a JPG comprimidos (~1600 px) en `public/posters/`: `ultima-abella.jpg`, `viaxe-40-anos.jpg`, `cita-teixido.jpg`, `o-inocente.jpg`, `tellarizar.jpg`, `meu-fillo.jpg`, `tempo.jpg`, `o-falsificador.jpg`.

3. **`src/content/pieces.json`**: campo nuevo `youtubeUrl` (string|null) en todas las piezas + 8 piezas de Ficción (título GL/ES/EN, sala `ficcion`, año, miniatura en `posterUrl`, `youtubeUrl: null`, sin desglose). Títulos: A última abella · Unha viaxe de 40 anos · Cita en Teixido · O inocente · Tellarizar · Meu fillo · Tempo · O falsificador.

4. **Botón de play en la cuadrícula** (`WorkPage.tsx`): overlay de play (acento ouro, foco visible) sobre las piezas con `youtubeUrl` o poster; el clic lleva a la ficha de la pieza (navegación interna). El preview al hover se mantiene donde exista MP4.

5. **Ficha con embed** (`$lang.$section.$slug.tsx` + nuevo `YouTubeFacade.tsx`):
   - Con `youtubeUrl`: facade con póster y botón play (ouro); al pulsar carga el iframe de `youtube-nocookie.com/embed/<id>?autoplay=1&rel=0&modestbranding=1` — sin JS de YouTube hasta el clic.
   - Sin `youtubeUrl` (todas por ahora): se mantiene el póster como hoy, marcado como pendiente.
   - Si la pieza no tiene desglose (ficción), se oculta esa sección; JSON-LD VideoObject añade `embedUrl` cuando haya enlace.

6. **Verificación**: `/gl/traballo` muestra las 4 salas y los 8 pósters de Ficción; el play lleva a cada ficha; sin errores de consola.

## Cuando pases los enlaces
Rellenar `youtubeUrl` de cada corto (extraer la ID del enlace) y comprobar reproducción en cada ficha.
