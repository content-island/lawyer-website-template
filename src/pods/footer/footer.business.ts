import { resolveRelated } from '@common/helpers';
import type { Footer, NavigationItem } from './api/footer.api-model';

/** Column links arrive as ids: replaces them with their NavigationItem (unknown ids are dropped) */
export const resolveColumnLinks = (links: (NavigationItem | string)[], navigationItems: NavigationItem[]): NavigationItem[] =>
  resolveRelated(links, navigationItems);

/** Bottom links: extra legal links, then privacy policy and cookie policy */
export const legalLinksOf = (footer: Footer): NavigationItem[] => [...(footer.legalLinks ?? []), footer.privacyPolicy, footer.cookies];
