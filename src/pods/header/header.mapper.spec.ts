import { describe, expect, it } from 'vitest';
import { createRoutes } from '@common/routing';
import { mapToHeaderVm } from './header.mapper';
import { headerData } from './header.spec-data';

describe('mapToHeaderVm', () => {
  const vm = mapToHeaderVm(headerData, [{ lang: 'en', url: '/', current: true }], { lang: 'en', onHome: false, routes: createRoutes('en') });

  it('maps top bar, logo and call to action', () => {
    expect(vm.topBar).toEqual({ barNumber: 'Bar no. 12345', barAssociation: 'Valencia Bar Association', barAssociationShort: 'ICAV', schedule: 'Mon-Fri', email: 'a@b.es' });
    expect(vm.logo).toEqual({ logoUrl: undefined, name: 'Clara Ríos', role: 'Lawyer', href: '/', homeLabel: 'home' });
    expect(vm.cta).toEqual({ label: 'Book', href: '/#contact' });
    expect(vm.phone).toEqual({ label: '+34 961', href: 'tel:+34961' });
  });

  it('maps navigation and language switcher', () => {
    expect(vm.nav.label).toBe('Main');
    expect(vm.nav.links).toHaveLength(4);
    expect(vm.languageSwitcher.options[0]).toMatchObject({ code: 'EN', current: true });
  });
});
