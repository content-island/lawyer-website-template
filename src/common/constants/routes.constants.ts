import { createRoutes } from '@common/routing';
import { DEFAULT_LANGUAGE } from './language.constants';

/** Routes of this site (default language = first one in Content Island) */
export const routes = createRoutes(DEFAULT_LANGUAGE);
