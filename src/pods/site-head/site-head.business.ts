import type { Theme } from './api/site-head.api-model';

/** CMS values go inside a <style> rule: drop anything that could close the declaration or the tag */
export const toSafeCssValue = (value: string): string => value.replace(/[;{}<>"'\\]/g, '').trim();

/**
 * CSS variables from the Content Island Theme (4 colors + 4 fonts). global.css declares the defaults
 * in `:root`; the generated `html:root` rule is more specific, so it wins whatever the stylesheet order.
 */
export const buildThemeCss = (theme: Theme): string => {
  const variables: [string, string][] = [
    ['--font-name-display', `'${toSafeCssValue(theme.fontDisplay.name)}'`],
    ['--font-name-title', `'${toSafeCssValue(theme.fontTitle.name)}'`],
    ['--font-name-body', `'${toSafeCssValue(theme.fontBody.name)}'`],
    ['--font-name-signature', `'${toSafeCssValue(theme.fontSignature.name)}'`],
    ['--color-primary', toSafeCssValue(theme.colorPrimary)],
    ['--color-secondary', toSafeCssValue(theme.colorSecondary)],
    ['--color-background', toSafeCssValue(theme.colorBackground)],
    ['--color-tertiary', toSafeCssValue(theme.colorTertiary)],
  ];
  return `html:root{${variables.map(([name, value]) => `${name}: ${value}`).join('; ')}}`;
};
