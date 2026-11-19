/**
 * Memoizes promises by key. A rejected promise is evicted, so the next call retries.
 * With `enabled = false` every call runs the loader (development).
 */
export const createAsyncCache = (enabled: boolean) => {
  const store = new Map<string, Promise<unknown>>();
  return <T>(key: string, load: () => Promise<T>): Promise<T> => {
    if (!enabled) return load();
    if (!store.has(key)) {
      const promise = load().catch(error => {
        store.delete(key);
        throw error;
      });
      store.set(key, promise);
    }
    return store.get(key) as Promise<T>;
  };
};
