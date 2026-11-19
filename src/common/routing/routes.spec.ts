import { describe, expect, it } from 'vitest';
import { createRoutes, sectionAnchor, sectionIdFromUrl, toPathParam } from './routes';

const routes = createRoutes('en');

describe('createRoutes', () => {
  it('has no prefix for the default language', () => {
    expect(routes.home('en')).toBe('/');
    expect(routes.articles('en')).toBe('/articles/');
    expect(routes.article('en', 'x')).toBe('/articles/x/');
    expect(routes.page('en', '/cookie-policy')).toBe('/cookie-policy');
  });

  it('prefixes the other languages and translates the articles segment', () => {
    expect(routes.home('es')).toBe('/es/');
    expect(routes.homeSection('es', 'areas')).toBe('/es/#areas');
    expect(routes.articles('es')).toBe('/es/articulos/');
    expect(routes.article('de', 'y')).toBe('/de/artikel/y/');
    expect(routes.fromCms('es', '/#contacto')).toBe('/es/#contacto');
    expect(routes.fromCms('es', 'politica')).toBe('/es/politica');
  });
});

describe('routing helpers', () => {
  it('sectionIdFromUrl strips "/" and "#"', () => {
    expect(sectionIdFromUrl('/#areas')).toBe('areas');
    expect(sectionIdFromUrl('#about')).toBe('about');
  });

  it('toPathParam trims slashes and maps the root to undefined', () => {
    expect(toPathParam('/es/articulos/x/')).toBe('es/articulos/x');
    expect(toPathParam('/')).toBeUndefined();
  });

  it('sectionAnchor falls back to English', () => {
    expect(sectionAnchor('es', 'faq')).toBe('preguntas-frecuentes');
    expect(sectionAnchor('fr', 'faq')).toBe('faq');
  });
});
