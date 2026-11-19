import type { LanguageCode } from '@content-island/api-client';
import { getContent } from '@common/api';
import type { LegalType } from '@common/routing';
import type { LegalPage, UiText } from './legal-page.api-model';

export const getLegalPage = (lang: LanguageCode, type: LegalType) => getContent<LegalPage>({ contentType: type, language: lang });

export const getUiText = (lang: LanguageCode) => getContent<UiText>({ contentType: 'UiText', language: lang });
