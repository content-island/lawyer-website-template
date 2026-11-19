import type { SectionHeadVm } from '@common/models';
import type { ArticleCardVm, LinkVm } from '../article.model';

/** Latest articles section of the home page */
export interface ArticleLatestVm {
  id: string;
  head: SectionHeadVm;
  cards: ArticleCardVm[];
  allLink: LinkVm;
}
