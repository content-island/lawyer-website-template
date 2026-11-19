import { describe, expect, it } from 'vitest';
import { createRoutes } from '@common/routing';
import { article, articlesExtra } from '../article.spec-data';
import { mapToArticleListVm } from './article-list.mapper';

describe('mapToArticleListVm', () => {
  it('maps the header and one card per article, keeping the list position', () => {
    const ui = { id: 'u', backToHomeLabel: 'Inicio', moreArticlesTitle: 'Más', language: 'es' as const };
    const vm = mapToArticleListVm([article('a'), article('b')], articlesExtra, ui, 'en', createRoutes('en'));
    expect(vm.backLink).toEqual({ label: 'Inicio', href: '/' });
    expect(vm.titleHtml).toBe('Notas <em class="emph">legales</em>');
    expect(vm.cards.map(card => [card.href, card.coverTone])).toEqual([
      ['/articles/a/', 'bg-ink'],
      ['/articles/b/', 'bg-accent'],
    ]);
  });
});
