import { describe, expect, it } from 'vitest';
import type { ReviewsSectionApiData } from './api/reviews-section.api-model';
import { ratingStars } from './reviews-section.business';
import { mapToReviewsVm } from './reviews-section.mapper';

const data = (): ReviewsSectionApiData => ({
  page: {
    id: 'p',
    reviewsHead: { id: 'h', eyebrow: 'Opiniones', title: 'Lo que *dicen*' },
    reviews: [{ id: 'r', quote: 'Genial', author: 'Ana', caseType: 'Divorcio', rating: 4 }],
    language: 'es',
  },
  ui: { id: 'u', reviewsLabel: 'Opiniones', reviewsPrevLabel: 'Anterior', reviewsNextLabel: 'Siguiente', language: 'es' },
});

describe('ratingStars', () => {
  it('draws one star per point, clamped to 0-5', () => {
    expect(ratingStars(4)).toBe('★★★★');
    expect(ratingStars(9)).toBe('★★★★★');
    expect(ratingStars(-1)).toBe('');
  });
});

describe('mapToReviewsVm', () => {
  it('maps each review with its stars', () => {
    const vm = mapToReviewsVm(data(), 'es');
    expect(vm?.id).toBe('opiniones');
    expect(vm?.items).toEqual([{ quote: 'Genial', author: 'Ana', caseType: 'Divorcio', stars: '★★★★', ratingLabel: '4 de 5' }]);
  });

  it('hides the section without a header or without reviews', () => {
    const noReviews = data();
    noReviews.page.reviews = [];
    const noHead = data();
    noHead.page.reviewsHead = undefined;
    expect([mapToReviewsVm(noReviews, 'es'), mapToReviewsVm(noHead, 'es')]).toEqual([undefined, undefined]);
  });
});
