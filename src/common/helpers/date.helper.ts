/** ISO date -> "12 de noviembre de 2026" / "November 12, 2026" (legal pages) */
export const formatLongDate = (iso: string, lang: string): string =>
  new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso));

/** ISO date -> "28 oct 2026" */
export const formatDate = (iso: string, lang: string): string =>
  new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short', year: 'numeric' })
    .format(new Date(iso))
    .replace('.', '');
