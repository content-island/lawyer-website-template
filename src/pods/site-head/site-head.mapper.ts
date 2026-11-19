import type { General, Theme } from './api/site-head.api-model';
import type { SiteHeadVm } from './site-head.model';
import { buildThemeCss } from './site-head.business';

export const mapToSiteHeadVm = (theme: Theme, general: General): SiteHeadVm => ({
  faviconUrl: general.favIcon.url,
  fontUrls: [theme.fontDisplay, theme.fontTitle, theme.fontBody, theme.fontSignature].map(font => font.url),
  themeCss: buildThemeCss(theme),
});
