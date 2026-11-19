import { describe, expect, it } from 'vitest';
import type { PageMeta, Settings } from './api/page-meta.api-model';
import { mapToPageMetaVm } from './page-meta.mapper';

describe('mapToPageMetaVm', () => {
  it('combines title, description, site name and hreflang links', () => {
    const settings: Settings = { id: 's', lawyerName: 'Clara Ríos', role: 'Lawyer', language: 'en' };
    const meta: PageMeta = { id: 'm', pageId: 'Home', title: 'Home', description: 'Desc', language: 'en' };
    expect(mapToPageMetaVm({ kind: 'home', settings, meta }, [{ lang: 'en', url: '/', current: true }], undefined, 'en')).toEqual({
      title: 'Home',
      description: 'Desc',
      siteName: 'Clara Ríos · Lawyer',
      hreflangLinks: [],
    });
  });
});
