import sanitizeHtml from 'sanitize-html';

export interface InlineSvg {
  viewBox: string;
  /** Presentation attributes of the root <svg> (fill, stroke, stroke-width…) already converted to currentColor */
  attributes: Record<string, string>;
  body: string;
}

const SHAPES = ['g', 'path', 'circle', 'ellipse', 'rect', 'line', 'polyline', 'polygon'];
/** Logos only: text (e.g. a monogram with initials) */
const TEXT = ['text', 'tspan'];
const TEXT_ATTRS = ['font-family', 'font-size', 'font-weight', 'font-style', 'letter-spacing', 'text-anchor', 'dominant-baseline', 'dx', 'dy'];
const PRESENTATION = ['fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'fill-rule', 'clip-rule', 'opacity', 'transform'];
const GEOMETRY = ['d', 'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'x1', 'y1', 'x2', 'y2', 'width', 'height', 'points'];

/**
 * Any color becomes currentColor so the SVG takes the theme color. "none" and theme colors written as
 * var(--color-…) are kept, with or without a fallback (e.g. stroke="var(--color-accent, #1F4F82)":
 * on the site it takes the theme accent and, opened standalone, the fallback color).
 */
const toCurrentColor = (name: string, value: string) =>
  (name === 'fill' || name === 'stroke') && value.trim() !== 'none' && !/^var\(--color-[\w-]+(\s*,\s*[^()]+)?\)$/.test(value.trim()) ? 'currentColor' : value;

const cache = new Map<string, Promise<InlineSvg | null>>();

const load = async (url: string, allowText: boolean): Promise<InlineSvg | null> => {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const source = await res.text();
    const root = source.match(/<svg\b([^>]*)>/i);
    if (!root) return null;

    const rootAttrs = Object.fromEntries([...root[1]!.matchAll(/([\w:-]+)\s*=\s*"([^"]*)"/g)].map(m => [m[1]!, m[2]!]));
    const viewBox = rootAttrs.viewBox ?? `0 0 ${parseFloat(rootAttrs.width ?? '24')} ${parseFloat(rootAttrs.height ?? '24')}`;
    const attributes = Object.fromEntries(
      PRESENTATION.filter(name => rootAttrs[name] !== undefined).map(name => [name, toCurrentColor(name, rootAttrs[name]!)]),
    );

    // Only basic shapes and their attributes: no scripts, styles, links or events
    const inner = source.slice(source.indexOf(root[0]) + root[0].length, source.lastIndexOf('</svg>'));
    const tags = allowText ? [...SHAPES, ...TEXT] : SHAPES;
    const body = sanitizeHtml(inner, {
      allowedTags: tags,
      allowedAttributes: Object.fromEntries(tags.map(tag => [tag, [...PRESENTATION, ...GEOMETRY, ...(allowText ? TEXT_ATTRS : [])]])),
      // SVG shapes are self-closing (<circle/>): without this they would nest inside each other
      parser: { lowerCaseAttributeNames: false, recognizeSelfClosing: true },
      selfClosing: SHAPES.filter(tag => tag !== 'g'),
      transformTags: Object.fromEntries(
        tags.map(tag => [
          tag,
          (tagName: string, attribs: Record<string, string>) => ({
            tagName,
            attribs: Object.fromEntries(Object.entries(attribs).map(([name, value]) => [name, toCurrentColor(name, value)])),
          }),
        ]),
      ),
    });
    return { viewBox, attributes, body };
  } catch {
    return null;
  }
};

/** Downloads (once per URL) a Content Island SVG icon and prepares it for inlining */
export const loadSvgIcon = (url: string): Promise<InlineSvg | null> => {
  if (!cache.has(url)) cache.set(url, load(url, false));
  return cache.get(url)!;
};

/** Same as loadSvgIcon, but allows text (<text>): for monogram-style logos */
export const loadSvgLogo = (url: string): Promise<InlineSvg | null> => {
  const key = `logo:${url}`;
  if (!cache.has(key)) cache.set(key, load(url, true));
  return cache.get(key)!;
};
