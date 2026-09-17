# Piezas completas de los cortos con YouTube

## Contexto
Los cortometrajes reales (30 s–1 min, con sonido) se publican en YouTube y se muestran embebidos. Los previews de la cuadrícula siguen siendo MP4 propios (bucles mudos, vía `videoUrl`); YouTube solo carga la pieza completa, en la página de caso.

## Pasos

1. **Extender `src/content/pieces.json`**: nuevo campo opcional `youtubeId` (string | null) en cada pieza. Empieza a `null` hasta que el usuario pase las IDs/URLs de YouTube.

2. **Nuevo componente `src/components/aluma/YouTubeFacade.tsx`**:
   - Muestra el póster con un botón de reproducir (acento ouro, foco visible).
   - Al pulsar, carga el iframe de `youtube-nocookie.com/embed/<id>?autoplay=1&rel=0&modestbranding=1` (no carga el JS de YouTube hasta el clic: más rápido y sin cookies de terceros antes del consentimiento).
   - `title` descriptivo, `allowfullscreen`.

3. **Página de caso (`src/routes/$lang.$section.$slug.tsx`)**:
   - Si la pieza tiene `youtubeId`, renderiza el facade a ancho completo (aspect-video) en el hueco del vídeo actual; si no, mantiene `PendingVideo` como está.
   - JSON-LD VideoObject: añadir `embedUrl` cuando exista `youtubeId`.

4. **Cuadrícula de Traballo**: sin cambios — sigue con MP4 de preview al hover; si una pieza solo tiene YouTube, cae al póster.

## Cuando el usuario pase los enlaces
- Extraer la ID de cada URL de YouTube y rellenar `youtubeId` en `pieces.json`.
- Verificar: facade en cada caso, reproducción al clic, sin errores de consola ni cargas de YouTube al abrir la página.
