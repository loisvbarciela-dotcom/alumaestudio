# Conectar los vídeos que el usuario sube

## Contexto
El usuario genera los 3 clips (~5 s) por su cuenta con Seedance 2.5 a partir de los pósters (`public/placeholders/marea-alta.jpg`, `o-oficio.jpg`, `cinza-e-ouro.jpg`). Los prompts ya se han entregado en el chat.

## Pasos (cuando el usuario suba los archivos)
1. Colocar los vídeos en `public/videos/` con los nombres `marea-alta.mp4`, `o-oficio.mp4`, `cinza-e-ouro.mp4`.
2. En `src/content/pieces.json`, poner `videoUrl` de cada pieza a `/videos/<slug>.mp4`. Los pósters se conservan en `posterUrl` (se muestran mientras carga y con ahorro de datos).
3. No hace falta tocar componentes: `PendingVideo` ya reproduce muted/loop/playsinline con `preload="metadata"`, y la galería usa preview al hover.
4. Verificar en la vista previa: los tres clips se ven en la home (hero usa la pieza destacada "Marea alta"), en Traballo y en cada caso; sin errores de consola.

## Notas
- Si un clip pesa más de ~8 MB, recomendar recomprimir (H.264, 1080p, ~5 Mbps) para no ralentizar.
- Los vídeos son placeholders animados; el material final del cliente se sustituirá después por la misma vía.
