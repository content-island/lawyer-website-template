import type { LanguageCode } from '@content-island/api-client';
import client from '@lib/client';
import type {
  Article,
  ArticlesExtra,
  CookieBanner,
  CvEntry,
  Footer,
  General,
  Header,
  LawyerPage,
  NavigationItem,
  PageMeta,
  Settings,
  Theme,
  UiText,
} from '@models/index';

// ============================================
// Layout (singletons)
// ============================================

export const getGeneral = async (lang: LanguageCode) => await client.getContent<General>({ contentType: 'General', language: lang });

export const getTheme = async (lang: LanguageCode): Promise<Theme> =>
  await client.getContent<Theme>({ contentType: 'Theme', language: lang, includeRelatedContent: true });

export const getPageMeta = async (lang: LanguageCode, pageId = 'Home'): Promise<PageMeta> =>
  await client.getContent<PageMeta>({ contentType: 'PageMeta', 'fields.pageId': pageId, language: lang });

export const getSettings = async (lang: LanguageCode): Promise<Settings> =>
  await client.getContent<Settings>({ contentType: 'Settings', language: lang });

export const getHeader = async (lang: LanguageCode): Promise<Header> =>
  await client.getContent<Header>({ contentType: 'Header', language: lang, includeRelatedContent: true });

/**
 * The API resolves only one level of relations: columns arrive resolved, but their links arrive as ids.
 * All NavigationItems for the language are fetched and substituted.
 */
export const getFooter = async (lang: LanguageCode): Promise<Footer> => {
  const [footer, navItems] = await Promise.all([
    client.getContent<Footer>({ contentType: 'Footer', language: lang, includeRelatedContent: true }),
    client.getContentList<NavigationItem>({ contentType: 'NavigationItem', language: lang }),
  ]);
  const byId = new Map(navItems.map(item => [item.id, item]));
  const resolve = (link: NavigationItem | string) => (typeof link === 'string' ? byId.get(link) : link);
  return {
    ...footer,
    columns: footer.columns.map(col => ({
      ...col,
      links: (col.links as (NavigationItem | string)[]).map(resolve).filter((l): l is NavigationItem => Boolean(l)),
    })),
    legalLinks: footer.legalLinks ?? [],
  };
};

const uiTextCache = new Map<LanguageCode, Promise<UiText>>();
/** UI strings. Fetched once per language and build */
export const getUiText = (lang: LanguageCode): Promise<UiText> => {
  // Not cached in development, so Content Island changes show up on reload
  if (import.meta.env.DEV) return client.getContent<UiText>({ contentType: 'UiText', language: lang });
  if (!uiTextCache.has(lang)) uiTextCache.set(lang, client.getContent<UiText>({ contentType: 'UiText', language: lang }));
  return uiTextCache.get(lang)!;
};

export const getCookieBanner = async (lang: LanguageCode): Promise<CookieBanner> =>
  await client.getContent<CookieBanner>({ contentType: 'CookieBanner', language: lang });

// ============================================
// Home: a single LawyerPage entry with all sections
// ============================================

const lawyerPageCache = new Map<LanguageCode, Promise<LawyerPage>>();

/**
 * The API resolves only one level of relations: sections arrive resolved, but the CvEntry items
 * in About (education, bar memberships) and ContactSection (GDPR) arrive as ids and are substituted here.
 * At build time it's fetched once per language (all home sections use it); in development, on every reload.
 */
export const getLawyerPage = (lang: LanguageCode): Promise<LawyerPage> => {
  // Not cached in development, so Content Island changes show up on reload
  if (import.meta.env.DEV) return fetchLawyerPage(lang);
  if (!lawyerPageCache.has(lang)) lawyerPageCache.set(lang, fetchLawyerPage(lang));
  return lawyerPageCache.get(lang)!;
};

const fetchLawyerPage = async (lang: LanguageCode): Promise<LawyerPage> => {
  const [page, cvEntries] = await Promise.all([
    client.getContent<LawyerPage>({ contentType: 'LawyerPage', language: lang, includeRelatedContent: true }),
    client.getContentList<CvEntry & { id: string }>({ contentType: 'CvEntry', language: lang }),
  ]);
  const byId = new Map(cvEntries.map(entry => [entry.id, entry]));
  const resolve = (list: (CvEntry | string)[] = []) =>
    list.map(item => (typeof item === 'string' ? byId.get(item) : item)).filter((e): e is CvEntry => Boolean(e));
  return {
    ...page,
    about: { ...page.about, education: resolve(page.about.education), memberships: resolve(page.about.memberships) },
    contact: { ...page.contact, gdpr: resolve(page.contact.gdpr) },
    practiceAreas: page.practiceAreas ?? [],
    whyItems: page.whyItems ?? [],
    processSteps: page.processSteps ?? [],
    reviews: page.reviews ?? [],
    faqItems: page.faqItems ?? [],
  };
};

// ============================================
// Articles (optional: if there are none, nothing is shown)
// ============================================

/** Published articles, most recent first. Empty list if there are none. */
export const getArticles = async (lang: LanguageCode): Promise<Article[]> =>
  await client.getContentList<Article>({ contentType: 'Article', language: lang, sort: { 'fields.date': 'desc' } });

export const getArticle = async (lang: LanguageCode, slug: string): Promise<Article> =>
  await client.getContent<Article>({ contentType: 'Article', 'fields.slug': slug, language: lang });

export const hasArticles = async (lang: LanguageCode): Promise<boolean> => (await getArticles(lang)).length > 0;

export const getArticlesExtra = async (lang: LanguageCode): Promise<ArticlesExtra> =>
  await client.getContent<ArticlesExtra>({ contentType: 'ArticlesExtra', language: lang });
