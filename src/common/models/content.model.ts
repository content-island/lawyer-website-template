import type { LanguageCode } from '@content-island/api-client';

// Re-export for convenience
export type { LanguageCode };


export interface Media {
  name: string;
  url: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  language: LanguageCode;
}

export interface Font {
  id: string;
  name: string;
  url: string;
  language: LanguageCode;
}

/**
 * Convención de texto enriquecido para títulos:
 * la parte entre *asteriscos* se destaca con el color de acento (ver core/helpers/emphasis.helper.ts).
 */
export type EmphasisText = string;

// ============================================
// Content Island Models
// ============================================

export interface General {
  id: string;
  language: LanguageCode;
  /** Fecha automática de Content Island (última vez que se guardó la entrada) */
  lastUpdate?: string; // ISO 8601
  favIcon: Media;
  /** Logo (SVG). Opcional: si falta, se dibuja un monograma con las iniciales de Settings.lawyerName */
  logo?: Media;
}

/**
 * Tematizado. Cada color se inyecta como variable CSS en <html> (Layout.astro) y de ahí salen todos los
 * tokens de Tailwind y los SVG (GeoTile, trama, iconos…). Ver 1-modelo-content-island.md.
 */
export interface Theme {
  id: string;
  name: string;
  colorPrimary: string; // acento
  colorSecondary: string; // tinta
  colorBackground: string;
  colorTertiary: string;
  fontDisplay: Font; // titular del hero
  fontTitle: Font;
  fontBody: Font;
  fontSignature: Font;
  language: LanguageCode;
}

export interface PageMeta {
  id: string;
  title: string;
  pageId: string;
  description: string;
  language: LanguageCode;
}

export interface Settings {
  id: string;
  lawyerName: string;
  lawyerFullName: string;
  role: string;
  barAssociation: string;
  /** Versión corta para la barra superior en móvil (p. ej. "ICA Valencia") */
  barAssociationShort: string;
  barNumber: string;
  barSince: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappHref: string;
  email: string;
  address: string;
  schedule: string;
  scheduleShort: string;
  taxId: string;
  language: LanguageCode;
}

export interface Header {
  id: string;
  areas: NavigationItem;
  about: NavigationItem;
  /** Solo se muestra en el menú si hay artículos publicados */
  articles: NavigationItem;
  contact: NavigationItem;
  ctaLabel: string;
  menuLabel: string;
  language: LanguageCode;
}

/**
 * Estilo visual del hero (Figma: página Diseño).
 *   classic   → retrato + fondo geométrico desenfocado (por defecto)
 *   framed    → Hero 2 · franja de color + marco de línea desplazado + trama diagonal que se desliza
 *   geometric → Hero 3 · retrato en retícula 3×3 con piezas del patrón
 */
export type HeroVariant = 'classic' | 'framed' | 'geometric';

export interface Hero {
  id: string;
  /** Si no se indica, se usa "classic" */
  heroVariant?: HeroVariant;
  eyebrow: string;
  title: EmphasisText;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  portrait: Media;
  portraitAlt: string;
  portraitCaption: string;
  language: LanguageCode;
}

export interface Credentials {
  id: string;
  /** Frase editorial: {{...}} resalta en tinta y **x** marca la cifra grande en cursiva de acento */
  text: string;
  linkLabel: string;
  language: LanguageCode;
}

export interface PracticeArea {
  id: string;
  title: string;
  description: string;
  /** Icono SVG subido a Content Island (se inserta en línea y toma el color del tema) */
  icon: Media;
  image: Media;
  imageAlt: string;
  isMain: boolean;
  tag?: string;
  ctaLabel: string;
  language: LanguageCode;
}

export interface SectionHead {
  id: string;
  eyebrow: string;
  title: EmphasisText;
  lead?: string;
  language: LanguageCode;
}

export interface WhyItem {
  id: string;
  title: string;
  text: string;
  /** Icono SVG subido a Content Island */
  icon: Media;
  language: LanguageCode;
}

export interface CvEntry {
  title: string;
  detail: string;
}

export interface About {
  id: string;
  eyebrow: string;
  title: EmphasisText;
  intro: string;
  body: string;
  signature: string;
  signatureMeta: string;
  educationTitle: string;
  education: CvEntry[];
  membershipsTitle: string;
  memberships: CvEntry[];
  language: LanguageCode;
}

export interface ProcessStep {
  id: string;
  title: string;
  text: string;
  language: LanguageCode;
}

/** Banner con foto de fondo y panel translúcido (Figma: CTA Asesoramiento) */
export interface CtaBanner {
  id: string;
  title: string;
  text: string;
  ctaLabel: string;
  image: Media;
  imageAlt: string;
  language: LanguageCode;
}

