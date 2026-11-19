export interface LinkVm {
  label: string;
  href: string;
}

/** Typographic cover colors (theme ink, accent and tertiary) */
export type CoverTone = 'bg-ink' | 'bg-accent' | 'bg-green';

/** Article card: home section, article list and "more articles" */
export interface ArticleCardVm {
  href: string;
  title: string;
  category: string;
  /** Legal reference used as the typographic cover (e.g. "Art. 92") */
  reference: string;
  dateIso: string;
  dateLabel: string;
  readingTime: string;
  excerpt: string;
  /** Without an image, a typographic cover is drawn in `coverTone` */
  cover?: { url: string; alt: string };
  coverTone: CoverTone;
}
