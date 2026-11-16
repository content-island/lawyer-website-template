/**
 * Portada tipográfica de los artículos sin imagen: el color alterna según la posición del artículo
 * (del más reciente al más antiguo) entre tinta, acento y terciario. Los tres salen del tema.
 */
const COVER_TONES = ['bg-ink', 'bg-accent', 'bg-green'] as const;

export const coverTone = (position: number) => COVER_TONES[((position % COVER_TONES.length) + COVER_TONES.length) % COVER_TONES.length];