export interface Review {
  id: string;
  quote: string;
  author: string;
  caseType: string;
  rating: number;
  language: LanguageCode;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  language: LanguageCode;
}

/**
 * Artículo / noticia. Si no hay ninguno publicado, la sección de la home,
 * el enlace del menú y las páginas /articulos no se generan.
 */
export interface Article {
  id: string;
  order?: number;
  slug: string;
  category: string;
  /** Referencia legal que se usa como portada tipográfica (p. ej. "Art. 92") */
  reference: string;
  date: string; // ISO 8601
  readingTime: string;
  title: string;
  excerpt: string;
  /** Cuerpo en markdown */
  body: string;
  /** Opcional. Sin imagen se pinta la portada tipográfica con un color del tema que alterna según la posición */
  coverImage?: Media;
  coverImageAlt?: string;
  language: LanguageCode;
}

export interface ArticlesExtra {
  id: string;
  allLabel: string;
  readMoreLabel: string;
  listEyebrow: string;
  listTitle: EmphasisText;
  listLead: string;
  backLabel: string;
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
  language: LanguageCode;
}

export interface ContactSection {
  id: string;
  eyebrow: string;
  title: EmphasisText;
  lead: string;
  formTitle: string;
  formSubtitle: string;
  subjects: string[];
  gdpr: CvEntry[];
  consent: string;
  submitLabel: string;
  responseTime: string;
  language: LanguageCode;
}

export interface FooterColumn {
  id: string;
  title: string;
  /** La API no resuelve relaciones de segundo nivel: llegan como ids y getFooter() las sustituye */
  links: NavigationItem[];
}

export interface Footer {
  id: string;
  deontology: string;
  columns: FooterColumn[];
  copyRight: string;
  legalLinks?: NavigationItem[];
  cookies: NavigationItem;
  privacyPolicy: NavigationItem;
  language: LanguageCode;
}

export interface CookieBanner {
  id: string;
  title: string;
  description: string;
  learnMore: string;
  acceptAll: string;
  onlyEssential: string;
  language: LanguageCode;
}

/** Textos de interfaz (etiquetas de formulario, accesibilidad, enlaces fijos). 1 entrada por idioma */
export interface UiText {
  id: string;
  barNumberPrefix: string;
  mainNavLabel: string;
  logoHomeLabel: string;
  credentialsLabel: string;
  reviewsLabel: string;
  reviewsPrevLabel: string;
  reviewsNextLabel: string;
  contactOfficeLabel: string;
  contactPhoneLabel: string;
  contactWhatsappLabel: string;
  contactEmailLabel: string;
  contactScheduleLabel: string;
  formNameLabel: string;
  formPhoneLabel: string;
  formEmailLabel: string;
  formSubjectLabel: string;
  formMessageLabel: string;
  formMessagePlaceholder: string;
  formGdprLabel: string;
  formPrivacyLinkLabel: string;
  formErrorMessage: string;
  formSuccessMessage: string;
  moreArticlesTitle: string;
  backToHomeLabel: string;
  footerOfficeTitle: string;
  footerBookLabel: string;
  whatsappLabel: string;
  /** Accesibilidad del selector de idioma */
  languageLabel: string;
  /** Etiqueta del NIF en el pie («NIF» / «Tax ID»): se pinta junto a Settings.taxId */
  taxIdLabel: string;
  /** «desde» / «since»: línea de colegiación de «Sobre mí» (Settings.barNumber + barSince) */
  barSinceLabel: string;
  /** «Última actualización» / «Last updated»: fecha de las páginas legales (Cookies/PrivacyPolicy.lastUpdate) */
  legalUpdatedLabel: string;
  language: LanguageCode;
}

export interface LegalPage {
  id: string;
  language: LanguageCode;
  lastUpdate: string;
  text: string;
  slug: string;
}

/**
 * Página principal: agrupa todas las secciones de la home (relaciones en Content Island).
 * Las listas salen en el orden en que estén en la relación. Opiniones, FAQ y cabecera de artículos son opcionales:
 * si faltan, esa sección no se muestra.
 */
export interface LawyerPage {
  id: string;
  meta: PageMeta;
  hero: Hero;
  credentials: Credentials;
  areasHead: SectionHead;
  practiceAreas: PracticeArea[];
  whyHead: SectionHead;
  whyItems: WhyItem[];
  about: About;
  processHead: SectionHead;
  processSteps: ProcessStep[];
  cta: CtaBanner;
  reviewsHead?: SectionHead;
  reviews: Review[];
  faqHead?: SectionHead;
  faqItems: FaqItem[];
  articlesHead?: SectionHead;
  contact: ContactSection;
  language: LanguageCode;
}
