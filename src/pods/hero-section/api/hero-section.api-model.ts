import type { LanguageCode } from '@content-island/api-client';

export interface Media {
  name: string;
  url: string;
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
  /** Text between *asterisks* is highlighted; "|" is a line break */
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  portrait: Media;
  portraitAlt: string;
  portraitCaption: string;
}

/** Home page entry: only the hero is read here */
export interface LawyerPage {
  id: string;
  hero: Hero;
  language: LanguageCode;
}

export interface Settings {
  id: string;
  lawyerFullName: string;
  phoneHref: string;
  whatsappHref: string;
  language: LanguageCode;
}

export interface HeroSectionApiData {
  page: LawyerPage;
  settings: Settings;
}
