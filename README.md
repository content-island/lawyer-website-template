# Lawyer Landing — Clara Ríos

Astro 7 + Tailwind 4 template for an independent lawyer (family and inheritance law).
Organized in **PODS** (feature islands): each pod owns its UI, API queries, API models, view models, mappers and business logic.

## Pages
The **default language** (the first one in the project's language list in Content Island) is served at the root, **with no prefix and no redirects**. The other languages get a prefix. With `English, Spanish`:

| English (default) | Spanish | Content |
|---|---|---|
| `/` | `/es/` | Landing: hero, credentials, practice areas, why me, about, how I work, consultation banner, reviews, FAQ, articles (only if there are any) and contact |
| `/articles/` · `/articles/<slug>/` | `/es/articulos/` · `/es/articulos/<slug>/` | Article list and article pages (only if there are any articles) |
| `/cookie-policy` · `/privacy-policy` | `/es/politica-de-cookies` · `/es/politica-de-privacidad` | Legal pages (markdown from the API; the slug comes from the CMS) |

If a language is removed or the order changes in Content Island, the routes update on the next build.

### Before changing content or languages
- **Content changes need a new build.** The site is static HTML: anything published or edited in Content Island (texts, articles, languages) doesn't show up until the site is rebuilt and deployed (`npm run build`). This can be done by hand or automated with a Content Island webhook that triggers the deploy.
- **The first language goes at the root (`/`).** Adding a language at the end of the list is safe. Reordering or removing languages changes the URLs on the next build: the new ones are generated automatically, but the old URLs that Google already indexed will return 404. For those, it's worth setting up **301 redirects** on the hosting, so links and search rankings aren't lost.

## Content: Content Island
All the content (ES/EN texts, images, SVG icons, logo, favicon, theme colors and fonts) comes from the **Content Island** project created from this template.
The site uses the read-only token in `.env` (`CONTENT_ISLAND_ACCESS_TOKEN`, see `.env-sample`). `npm run dev` creates `.env` from `.env-sample` if it doesn't exist.
Optional: `SITE_URL` with the site domain, to generate the `hreflang` tags for each language.

## Contact form
The form in the contact section is validated with [Zod](https://zod.dev) (`astro/zod`, included in Astro), but **it doesn't send emails until you connect a provider**.

### Connect an email provider
1. Open `src/pods/contact-section/contact-form.provider.ts`. It's the only file you need to change.
2. Replace the body of `sendContactForm` with the call to your provider (Resend, Formspree, Web3Forms…). It receives the data already validated and trimmed.
3. Return `true` when the provider confirms the submission. If it throws, the form shows the error message.

Step-by-step example with Resend: [Astro contact form with Server Actions and Resend](https://contentisland.net/en/blog/astro-contact-form-server-actions-resend/).

What the visitor sees:

| Situation | Message (UiText in Content Island) |
|---|---|
| Some field is invalid | Error under each field + `formErrorMessage` |
| Valid, **no provider connected** (default) | `formProviderMissingMessage` ("Configura tu proveedor de email para recibir correos."), plus a note in the browser console |
| Valid and sent | `formSuccessMessage` ("Hemos recibido su mensaje correctamente. Te responderemos lo antes posible."), and the form is cleared |

> ⚠️ Browser validation can be bypassed (devtools, curl…). If your provider runs on your own server (an Astro Action, an API route), validate there too with the same schema: `createContactFormSchema` in `contact-form.schema.ts`.

### Fields
| Field | `name` | Required | Rules |
|---|---|---|---|
| Full name | `name` | Yes | Max 100 characters. No `<`, `>`, `&`, `"`, `/` or `\` (apostrophes are allowed: "Jordi d'Ors") |
| Phone | `phone` | Yes | Optional `+`, then 6 to 15 digits; spaces, `(`, `)` and `-` allowed. Max 20 characters |
| Email | `email` | Yes | Valid email (which already excludes `<`, `>`, quotes and slashes), saved in lowercase. Max 254 characters |
| Subject | `subject` | No | One of the options in `ContactSection.subjects` |
| Message | `message` | No | Max 2000 characters. No `<`, `>` or `\` (quotes, `&` and `/` are allowed: "300 €/mes") |
| Privacy consent | `consent` | Yes | Must be checked |

Every text field is trimmed first (`.trim()`), so a field with only spaces counts as empty. Characters used for HTML injection are **rejected with an error**, not silently removed, so the visitor knows what to fix.

### Error messages
They come from **UiText** in Content Island, so they're translated like the rest of the site:

| UiText field | Shown when |
|---|---|
| `formRequiredError` | A required field is empty |
| `formEmailError` | The email isn't valid |
| `formPhoneError` | The phone isn't valid |
| `formTooLongError` | A text is too long |
| `formInvalidCharsError` | The name or the message contains characters that aren't allowed |
| `formConsentError` | The privacy checkbox isn't checked |
| `formErrorMessage` | Summary above the button, and the error of a tampered subject |

To add a field: add it to the form (`components/contact-form.astro`), to the schema and to `CONTACT_FORM_FIELDS` (`contact-form.schema.ts`), and add a test in `contact-form.schema.spec.ts`.

## Theming: CSS variables
- `src/styles/global.css` defines the theme variables in `:root`: the 4 `Theme` colors (`--color-primary`, `--color-secondary`, `--color-background`, `--color-tertiary`), the colors derived from them, and `--font-name-*`.
- The **Theme** content type overrides them (an `html:root` rule generated by the `site-head` pod, more specific than `:root`), so changing a color or font in the content changes the whole site.
- The `@theme` block turns those variables into Tailwind tokens (`bg-page`, `text-accent`, `border-rule`, `font-title`…), matching the Figma variables.

## Styles: Tailwind
- Components are built with Tailwind classes.
- Reusable pieces (`.btn`, `.arrow`, `.field`, `.eyebrow`, `.h2`, `.lead`…) live in `@layer components` with `@apply`.
- Custom CSS only for the `@keyframes` and the scroll reveal system (`data-reveal`: left, `right`, `up`, `zoom`, `fade`).

## Architecture: PODS
```
src/
  pages/[...path].astro   single route: builds the static paths and composes pods (no logic)
  layouts/Layout.astro    document shell: site-head, whatsapp-float and cookie-banner pods + "head" slot
  pods/<pod>/
    <pod>.pod.astro       public entry point (the only file other code imports)
    components/*.astro    internal components (< 100 lines each)
    list/ detail/ …       optional sub-views with their own .pod.astro (see the article pod)
    api/<pod>.api.ts      Content Island queries of this pod
    api/<pod>.api-model.ts  API models: only the fields this pod reads (repeated per pod on purpose)
    <pod>.model.ts        view models
    <pod>.mapper.ts       API model -> view model (pure)
    <pod>.business.ts     pod rules (pure)
    *.spec.ts             unit tests of mappers and business
  common/                 the only thing pods share; each folder is imported through its index.ts (@common/<folder>)
    api/                  Content Island client (identical queries are fetched once per build) + routing data query
    constants/            project languages (default = first one in Content Island) and the site's `routes` instance
    routing/              pure routing logic: URL builders, the list of site pages and their language alternates
    components/ helpers/ mappers/ models/   shared UI primitives (section head, logo, icon, geo tile) and utilities
```
Pods:
- Layout: `site-head`, `page-meta`, `header`, `footer`, `cookie-banner`, `whatsapp-float`.
- Home, one pod per section: `hero-section`, `credentials-section`, `areas-section`, `why-section`, `about-section`, `process-section`, `cta-section`, `reviews-section`, `faq-section`, `contact-section` (+ `article/latest`).
- `article`: one pod with shared `api/`, `components/` (`article-card`…), model, mapper and business, and three views: `list/`, `detail/` and `latest/` (home section).
- `legal-page`: cookie policy and privacy policy.

Every home section reads its own slice of the `LawyerPage` entry; the client cache makes it a single request per language at build time.
Rules: a pod never imports another pod; anything shared goes to `src/common/`. Mappers receive the `routes` object as a parameter, so they stay pure and testable without the API.

## Design
Figma (private access): https://www.figma.com/design/Uv5Or6fHpBxc0m0x6PZRhU/Plantilla-Abogado

## Scripts
```bash
npm install
npm run dev     # development (creates .env from .env-sample if missing)
npm run check   # type checking (astro check)
npm test        # unit tests (vitest): mappers, business and helpers
npm run build   # static build in dist/
```
