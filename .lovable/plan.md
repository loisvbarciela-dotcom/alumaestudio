# Generar 3 clips de vídeo (5 s) a partir de los pósters de ALUMA

## Objetivo
Convertir los tres pósters de referencia en clips de vídeo de ~5 segundos (imagen-a-vídeo) y conectarlos a la web, manteniendo los pósters como imagen de portada.

## Coste
- Modelo recomendado (última generación, 720p, con audio generado): ~0,5 créditos por clip → **~1,5–2 créditos en total** (saldo actual: ~93 créditos).
- Alternativas: Veo 3.1 Lite 0,75 créditos totales · Veo 3.1 Fast 1,5 · Veo 3.1 6. El modelo recomendado es la opción por defecto; solo cambiar si el resultado no convence.
- Los clips se generan uno tras otro, no en paralelo (límite de trabajos concurrentes).

## Clips
| Pieza | Imagen de partida | Movimiento |
|---|---|---|
| Marea alta | `public/placeholders/marea-alta.jpg` | Remeros remando al alba, cámara lenta, agua y niebla en movimiento |
| O oficio | `public/placeholders/o-oficio.jpg` | Manos tallando madera, virutas y polvo flotando en el haz de luz |
| Cinza e ouro | `public/placeholders/cinza-e-ouro.jpg` | Partículas doradas derivando sobre el producto, luz cálida ondulante |

Cada clip parte de su imagen (el fotograma inicial es el póster), con dirección de cámara suave y paleta ALUMA (sombras profundas, luz cálida). Audio: ambiente sutil; se verifica tras la generación.

## Pasos
1. Generar los 3 clips con la herramienta de vídeo, guardándolos en `public/videos/` (`marea-alta.mp4`, `o-oficio.mp4`, `cinza-e-ouro.mp4`).
2. Revisar cada clip (duración real, movimiento, sin artefactos) y regenerar alguno solo si queda claro por debajo del estándar.
3. Conectar los vídeos en `src/content/pieces.json` añadiendo la ruta del vídeo a cada pieza; el póster se conserva como `poster` (se muestra mientras carga y en modo ahorro de datos).
4. Verificar en la vista previa (escritorio y móvil): reproducción silenciada en bucle, póster antes de reproducir, sin errores de consola.

## No incluido
- No se toca el diseño del carrusel manifiesto ni otros contenidos.
- Los vídeos son placeholders animados por IA, no material final de cliente.
