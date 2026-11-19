import { describe, expect, it } from 'vitest';
import type { AreasSectionApiData } from './api/areas-section.api-model';
import { mapToAreasVm } from './areas-section.mapper';

const data = (): AreasSectionApiData => ({
  page: {
    id: 'p',
    areasHead: { id: 'h', eyebrow: 'Áreas', title: 'En qué *te ayudo*' },
    practiceAreas: [
      {
        id: 'a',
        title: 'Divorcio',
        description: 'D',
        icon: { name: 'i', url: 'icon.svg' },
        image: { name: 'a', url: 'a.jpg' },
        imageAlt: 'A',
        isMain: true,
        tag: 'Top',
        ctaLabel: 'Consultar',
      },
    ],
    language: 'es',
  },
  header: { id: 'hd', areas: { id: '1', label: 'Áreas', url: '/#areas' }, contact: { id: '2', label: 'Contacto', url: '/#contacto' }, language: 'es' },
});

describe('mapToAreasVm', () => {
  it('maps the head and each area, linking its button to the contact section', () => {
    const vm = mapToAreasVm(data());
    expect(vm.id).toBe('areas');
    expect(vm.head.titleHtml).toBe('En qué <em class="emph">te ayudo</em>');
    expect(vm.items).toEqual([
      {
        title: 'Divorcio',
        description: 'D',
        iconUrl: 'icon.svg',
        image: { url: 'a.jpg', alt: 'A' },
        isMain: true,
        tag: 'Top',
        cta: { label: 'Consultar', href: '#contacto' },
      },
    ]);
  });

  it('works without practice areas', () => {
    const empty = data();
    empty.page.practiceAreas = undefined;
    expect(mapToAreasVm(empty).items).toEqual([]);
  });
});
