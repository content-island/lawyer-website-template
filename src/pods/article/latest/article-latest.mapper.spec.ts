import { describe, expect, it } from 'vitest';
import { createRoutes } from '@common/routing';
import { article, articlesExtra } from '../article.spec-data';
import { LATEST_ARTICLES_LIMIT, mapToArticleLatestVm, type ArticleLatestSource } from './article-latest.mapper';

const source = (): ArticleLatestSource => ({
  head: { id: 'h', eyebrow: 'Artículos', title: 'Lo *último*' },
  articles: ['a', 'b', 'c', 'd'].map(slug => article(slug)),
  extra: articlesExtra,
  header: { id: 'hd', articles: { id: 'a', label: 'Artículos', url: '/#articulos' }, contact: { id: 'c', label: 'Contacto', url: '/#contacto' }, language: 'es' },
});
const routes = createRoutes('en');

describe('mapToArticleLatestVm', () => {
  it('shows the latest articles and links to the full list', () => {
    const vm = mapToArticleLatestVm(source(), 'es', routes);
    expect(vm?.id).toBe('articulos');
    expect(vm?.cards).toHaveLength(LATEST_ARTICLES_LIMIT);
    expect(vm?.allLink).toEqual({ label: 'Ver todos', href: '/es/articulos/' });
  });

  it('hides the section without articles or without a header', () => {
    expect(mapToArticleLatestVm({ ...source(), articles: [], extra: undefined }, 'es', routes)).toBeUndefined();
    expect(mapToArticleLatestVm({ ...source(), head: undefined }, 'es', routes)).toBeUndefined();
  });
});
