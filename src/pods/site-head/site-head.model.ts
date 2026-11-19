export interface SiteHeadVm {
  faviconUrl: string;
  /** Google Fonts stylesheets of the theme fonts */
  fontUrls: string[];
  /** CSS rule that overrides the theme variables of global.css */
  themeCss: string;
}
