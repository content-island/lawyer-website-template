const escapeHtml = (text: string): string =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Converts the Content Island title convention into safe HTML:
 *   "Lo que *me diferencia*."  ->  "Lo que <em class="…">me diferencia</em>."
 *   "Defendemos,|*a tu lado*"  ->  line break at each "|" (Figma line breaks). Titles are Short text.
 *   Also accepts \n for compatibility with older titles.
 */
export const renderEmphasis = (text: string, emClass = 'emph'): string =>
  escapeHtml(text)
    .replace(/\*([^*]+)\*/g, `<em class="${emClass}">$1</em>`)
    .replace(/[ \t]*(?:\||\r?\n)[ \t]*/g, '<br />');

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
  }
): string =>
  escapeHtml(text)
    .replace(/\{\{(.+?)\}\}/g, `<span class="${classes.highlight}">$1</span>`)
    .replace(/\*\*(.+?)\*\*/g, `<b class="${classes.number}">$1</b>`);

/** Line breaks -> <br> (for addresses and opening hours) */
export const renderLines = (text: string): string => escapeHtml(text).replace(/\n/g, '<br />');

/** ISO date -> "12 de noviembre de 2026" / "November 12, 2026" (legal pages) */
export const formatLongDate = (iso: string, lang: string): string =>
  new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso));

/** ISO date -> "28 oct 2026" */
export const formatDate = (iso: string, lang: string): string =>
  new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short', year: 'numeric' })
    .format(new Date(iso))
    .replace('.', '');
