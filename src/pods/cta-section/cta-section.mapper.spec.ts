import { describe, expect, it } from 'vitest';
import { mapToCtaVm } from './cta-section.mapper';

describe('mapToCtaVm', () => {
  it('maps the banner and links it to the contact section', () => {
    expect(
      mapToCtaVm({
        page: {
          id: 'p',
          cta: { id: 'c', title: 'CTA', text: 'Text', ctaLabel: 'Pedir cita', image: { name: 'i', url: 'cta.jpg' }, imageAlt: 'Despacho' },
          language: 'es',
        },
        header: { id: 'h', contact: { id: 'ct', label: 'Contacto', url: '/#contacto' }, language: 'es' },
      }),
    ).toEqual({ title: 'CTA', text: 'Text', image: { url: 'cta.jpg', alt: 'Despacho' }, link: { label: 'Pedir cita', href: '#contacto' } });
  });
});
