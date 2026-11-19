import type { LanguageCode } from '@content-island/api-client';
import { mapSectionHeadToVm } from '@common/mappers';
import { sectionAnchor } from '@common/routing';
import type { Review, ReviewsSectionApiData } from './api/reviews-section.api-model';
import type { ReviewsVm, ReviewVm } from './reviews-section.model';
import { ratingStars } from './reviews-section.business';

const mapReview = (review: Review): ReviewVm => ({
  quote: review.quote,
  author: review.author,
  caseType: review.caseType,
  stars: ratingStars(review.rating),
  ratingLabel: `${review.rating} de 5`,
});

/** undefined when there is no header or no reviews: the section is not shown */
export const mapToReviewsVm = ({ page, ui }: ReviewsSectionApiData, lang: LanguageCode): ReviewsVm | undefined => {
  const reviews = page.reviews ?? [];
  if (!page.reviewsHead || reviews.length === 0) return undefined;
  return {
    id: sectionAnchor(lang, 'reviews'),
    head: mapSectionHeadToVm(page.reviewsHead),
    label: ui.reviewsLabel,
    prevLabel: ui.reviewsPrevLabel,
    nextLabel: ui.reviewsNextLabel,
    items: reviews.map(mapReview),
  };
};
