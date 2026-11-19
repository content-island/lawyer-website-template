import type { LanguageCode } from '@content-island/api-client';
import type { CvEntry, Settings, UiText } from './api/about-section.api-model';
import type { CvGroupVm } from './about-section.model';

/** Bar membership isn't written by hand: it comes from Settings (bar, number and year) */
export const buildBarMembership = (settings: Settings, ui: UiText): CvEntry => ({
  title: settings.barAssociation,
  detail: `${ui.barNumberPrefix} ${settings.barNumber} ${ui.barSinceLabel} ${settings.barSince}`,
});

const toItems = (entries: CvEntry[]) => entries.map(({ title, detail }) => ({ title, detail }));

/** Education, then memberships with the bar membership first */
export const buildCvGroups = (
  education: { title: string; items: CvEntry[] },
  memberships: { title: string; items: CvEntry[] },
  barMembership: CvEntry,
): CvGroupVm[] => [
  { title: education.title, items: toItems(education.items) },
  { title: memberships.title, items: toItems([barMembership, ...memberships.items]) },
];

/** "Education and Memberships" / "Formación y Colegiación" */
export const listLabel = (titles: string[], lang: LanguageCode): string => new Intl.ListFormat(lang).format(titles);
