import type { LanguageCode } from '@content-island/api-client';
import { getContent, getContentList } from '@common/api';
import type { Footer, FooterApiData, General, Header, NavigationItem, Settings, UiText } from './footer.api-model';

/** All NavigationItems of the language are fetched too: column links arrive as ids (see footer.business.ts) */
export const getFooterData = async (lang: LanguageCode): Promise<FooterApiData> => {
  const [footer, navigationItems, settings, ui, general, header] = await Promise.all([
    getContent<Footer>({ contentType: 'Footer', language: lang, includeRelatedContent: true }),
    getContentList<NavigationItem>({ contentType: 'NavigationItem', language: lang }),
    getContent<Settings>({ contentType: 'Settings', language: lang }),
    getContent<UiText>({ contentType: 'UiText', language: lang }),
    getContent<General>({ contentType: 'General', language: lang }),
    getContent<Header>({ contentType: 'Header', language: lang, includeRelatedContent: true }),
  ]);
  return { footer, navigationItems, settings, ui, general, header };
};
