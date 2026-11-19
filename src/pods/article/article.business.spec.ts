import { describe, expect, it } from 'vitest';
import { coverTone, positionOf, relatedArticles } from './article.business';

const list = ['a', 'b', 'c', 'd'].map(slug => ({ slug }));

describe('coverTone', () => {
  it('cycles through ink, accent and tertiary', () => {
    expect([0, 1, 2, 3].map(coverTone)).toEqual(['bg-ink', 'bg-accent', 'bg-green', 'bg-ink']);
    expect(coverTone(-1)).toBe('bg-green');
  });
});

describe('positionOf', () => {
  it('returns the index in the list, or -1', () => {
    expect(positionOf(list, 'c')).toBe(2);
    expect(positionOf(list, 'z')).toBe(-1);
  });
});

describe('relatedArticles', () => {
  it('returns the most recent articles other than the current one', () => {
    expect(relatedArticles(list, 'a').map(item => item.slug)).toEqual(['b', 'c']);
    expect(relatedArticles(list, 'b', 3).map(item => item.slug)).toEqual(['a', 'c', 'd']);
  });
});
