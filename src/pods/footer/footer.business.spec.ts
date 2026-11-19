import { describe, expect, it } from 'vitest';
import { legalLinksOf, resolveColumnLinks } from './footer.business';
import { footerData, navItem } from './footer.spec-data';

describe('resolveColumnLinks', () => {
  it('replaces ids with their NavigationItem and drops unknown ids', () => {
    const links = resolveColumnLinks(footerData.footer.columns[0]!.links, footerData.navigationItems);
    expect(links.map(link => link.label)).toEqual(['Divorce', 'Wills']);
  });
});

describe('legalLinksOf', () => {
  it('puts extra legal links first, then privacy and cookies', () => {
    expect(legalLinksOf(footerData.footer).map(link => link.id)).toEqual(['l', 'pp', 'ck']);
  });

  it('works without extra legal links', () => {
    const { legalLinks, ...footer } = footerData.footer;
    expect(legalLinksOf({ ...footer, privacyPolicy: navItem('p', 'P', '/p') }).map(link => link.id)).toEqual(['p', 'ck']);
  });
});
