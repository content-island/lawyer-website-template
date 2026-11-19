import { describe, expect, it } from 'vitest';
import { createRoutes } from '@common/routing';
import { mapArticleToCardVm } from './article.mapper';
import { article } from './article.spec-data';

describe('mapArticleToCardVm', () => {
  it('maps a typographic cover when there is no image', () => {
    const vm = mapArticleToCardVm(article('custodia'), 1, 'es', createRoutes('en'));
    expect(vm).toMatchObject({ href: '/es/articulos/custodia/', dateLabel: '28 oct 2026', coverTone: 'bg-accent' });
    expect(vm.cover).toBeUndefined();
  });

  it('maps the cover image with an empty alt by default', () => {
    expect(mapArticleToCardVm(article('x', { name: 'i', url: 'img.jpg' }), 0, 'en', createRoutes('en')).cover).toEqual({ url: 'img.jpg', alt: '' });
  });
});
