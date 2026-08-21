# Generar videos placeholder a partir de las imágenes existentes

Convertir los tres fotogramas de referencia de `public/placeholders/` en clips cortos image-to-video, enlazarlos como `videoUrl` en `pieces.json` y verificar que el reproductor los reproduce en bucle.

## Alcance

- Tres videos placeholder, uno por pieza (`marea-alta`, `o-oficio`, `cinza-e-ouro`).
- Origen: las imágenes ya generadas en `public/placeholders/`.
- Destino: archivos MP4 en `public/videos/` (o como assets de Lovable si el peso lo aconseja).
- Actualización de `src/content/pieces.json` para que `videoUrl` apunte a cada MP4.
- Verificación visual en las rutas `/gl/traballo/$slug` y en la home.

## Nota importante

Los videos generados por IA a partir de una imagen son **placeholders animados**, no el rodaje final del cliente. Durarán unos pocos segundos y se reproducirán en bucle. Cuando lleguen los vídeos reales, bastará con sustituir los archivos y ajustar las duraciones en `pieces.json`.

## Pasos

1. **Generar los clips** con image-to-video desde cada placeholder.
   - Prompts de movimiento coherentes con el desglose de cada pieza.
   - Duración corta (5 s) para mantener el coste bajo y el bucle suave.
   - Relación de aspecto 16:9 para coincidir con los contenedores 21:9 / 4:3 del sitio.

2. **Almacenar los MP4** en `public/videos/`.

3. **Actualizar `src/content/pieces.json`**:
   - `videoUrl: "/videos/marea-alta.mp4"`, etc.
   - Mantener `posterUrl` apuntando a los placeholders como póster estático.

4. **Verificar reproducción**:
   - Comprobar que `PendingVideo` carga y reproduce el vídeo en bucle, muted.
   - Revisar que el label `[PENDENTE: vídeo]` desaparezca o se ajuste cuando hay videoUrl.
   - Capturar screenshots de las páginas de caso y la home.

## Coste y modelos

- Se usará el agent-side `videogen--generate_video` (image-to-video), no una integración runtime en la app.
- Si el usuario prefiere que los usuarios finales generen videos dentro de la web, el plan cambiaría a una ruta backend con AI Gateway; esto no se asume aquí.
