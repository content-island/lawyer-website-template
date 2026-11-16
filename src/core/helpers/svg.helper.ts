import sanitizeHtml from 'sanitize-html';

export interface InlineSvg {
  viewBox: string;
  /** Atributos de presentación del <svg> raíz (fill, stroke, stroke-width…) ya pasados a currentColor */
  attributes: Record<string, string>;
  body: string;
}

const SHAPES = ['g', 'path', 'circle', 'ellipse', 'rect', 'line', 'polyline', 'polygon'];
/** Solo para logos: texto (p. ej. un monograma con iniciales) */
const TEXT = ['text', 'tspan'];
const TEXT_ATTRS = ['font-family', 'font-size', 'font-weight', 'font-style', 'letter-spacing', 'text-anchor', 'dominant-baseline', 'dx', 'dy'];
const PRESENTATION = ['fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'fill-rule', 'clip-rule', 'opacity', 'transform'];
const GEOMETRY = ['d', 'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'x1', 'y1', 'x2', 'y2', 'width', 'height', 'points'];

/**
 * Cualquier color pasa a currentColor, para que el SVG tome el color del tema. Se respetan "none" y los colores
 * del tema escritos como var(--color-…), con o sin color de reserva (p. ej. stroke="var(--color-accent, #1F4F82)":
 * en la web toma el acento del tema y, abierto suelto, el color de reserva).
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

    // Solo formas básicas y sus atributos: fuera scripts, estilos, enlaces y eventos
    const inner = source.slice(source.indexOf(root[0]) + root[0].length, source.lastIndexOf('</svg>'));
    const tags = allowText ? [...SHAPES, ...TEXT] : SHAPES;
    const body = sanitizeHtml(inner, {
      allowedTags: tags,
      allowedAttributes: Object.fromEntries(tags.map(tag => [tag, [...PRESENTATION, ...GEOMETRY, ...(allowText ? TEXT_ATTRS : [])]])),
      // Las formas SVG se cierran solas (<circle/>): sin esto se anidarían unas dentro de otras
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

/** Descarga (una sola vez por URL) un icono SVG de Content Island y lo prepara para insertarlo en línea */
export const loadSvgIcon = (url: string): Promise<InlineSvg | null> => {
  if (!cache.has(url)) cache.set(url, load(url, false));
  return cache.get(url)!;
};

/** Igual que loadSvgIcon, pero admite texto (<text>): para logos tipo monograma */
export const loadSvgLogo = (url: string): Promise<InlineSvg | null> => {
  const key = `logo:${url}`;
  if (!cache.has(key)) cache.set(key, load(url, true));
  return cache.get(key)!;
};
