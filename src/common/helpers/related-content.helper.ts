/**
 * The Content Island API resolves only one level of relations: deeper relations arrive as ids.
 * Replaces each id with its entry from `entries` (unknown ids are dropped; already resolved items are kept).
 */
export const resolveRelated = <T extends { id?: string }>(list: (T | string)[] = [], entries: T[]): T[] => {
  const byId = new Map(entries.map(entry => [entry.id, entry]));
  return list.map(item => (typeof item === 'string' ? byId.get(item) : item)).filter((item): item is T => Boolean(item));
};
