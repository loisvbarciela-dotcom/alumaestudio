# Guía de traducción — 30 artículos «Tu película» (ES → GL · EN · RU)

Originales en español: `propuestas-web/blog-tu-pelicula/NN-slug.md`.
Traducciones: `propuestas-web/blog-tu-pelicula/<idioma>/NN-slug.md` (mismo nombre de archivo).

## Reglas de estructura (obligatorias)

1. **Misma estructura exacta** que el original: mismas claves de la cabecera YAML, mismo número y orden de encabezados (`#`, `##`, `###`), listas, tablas, sección de preguntas frecuentes, línea `---` final y CTA. No añadir ni quitar contenido, datos ni promesas.
2. **Cabecera YAML:**
   - Traducir: `titulo`, `meta_title` (**≤ 60 caracteres**), `meta_description` (**≤ 155 caracteres**), `keyword_principal`, `keywords_secundarias`, el texto de `imagen_destacada` (nombre de archivo intacto, se traduce la descripción y el `alt`), `cta` (solo el texto antes de ` — `).
   - Copiar sin cambios: `n`, `slug`, `url`, `intencion`, `cluster`, `publicacion_sugerida`, `enlaces_internos`.
   - Las palabras clave **no se traducen literalmente**: se elige la búsqueda natural que haría una persona en ese idioma y mercado (ver abajo).
   - Mantener las comillas dobles de los valores y escapar comillas internas si las hubiera (mejor usar comillas tipográficas « » o “ ” dentro del texto).
3. **Enlaces Markdown:** traducir el texto del enlace pero **dejar la URL exactamente igual** que en el original (`/es/...`). Las URL se localizan después automáticamente.
4. **Placeholders:** se conservan entre corchetes y con acento grave cuando lo lleven, traduciendo su texto con esta tabla:

| ES | GL | EN | RU |
|---|---|---|---|
| `[PRECIO: desde ___ €]` | `[PREZO: desde ___ €]` | `[PRICE: from €___]` | `[ЦЕНА: от ___ €]` |
| `[PLAZO: ___ días desde la aprobación del guion]` | `[PRAZO: ___ días desde a aprobación do guión]` | `[TIMEFRAME: ___ days from script approval]` | `[СРОК: ___ дней после утверждения сценария]` |
| `[validar: …]` | `[validar: …]` | `[to confirm: …]` | `[уточнить: …]` |
| `[FECHA LÍMITE: validar cada año]` | `[DATA LÍMITE: validar cada ano]` | `[DEADLINE: confirm each year]` | `[КРАЙНИЙ СРОК: уточнять каждый год]` |
| `[PLACEHOLDER: …]` | `[PLACEHOLDER: …]` | `[PLACEHOLDER: …]` | `[PLACEHOLDER: …]` |
| `[N.º de rondas de revisión: ___]` | `[N.º de roldas de revisión: ___]` | `[Number of revision rounds: ___]` | `[Количество раундов правок: ___]` |

## Voz de marca

Sobria, culta y cálida. Frases cortas. **Sin signos de exclamación**, sin hype de IA («revolucionario», «increíble», «mágico»), sin emojis. Se habla a la pareja en plural. No inventar precios, plazos, testimonios ni cifras.

## Glosario de producto (usar siempre igual)

| ES | GL | EN | RU |
|---|---|---|---|
| ALUMA | ALUMA | ALUMA | ALUMA |
| Tu película (producto) | A túa película | Your film | Ваш фильм |
| película personalizada | película personalizada | personalised film | персональный фильм |
| dos fotografías, una de cada persona | dúas fotografías, unha de cada persoa | two photographs, one of each person | две фотографии, по одной каждого из вас |
| 3–4 minutos | 3–4 minutos | 3–4 minutes | 3–4 минуты |
| dirigimos la IA plano a plano | diriximos a IA plano a plano | we direct the AI shot by shot | мы режиссируем ИИ кадр за кадром |
| la IA no firma la película: la ejecuta | a IA non asina a película: execútaa | AI doesn't sign the film — it executes it | ИИ не подписывает фильм — он его исполняет |
| universos: Antigua Roma · Años veinte · El espacio · Vuestro universo | Antiga Roma · Anos vinte · O espazo · O voso universo | Ancient Rome · The twenties · Outer space · Your universe | Древний Рим · Двадцатые годы · Космос · Ваша вселенная |
| consentimiento expreso de las dos personas | consentimento expreso das dúas persoas | explicit consent of both people | явное согласие обоих людей |
| Reglamento Europeo de IA | Regulamento Europeo de IA | EU AI Act | европейский Регламент об искусственном интеллекте (AI Act) |
| estreno | estrea | premiere | премьера |
| guion | guión | script | сценарий |
| boda / banquete | voda / banquete | wedding / reception | свадьба / банкет |
| novios / pareja | noivos / parella | the couple / the bride and groom | молодожёны / пара |
| pedida de mano | petición de man | proposal | предложение руки и сердца |
| despedida de soltera / soltero | despedida de solteira / solteiro | hen party / stag party | девичник / мальчишник |
| bodas de plata / de oro | vodas de prata / de ouro | silver / golden wedding anniversary | серебряная / золотая свадьба |
| wedding planner | wedding planner | wedding planner | свадебный организатор (wedding planner) |
| save the date | save the date | save the date | save the date |
| vale / tarjeta regalo | vale / tarxeta agasallo | gift voucher / gift card | подарочный сертификат |
| Galicia | Galicia | Galicia | Галисия |

## Notas por idioma

- **Gallego (GL):** gallego normativo (RAG), coherente con la web (`src/content/love.json`, clave `gl`). Tratamiento de **vós** con verbos de 2.ª persona del plural («contádenos», «elixides», «vós imaxinades»). Topónimos gallegos en su forma oficial (A Coruña, Ribeira Sacra, Costa da Morte, Teixido). Palabras clave: términos gallegos naturales; muchas búsquedas en Galicia se hacen en castellano, pero aquí se escriben en gallego.
- **Inglés (EN):** inglés británico (`personalised`, `colour`, `favourite`), coherente con `og:locale en_GB` y con `love.json` (`en`). Adaptar costumbres sin traducir literalmente: «banquete» → *reception*, «despedida» → *hen/stag party*, «Reyes» → *Epiphany (6 January, a Spanish tradition)*. Mantener las referencias a Galicia y España. Palabras clave del mercado anglosajón: *personalised film*, *unique wedding gift*, *anniversary gift ideas*, *wedding video ideas*, etc.
- **Ruso (RU):** ruso natural y cuidado, tratamiento **вы** en minúscula, coherente con `love.json` (`ru`). Adaptar costumbres: «despedida» → девичник/мальчишник, «bodas de oro» → золотая свадьба, «Reyes» → «праздник Королей (6 января, испанская традиция)». Palabras clave rusas naturales: *оригинальный подарок на свадьбу*, *подарок на годовщину свадьбы*, *видео на свадьбу*, *персональный фильм*, etc. Comillas «ёлочки».
