import { describe, expect, it } from 'vitest';
import { mapToWhyVm } from './why-section.mapper';

describe('mapToWhyVm', () => {
  it('maps the language anchor, head and items', () => {
    const vm = mapToWhyVm(
      {
        id: 'p',
        whyHead: { id: 'h', eyebrow: 'Por qué', title: 'Lo que *me diferencia*', lead: 'Lead' },
        whyItems: [{ id: 'w', title: 'Cercanía', text: 'T', icon: { name: 'w', url: 'w.svg' } }],
        language: 'es',
      },
      'es',
    );
    expect(vm.id).toBe('por-que-elegirme');
    expect(vm.head.lead).toBe('Lead');
    expect(vm.items).toEqual([{ title: 'Cercanía', text: 'T', iconUrl: 'w.svg' }]);
  });
});
