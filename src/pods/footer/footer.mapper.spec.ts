import { describe, expect, it } from 'vitest';
import { createRoutes } from '@common/routing';
import { mapToFooterVm } from './footer.mapper';
import { footerData } from './footer.spec-data';

describe('mapToFooterVm', () => {
  const vm = mapToFooterVm(footerData, 'es', createRoutes('en'));

  it('prefixes CMS links with the language', () => {
    expect(vm.columns[0]!.links).toEqual([
      { label: 'Divorce', href: '/es/#areas' },
      { label: 'Wills', href: '/es/#areas' },
    ]);
    expect(vm.legalLinks.map(link => link.href)).toEqual(['/es/aviso-legal', '/es/politica-de-privacidad', '/es/politica-de-cookies']);
    expect(vm.office.book).toEqual({ label: 'Book', href: '/es/#contacto' });
  });

  it('maps logo, office details and legal notice', () => {
    expect(vm.logo).toEqual({ logoUrl: '/logo.svg', name: 'Clara Ríos', role: 'Abogada', href: '/es/', homeLabel: 'inicio' });
    expect(vm.office.addressHtml).toBe('Calle 1<br />Valencia');
    expect(vm.office.email).toEqual({ label: 'a@b.es', href: 'mailto:a@b.es' });
    expect(vm.legalNotice).toBe('© 2026 Clara Ríos · NIF 123A');
  });
});
