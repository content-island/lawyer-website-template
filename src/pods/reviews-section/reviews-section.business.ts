/** Review rating (0-5) as stars */
export const ratingStars = (rating: number): string => '★'.repeat(Math.min(5, Math.max(0, Math.round(rating))));
