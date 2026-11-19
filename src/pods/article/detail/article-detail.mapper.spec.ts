import { describe, expect, it } from 'vitest';
import { createRoutes } from '@common/routing';
import type { Article } from '../api/article.api-model';
import { article, articlesExtra } from '../article.spec-data';
import type { ArticleDetailSource } from './article-detail.model';
import { mapToArticleDetailVm } from './article-detail.mapper';

const data = (current: Article): ArticleDetailSource => ({
  article: current,
  articles: [article('a'), article('b'), article('c')],
  extra: articlesExtra,
  ui: { id: 'u', backToHomeLabel: 'Inicio', moreArticlesTitle: 'Más artículos', language: 'es' },
  header: { id: 'h', articles: { id: 'a', label: 'Artículos', url: '/#articulos' }, contact: { id: 'c', label: 'Contacto', url: '/#contacto' }, language: 'es' },
});

describe('mapToArticleDetailVm', () => {
  const routes = createRoutes('en');

  it('maps the header with a typographic cover by position', () => {
    const vm = mapToArticleDetailVm(data(article('b')), '<h1>Body</h1>', 'es', routes);
    expect(vm.hero).toMatchObject({ backLink: { label: 'Artículos', href: '/es/articulos/' }, dateLabel: '28 oct 2026', coverTone: 'bg-accent' });
    expect(vm.hero.cover).toBeUndefined();
    expect(vm.bodyHtml).toBe('<h1>Body</h1>');
    expect(vm.cta.href).toBe('/es/#contacto');
  });

  it('maps the cover image and two related articles with their own positions', () => {
    const vm = mapToArticleDetailVm(data(article('a', { name: 'i', url: 'img.jpg' })), '', 'es', routes);
    expect(vm.hero.cover).toEqual({ url: 'img.jpg', alt: '' });
    expect(vm.more.cards.map(card => [card.href, card.coverTone])).toEqual([
      ['/es/articulos/b/', 'bg-accent'],
      ['/es/articulos/c/', 'bg-green'],
    ]);
    expect(vm.more.allLink).toEqual({ label: 'Ver todos', href: '/es/articulos/' });
  });
});
