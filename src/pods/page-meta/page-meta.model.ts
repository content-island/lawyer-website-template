export interface HreflangLinkVm {
  hreflang: string;
  href: string;
}

export interface PageMetaVm {
  title: string;
  description: string;
  siteName: string;
  /** Empty when there is no site domain or only one language */
  hreflangLinks: HreflangLinkVm[];
}
