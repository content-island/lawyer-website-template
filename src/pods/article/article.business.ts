import type { CoverTone } from './article.model';

interface WithSlug {
  slug: string;
}

/**
 * Typographic cover for articles without an image: the color alternates by the article's position
 * (most recent to oldest) between ink, accent and tertiary. All three come from the theme.
 */
const COVER_TONES: readonly CoverTone[] = ['bg-ink', 'bg-accent', 'bg-green'];
export const coverTone = (position: number): CoverTone =>
  COVER_TONES[((position % COVER_TONES.length) + COVER_TONES.length) % COVER_TONES.length]!;

/** Position of an article in the full list (most recent = 0). Decides the typographic cover color */
export const positionOf = (articles: WithSlug[], slug: string): number => articles.findIndex(article => article.slug === slug);

/** The most recent articles other than the current one */
export const relatedArticles = <T extends WithSlug>(articles: T[], slug: string, limit = 2): T[] =>
  articles.filter(article => article.slug !== slug).slice(0, limit);
