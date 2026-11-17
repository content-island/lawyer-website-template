/**
 * Typographic cover for articles without an image: the color alternates by the article's position
 * (most recent to oldest) between ink, accent and tertiary. All three come from the theme.
 */
const COVER_TONES = ['bg-ink', 'bg-accent', 'bg-green'] as const;

export const coverTone = (position: number) => COVER_TONES[((position % COVER_TONES.length) + COVER_TONES.length) % COVER_TONES.length];
