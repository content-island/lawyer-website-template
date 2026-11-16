# Landing Abogada — Clara Ríos

Plantilla Astro 7 + Tailwind 4 para una abogada independiente (familia y sucesiones).
Misma arquitectura que `template-restaurant` (pods, layouts/api, common/models).

## Páginas
El **idioma inicial** (el primero de la lista de idiomas en Content Island) va en la raíz **sin prefijo y sin redirecciones**; el resto lleva prefijo. Con `English, Spanish`:

| Inglés (inicial) | Español | Contenido |
|---|---|---|
| `/` | `/es/` | Landing: hero, trayectoria, áreas, por qué elegirme, sobre mí, cómo trabajo, banner de asesoramiento, opiniones, FAQ, artículos (solo si hay) y contacto |
| `/articles/` · `/articles/<slug>/` | `/es/articulos/` · `/es/articulos/<slug>/` | Listado y página de cada artículo (solo si hay artículos) |
| `/cookie-policy` · `/privacy-policy` | `/es/politica-de-cookies` · `/es/politica-de-privacidad` | Páginas legales (markdown desde la API; el slug viene del CMS) |

Si se quita un idioma o se cambia el orden en Content Island, las rutas se ajustan solas en la siguiente build.

## Contenido: Content Island
Todo el contenido (textos ES/EN, imágenes, iconos SVG, logo, favicon, colores y fuentes del tema) viene del proyecto de **Content Island**
creado a partir de esta plantilla. La web usa el token de solo lectura de `.env` (`CONTENT_ISLAND_ACCESS_TOKEN`, ver `.env.example`).
Opcional: `SITE_URL` con el dominio de la web, para que se generen las etiquetas `hreflang` de los idiomas.

## Tematizado: variables CSS
- `src/styles/global.css` define en `:root` las variables del tema: los 4 colores de `Theme` (`--color-primary`, `--color-secondary`, `--color-background`, `--color-tertiary`), los colores que se calculan a partir de ellos y `--font-name-*`.
- El contentType **Theme** las sobrescribe en `<html style="…">` (ver `src/layouts/Layout.astro`): cambiando el color o las fuentes en el contenido cambia toda la web.
- El bloque `@theme` convierte esas variables en tokens de Tailwind (`bg-page`, `text-accent`, `border-rule`, `font-title`…), los mismos que las variables de Figma.

## Estilos: Tailwind
- Los componentes se maquetan con clases de Tailwind.
- Las piezas reutilizables (`.btn`, `.arrow`, `.field`, `.eyebrow`, `.h2`, `.lead`…) están en `@layer components` con `@apply`.
- CSS propio solo para los `@keyframes` y el sistema de aparición al hacer scroll (`data-reveal`: izquierda, `right`, `up`, `zoom`, `fade`).

## Diseño
Figma (acceso privado): https://www.figma.com/design/Uv5Or6fHpBxc0m0x6PZRhU/Plantilla-Abogado

## Scripts
```bash
npm install
npm run dev     # desarrollo
npm run check   # comprobación de tipos (astro check)
npm run build   # build estática en dist/
```
