import { describe, expect, it } from 'vitest';
import { resolveRelated } from './related-content.helper';

describe('resolveRelated', () => {
  const entries = [{ id: 'a', title: 'A' }];

  it('replaces ids, keeps resolved items and drops unknown ids', () => {
    expect(resolveRelated(['a', { id: 'b', title: 'B' }, 'missing'], entries).map(item => item.title)).toEqual(['A', 'B']);
  });

  it('returns an empty list when there is nothing to resolve', () => {
    expect(resolveRelated(undefined, entries)).toEqual([]);
  });
});
