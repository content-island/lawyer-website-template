import type { LanguageCode } from '@content-island/api-client';
import { getContent } from '@common/api';
import type { General, Theme } from './site-head.api-model';

export const getTheme = (lang: LanguageCode) => getContent<Theme>({ contentType: 'Theme', language: lang, includeRelatedContent: true });

export const getGeneral = (lang: LanguageCode) => getContent<General>({ contentType: 'General', language: lang });
