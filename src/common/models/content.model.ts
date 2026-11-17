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
 * Rich text convention for titles:
 * the part between *asterisks* is highlighted with the accent color (see core/helpers/emphasis.helper.ts).
 */
export type EmphasisText = string;

// ============================================
// Content Island Models
// ============================================

export interface General {
  id: string;
  language: LanguageCode;
  /** Automatic Content Island date (last time the entry was saved) */
  lastUpdate?: string; // ISO 8601
  favIcon: Media;
  /** Logo (SVG). Optional: if missing, a monogram with the initials of Settings.lawyerName is drawn */
  logo?: Media;
}

/**
 * Theming. Each color is injected as a CSS variable on <html> (Layout.astro), and all Tailwind tokens
 * and SVGs (GeoTile, hatch pattern, icons…) derive from them. See 1-modelo-content-island.md.
 */
export interface Theme {
  id: string;
  name: string;
  colorPrimary: string; // accent
  colorSecondary: string; // ink
  colorBackground: string;
  colorTertiary: string;
  fontDisplay: Font; // hero headline
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
  /** Short version for the top bar on mobile (e.g. "ICA Valencia") */
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
  /** Only shown in the menu if there are published articles */
  articles: NavigationItem;
  contact: NavigationItem;
  ctaLabel: string;
  menuLabel: string;
  language: LanguageCode;
}

/**
 * Hero visual style (Figma: Diseño page).
 *   classic   → portrait + blurred geometric background (default)
 *   framed    → Hero 2 · color band + offset line frame + sliding diagonal hatch
 *   geometric → Hero 3 · portrait in a 3×3 grid with pattern tiles
 */
export type HeroVariant = 'classic' | 'framed' | 'geometric';

export interface Hero {
  id: string;
  /** Defaults to "classic" */
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
  /** Editorial sentence: {{...}} highlights in ink and **x** marks the large italic accent figure */
  text: string;
  linkLabel: string;
  language: LanguageCode;
}

export interface PracticeArea {
  id: string;
  title: string;
  description: string;
  /** SVG icon uploaded to Content Island (inlined, takes the theme color) */
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
  /** SVG icon uploaded to Content Island */
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

/** Banner with background photo and translucent panel (Figma: CTA Asesoramiento) */
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
 * Article / news item. If none are published, the home section,
 * the menu link and the /articulos pages are not generated.
 */
export interface Article {
  id: string;
  order?: number;
  slug: string;
  category: string;
  /** Legal reference used as the typographic cover (e.g. "Art. 92") */
  reference: string;
  date: string; // ISO 8601
  readingTime: string;
  title: string;
  excerpt: string;
  /** Body in markdown */
  body: string;
  /** Optional. Without an image, a typographic cover is drawn in a theme color that alternates by position */
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
  /** The API doesn't resolve second-level relations: they arrive as ids and getFooter() replaces them */
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

/** UI strings (form labels, accessibility, fixed links). 1 entry per language */
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
  /** Language switcher accessibility */
  languageLabel: string;
  /** Tax ID label in the footer («NIF» / «Tax ID»): shown next to Settings.taxId */
  taxIdLabel: string;
  /** «desde» / «since»: bar membership line in «About me» (Settings.barNumber + barSince) */
  barSinceLabel: string;
  /** «Última actualización» / «Last updated»: legal pages date (Cookies/PrivacyPolicy.lastUpdate) */
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
 * Home page: groups all home sections (relations in Content Island).
 * Lists follow the order of the relation. Reviews, FAQ and the articles header are optional:
 * if missing, that section is not shown.
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
