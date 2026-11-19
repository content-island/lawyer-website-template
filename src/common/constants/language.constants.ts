import type { LanguageCode } from '@content-island/api-client';
import { getProject } from '@common/api';

const { languages } = await getProject();

/** Project languages, in the Content Island order */
export const LANGUAGES: LanguageCode[] = languages;

/**
 * Default language = the FIRST one in the project's language list in Content Island.
 * It is served at the root, with no prefix and no redirects (/, /articles/…); the rest are prefixed (/es/, /es/articulos/…).
 * If languages are reordered or removed in Content Island, routes update automatically on the next build.
 */
export const DEFAULT_LANGUAGE: LanguageCode = LANGUAGES[0]!;
