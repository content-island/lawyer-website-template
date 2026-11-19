import { escapeHtml, formatLongDate } from '@common/helpers';

export const buildUpdatedLine = (lastUpdate: string, label: string, lang: string): string =>
  `<p class="legal-updated"><time datetime="${escapeHtml(lastUpdate)}">${escapeHtml(label)}: ${formatLongDate(lastUpdate, lang)}</time></p>`;

/** The last revision date goes right below the title (the first h1 in the markdown), or on top if there is none */
export const insertAfterTitle = (bodyHtml: string, lineHtml: string): string =>
  bodyHtml.includes('</h1>') ? bodyHtml.replace('</h1>', `</h1>${lineHtml}`) : lineHtml + bodyHtml;
