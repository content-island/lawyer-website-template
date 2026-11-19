import { describe, expect, it } from 'vitest';
import { mapToSiteHeadVm } from './site-head.mapper';
import { theme } from './site-head.spec-data';

describe('mapToSiteHeadVm', () => {
  it('maps favicon, font stylesheets and theme css', () => {
    const vm = mapToSiteHeadVm(theme, { id: 'g', favIcon: { name: 'f', url: '/favicon.svg' }, language: 'en' });
    expect(vm.faviconUrl).toBe('/favicon.svg');
    expect(vm.fontUrls).toEqual(['https://fonts/Libre Bodoni', 'https://fonts/Newsreader', 'https://fonts/Instrument Sans', 'https://fonts/Mrs Saint Delafield']);
    expect(vm.themeCss.startsWith('html:root{')).toBe(true);
  });
});
