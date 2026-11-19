import type { LanguageCode } from '@content-island/api-client';
import { getContent, getContentList } from '@common/api';
import type { Article, General, Header, HeaderApiData, Settings, UiText } from './header.api-model';

export const getHeaderData = async (lang: LanguageCode): Promise<HeaderApiData> => {
  const [header, settings, general, ui, articles] = await Promise.all([
    getContent<Header>({ contentType: 'Header', language: lang, includeRelatedContent: true }),
    getContent<Settings>({ contentType: 'Settings', language: lang }),
    getContent<General>({ contentType: 'General', language: lang }),
    getContent<UiText>({ contentType: 'UiText', language: lang }),
    getContentList<Article>({ contentType: 'Article', language: lang, sort: { 'fields.date': 'desc' } }),
  ]);
  return { header, settings, general, ui, articles };
};
