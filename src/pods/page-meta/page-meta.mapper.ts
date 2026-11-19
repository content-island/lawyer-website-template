import type { LanguageAlternate } from '@common/routing';
import type { PageMetaSource } from './api/page-meta.api-model';
import type { PageMetaVm } from './page-meta.model';
import { buildHreflangLinks, buildSiteName, buildTitleAndDescription } from './page-meta.business';

export const mapToPageMetaVm = (
  source: PageMetaSource,
  alternates: LanguageAlternate[],
  site: URL | undefined,
  defaultLanguage: string,
): PageMetaVm => ({
  ...buildTitleAndDescription(source),
  siteName: buildSiteName(source.settings),
  hreflangLinks: buildHreflangLinks(alternates, site, defaultLanguage),
});
