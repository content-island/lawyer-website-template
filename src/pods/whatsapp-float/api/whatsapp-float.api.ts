import type { LanguageCode } from '@content-island/api-client';
import { getContent } from '@common/api';
import type { Settings, UiText } from './whatsapp-float.api-model';

export const getSettings = (lang: LanguageCode) => getContent<Settings>({ contentType: 'Settings', language: lang });

export const getUiText = (lang: LanguageCode) => getContent<UiText>({ contentType: 'UiText', language: lang });
