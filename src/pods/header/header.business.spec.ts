import { describe, expect, it } from 'vitest';
import { createRoutes } from '@common/routing';
import { buildLanguageOptions, buildNavLinks, nativeLanguageName, toSectionHref, type NavContext } from './header.business';
import { headerData } from './header.spec-data';

const routes = createRoutes('en');

describe('toSectionHref', () => {
  it('uses anchors on the home page and home URLs elsewhere', () => {
    const onHome: NavContext = { lang: 'es', onHome: true, routes };
    expect(toSectionHref('/#areas', onHome)).toBe('#areas');
    expect(toSectionHref('/#areas', { ...onHome, onHome: false })).toBe('/es/#areas');
  });
});

describe('buildNavLinks', () => {
  const context: NavContext = { lang: 'en', onHome: true, routes };

  it('includes the article list link only when there are articles', () => {
    expect(buildNavLinks(headerData.header, true, context).map(link => link.href)).toEqual(['#areas', '#about', '/articles/', '#contact']);
    expect(buildNavLinks(headerData.header, false, context).map(link => link.label)).toEqual(['Areas', 'About', 'Contact']);
  });
});

describe('language options', () => {
  it('writes each language name in its own language, capitalized', () => {
    expect(nativeLanguageName('es')).toBe('Español');
    expect(nativeLanguageName('fr')).toBe('Français');
  });

  it('adds code and native name to each alternate', () => {
    expect(buildLanguageOptions([{ lang: 'es', url: '/es/', current: true }])).toEqual([
      { lang: 'es', url: '/es/', current: true, code: 'ES', nativeName: 'Español' },
    ]);
  });
});
