import type { LanguageCode } from '@content-island/api-client';
import client from '@lib/client';
import type { LegalPage } from '@models/index';

export type LegalType = 'Cookies' | 'PrivacyPolicy';

export const getLegalPage = async (lang: LanguageCode, type: LegalType): Promise<LegalPage> =>
  await client.getContent<LegalPage>({ contentType: type, language: lang });
