const escapeHtml = (text: string): string =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Convierte la convención de títulos de Content Island en HTML seguro:
 *   "Lo que *me diferencia*."  ->  "Lo que <em class="…">me diferencia</em>."
 *   "Defendemos,|*a tu lado*"  ->  salto de línea en cada "|" (cortes de línea de Figma). Los títulos son Short text.
 *   También acepta \n por compatibilidad con títulos antiguos.
 */
export const renderEmphasis = (text: string, emClass = 'emph'): string =>
  escapeHtml(text)
    .replace(/\*([^*]+)\*/g, `<em class="${emClass}">$1</em>`)
    .replace(/[ \t]*(?:\||\r?\n)[ \t]*/g, '<br />');

/**
 * Frase de credenciales:
 *   {{texto}}  -> resaltado en tinta
 *   **cifra**  -> cifra grande en cursiva de acento
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

/** Saltos de línea -> <br> (para direcciones y horarios) */
export const renderLines = (text: string): string => escapeHtml(text).replace(/\n/g, '<br />');

/** Fecha ISO -> "12 de noviembre de 2026" / "November 12, 2026" (páginas legales) */
export const formatLongDate = (iso: string, lang: string): string =>
  new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso));

/** Fecha ISO -> "28 oct 2026" */
export const formatDate = (iso: string, lang: string): string =>
  new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short', year: 'numeric' })
    .format(new Date(iso))
    .replace('.', '');
