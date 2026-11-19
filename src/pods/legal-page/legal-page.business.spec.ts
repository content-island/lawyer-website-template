import { describe, expect, it } from 'vitest';
import { buildUpdatedLine, insertAfterTitle } from './legal-page.business';

describe('buildUpdatedLine', () => {
  it('formats the date in the page language and escapes the label', () => {
    expect(buildUpdatedLine('2026-11-12T12:00:00Z', 'Last <updated>', 'en')).toBe(
      '<p class="legal-updated"><time datetime="2026-11-12T12:00:00Z">Last &lt;updated&gt;: November 12, 2026</time></p>',
    );
  });
});

describe('insertAfterTitle', () => {
  it('goes right after the first h1', () => {
    expect(insertAfterTitle('<h1>T</h1><p>a</p><h1>U</h1>', '<p>x</p>')).toBe('<h1>T</h1><p>x</p><p>a</p><h1>U</h1>');
  });

  it('goes on top when there is no h1', () => {
    expect(insertAfterTitle('<p>a</p>', '<p>x</p>')).toBe('<p>x</p><p>a</p>');
  });
});
