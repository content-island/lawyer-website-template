import type { LanguageCode } from '@content-island/api-client';
import { renderEmphasis, resolveRelated } from '@common/helpers';
import { sectionIdFromUrl } from '@common/routing';
import type { AboutSectionApiData } from './api/about-section.api-model';
import type { AboutVm } from './about-section.model';
import { buildBarMembership, buildCvGroups, listLabel } from './about-section.business';

export const mapToAboutVm = ({ page: { about }, cvEntries, settings, ui, header }: AboutSectionApiData, lang: LanguageCode): AboutVm => {
  const cvGroups = buildCvGroups(
    { title: about.educationTitle, items: resolveRelated(about.education, cvEntries) },
    { title: about.membershipsTitle, items: resolveRelated(about.memberships, cvEntries) },
    buildBarMembership(settings, ui),
  );
  return {
    id: sectionIdFromUrl(header.about.url),
    eyebrow: about.eyebrow,
    titleHtml: renderEmphasis(about.title),
    intro: about.intro,
    body: about.body,
    signature: about.signature,
    signatureMeta: about.signatureMeta,
    cvLabel: listLabel(cvGroups.map(group => group.title), lang),
    cvGroups,
  };
};
