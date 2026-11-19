import { describe, expect, it } from 'vitest';
import { formatDate, formatLongDate } from './date.helper';
import { escapeHtml, renderEmphasis, renderLines } from './emphasis.helper';
import { initialsOf } from './initials.helper';

describe('renderEmphasis', () => {
  it('wraps *text* in <em> and turns "|" and newlines into <br />', () => {
    expect(renderEmphasis('Lo que *me diferencia*.')).toBe('Lo que <em class="emph">me diferencia</em>.');
    expect(renderEmphasis('Defendemos, | *a tu lado*', 'x')).toBe('Defendemos,<br /><em class="x">a tu lado</em>');
    expect(renderEmphasis('a\nb')).toBe('a<br />b');
  });

  it('escapes HTML', () => {
    expect(renderEmphasis('<b>"x"</b> & y')).toBe('&lt;b&gt;&quot;x&quot;&lt;/b&gt; &amp; y');
    expect(escapeHtml('<')).toBe('&lt;');
  });
});

describe('renderLines', () => {
  it('turns line breaks into <br /> and escapes HTML', () => {
    expect(renderLines('Calle <1>\n46004 Valencia')).toBe('Calle &lt;1&gt;<br />46004 Valencia');
  });
});

describe('date helpers', () => {
  it('formats short and long dates in the requested language', () => {
    expect(formatDate('2026-10-28T00:00:00Z', 'es')).toBe('28 oct 2026');
    expect(formatLongDate('2026-11-12T12:00:00Z', 'en')).toBe('November 12, 2026');
  });
});

describe('initialsOf', () => {
  it('takes the first two initials in upper case', () => {
    expect(initialsOf('clara ríos martín')).toBe('CR');
    expect(initialsOf('  Ana ')).toBe('A');
  });
});
