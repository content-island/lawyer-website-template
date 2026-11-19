import { describe, expect, it } from 'vitest';
import { buildThemeCss, toSafeCssValue } from './site-head.business';
import { theme } from './site-head.spec-data';

describe('toSafeCssValue', () => {
  it('removes characters that could break out of the rule', () => {
    expect(toSafeCssValue(' red;}</style><script> ')).toBe('red/stylescript');
    expect(toSafeCssValue("O'Brien")).toBe('OBrien');
  });
});

describe('buildThemeCss', () => {
  it('builds an html:root rule with the 4 fonts and 4 colors', () => {
    expect(buildThemeCss(theme)).toBe(
      "html:root{--font-name-display: 'Libre Bodoni'; --font-name-title: 'Newsreader'; --font-name-body: 'Instrument Sans'; --font-name-signature: 'Mrs Saint Delafield'; --color-primary: #1F4F82; --color-secondary: #1C2B33; --color-background: #F5F4F0; --color-tertiary: #3C4B3F}",
    );
  });
});
