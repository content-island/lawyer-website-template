export const escapeHtml = (text: string): string =>
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

/** Line breaks -> <br> (for addresses and opening hours) */
export const renderLines = (text: string): string => escapeHtml(text).replace(/\n/g, '<br />');
