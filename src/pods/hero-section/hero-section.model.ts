import type { HeroVariant } from './api/hero-section.api-model';

export interface LinkVm {
  label: string;
  href: string;
}

export interface HeroVm {
  id: string;
  variant: HeroVariant;
  eyebrow: string;
  /** Safe HTML */
  titleHtml: string;
  subtitle: string;
  /** Phone call */
  primaryCta: LinkVm;
  /** Opens WhatsApp in a new tab */
  secondaryCta: LinkVm;
  portrait: { url: string; alt: string };
  caption: { name: string; text: string };
}
