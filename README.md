# Lawyer Landing — Clara Ríos

Astro 7 + Tailwind 4 template for an independent lawyer (family and inheritance law).
Same architecture as `template-restaurant` (pods, layouts/api, common/models).

## Pages
The **default language** (the first one in the project's language list in Content Island) is served at the root, **with no prefix and no redirects**. The other languages get a prefix. With `English, Spanish`:

| English (default) | Spanish | Content |
|---|---|---|
| `/` | `/es/` | Landing: hero, credentials, practice areas, why me, about, how I work, consultation banner, reviews, FAQ, articles (only if there are any) and contact |
| `/articles/` · `/articles/<slug>/` | `/es/articulos/` · `/es/articulos/<slug>/` | Article list and article pages (only if there are any articles) |
| `/cookie-policy` · `/privacy-policy` | `/es/politica-de-cookies` · `/es/politica-de-privacidad` | Legal pages (markdown from the API; the slug comes from the CMS) |

If a language is removed or the order changes in Content Island, the routes update on the next build.

## Content: Content Island
All the content (ES/EN texts, images, SVG icons, logo, favicon, theme colors and fonts) comes from the **Content Island** project created from this template.
The site uses the read-only token in `.env` (`CONTENT_ISLAND_ACCESS_TOKEN`, see `.env-sample`). `npm run dev` creates `.env` from `.env-sample` if it doesn't exist.
Optional: `SITE_URL` with the site domain, to generate the `hreflang` tags for each language.

## Theming: CSS variables
- `src/styles/global.css` defines the theme variables in `:root`: the 4 `Theme` colors (`--color-primary`, `--color-secondary`, `--color-background`, `--color-tertiary`), the colors derived from them, and `--font-name-*`.
- The **Theme** content type overrides them in `<html style="…">` (see `src/layouts/Layout.astro`), so changing a color or font in the content changes the whole site.
- The `@theme` block turns those variables into Tailwind tokens (`bg-page`, `text-accent`, `border-rule`, `font-title`…), matching the Figma variables.

## Styles: Tailwind
- Components are built with Tailwind classes.
- Reusable pieces (`.btn`, `.arrow`, `.field`, `.eyebrow`, `.h2`, `.lead`…) live in `@layer components` with `@apply`.
- Custom CSS only for the `@keyframes` and the scroll reveal system (`data-reveal`: left, `right`, `up`, `zoom`, `fade`).

## Design
Figma (private access): https://www.figma.com/design/Uv5Or6fHpBxc0m0x6PZRhU/Plantilla-Abogado

## Scripts
```bash
npm install
npm run dev     # development (creates .env from .env-sample if missing)
npm run check   # type checking (astro check)
npm run build   # static build in dist/
```
