import { escapeHtml } from '@common/helpers';

/**
 * Credentials sentence:
 *   {{text}}    -> highlighted in ink
 *   **figure**  -> large italic accent figure
 */
export const renderCredentials = (
  text: string,
  classes = {
    highlight: 'text-ink tab:whitespace-nowrap',
    number: 'text-accent text-[1.5em] leading-0 font-normal italic lining-nums',
  },
): string =>
  escapeHtml(text)
    .replace(/\{\{(.+?)\}\}/g, `<span class="${classes.highlight}">$1</span>`)
    .replace(/\*\*(.+?)\*\*/g, `<b class="${classes.number}">$1</b>`);
