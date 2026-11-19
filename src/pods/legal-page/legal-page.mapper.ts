import type { LanguageCode } from '@content-island/api-client';
import type { Routes } from '@common/routing';
import type { LegalPage, UiText } from './api/legal-page.api-model';
import type { LegalPageVm } from './legal-page.model';
import { buildUpdatedLine, insertAfterTitle } from './legal-page.business';

/** `bodyHtml`: the page markdown already converted to safe HTML */
export const mapToLegalPageVm = (page: LegalPage, bodyHtml: string, ui: UiText, lang: LanguageCode, routes: Routes): LegalPageVm => ({
  backLink: { label: ui.backToHomeLabel, href: routes.home(lang) },
  html: insertAfterTitle(bodyHtml, buildUpdatedLine(page.lastUpdate, ui.legalUpdatedLabel, lang)),
});
