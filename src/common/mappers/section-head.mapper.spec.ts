import { describe, expect, it } from 'vitest';
import { mapSectionHeadToVm } from './section-head.mapper';

describe('mapSectionHeadToVm', () => {
  it('renders the title emphasis and keeps eyebrow and lead', () => {
    expect(mapSectionHeadToVm({ eyebrow: 'E', title: 'Lo que *importa*' })).toEqual({
      eyebrow: 'E',
      titleHtml: 'Lo que <em class="emph">importa</em>',
      lead: undefined,
    });
  });
});
