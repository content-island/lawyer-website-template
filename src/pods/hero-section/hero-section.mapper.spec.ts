import { describe, expect, it } from 'vitest';
import type { HeroSectionApiData } from './api/hero-section.api-model';
import { mapToHeroVm } from './hero-section.mapper';

const data = (): HeroSectionApiData => ({
  page: {
    id: 'p',
    hero: {
      id: 'h',
      eyebrow: 'Eyebrow',
      title: 'Defendemos,|*a tu lado*',
      subtitle: 'Sub',
      primaryCta: 'Llamar',
      secondaryCta: 'WhatsApp',
      portrait: { name: 'p', url: 'portrait.jpg' },
      portraitAlt: 'Clara',
      portraitCaption: 'Despacho',
    },
    language: 'es',
  },
  settings: { id: 's', lawyerFullName: 'Clara Ríos Martín', phoneHref: 'tel:+34961', whatsappHref: 'https://wa.me/34600', language: 'es' },
});

describe('mapToHeroVm', () => {
  it('maps texts, calls to action and the language anchor', () => {
    expect(mapToHeroVm(data(), 'es')).toEqual({
      id: 'inicio',
      variant: 'classic',
      eyebrow: 'Eyebrow',
      titleHtml: 'Defendemos,<br /><em class="not-italic text-accent max-tab:text-accent-light">a tu lado</em>',
      subtitle: 'Sub',
      primaryCta: { label: 'Llamar', href: 'tel:+34961' },
      secondaryCta: { label: 'WhatsApp', href: 'https://wa.me/34600' },
      portrait: { url: 'portrait.jpg', alt: 'Clara' },
      caption: { name: 'Clara Ríos Martín', text: 'Despacho' },
    });
  });

  it('respects the hero variant from content', () => {
    const geometric = data();
    geometric.page.hero.heroVariant = 'geometric';
    expect(mapToHeroVm(geometric, 'en').variant).toBe('geometric');
  });
});
