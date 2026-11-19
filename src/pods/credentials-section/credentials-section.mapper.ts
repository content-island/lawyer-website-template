import { sectionIdFromUrl } from '@common/routing';
import type { CredentialsSectionApiData } from './api/credentials-section.api-model';
import type { CredentialsVm } from './credentials-section.model';
import { renderCredentials } from './credentials-section.business';

export const mapToCredentialsVm = ({ page: { credentials }, ui, header }: CredentialsSectionApiData): CredentialsVm => ({
  label: ui.credentialsLabel,
  textHtml: renderCredentials(credentials.text),
  link: { label: credentials.linkLabel, href: `#${sectionIdFromUrl(header.about.url)}` },
});
