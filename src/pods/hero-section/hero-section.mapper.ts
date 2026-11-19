import type { LanguageCode } from '@content-island/api-client';
import { renderEmphasis } from '@common/helpers';
import { sectionAnchor } from '@common/routing';
import type { HeroSectionApiData } from './api/hero-section.api-model';
import type { HeroVm } from './hero-section.model';

export const mapToHeroVm = ({ page: { hero }, settings }: HeroSectionApiData, lang: LanguageCode): HeroVm => ({
  id: sectionAnchor(lang, 'hero'),
  variant: hero.heroVariant ?? 'classic',
  eyebrow: hero.eyebrow,
  titleHtml: renderEmphasis(hero.title, 'not-italic text-accent max-tab:text-accent-light'),
  subtitle: hero.subtitle,
  primaryCta: { label: hero.primaryCta, href: settings.phoneHref },
  secondaryCta: { label: hero.secondaryCta, href: settings.whatsappHref },
  portrait: { url: hero.portrait.url, alt: hero.portraitAlt },
  caption: { name: settings.lawyerFullName, text: hero.portraitCaption },
});
