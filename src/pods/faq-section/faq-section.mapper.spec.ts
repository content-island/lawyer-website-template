import { describe, expect, it } from 'vitest';
import type { LawyerPage } from './api/faq-section.api-model';
import { mapToFaqVm } from './faq-section.mapper';

const page = (): LawyerPage => ({
  id: 'p',
  faqHead: { id: 'h', eyebrow: 'FAQ', title: 'Preguntas *frecuentes*', lead: 'Lead' },
  faqItems: [{ id: 'f', question: '¿Q?', answer: 'A' }],
  language: 'es',
});

describe('mapToFaqVm', () => {
  it('maps head and questions', () => {
    expect(mapToFaqVm(page(), 'es')).toEqual({
      id: 'preguntas-frecuentes',
      head: { eyebrow: 'FAQ', titleHtml: 'Preguntas <em class="emph">frecuentes</em>', lead: 'Lead' },
      items: [{ question: '¿Q?', answer: 'A' }],
    });
  });

  it('hides the section without a header or without questions', () => {
    expect(mapToFaqVm({ ...page(), faqHead: undefined }, 'es')).toBeUndefined();
    expect(mapToFaqVm({ ...page(), faqItems: undefined }, 'es')).toBeUndefined();
  });
});
