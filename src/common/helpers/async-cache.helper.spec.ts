import { describe, expect, it, vi } from 'vitest';
import { createAsyncCache } from './async-cache.helper';

describe('createAsyncCache', () => {
  it('loads each key only once when enabled', async () => {
    const cached = createAsyncCache(true);
    const load = vi.fn(async () => 'value');
    expect(await cached('a', load)).toBe('value');
    expect(await cached('a', load)).toBe('value');
    expect(load).toHaveBeenCalledTimes(1);
  });

  it('runs the loader every time when disabled', async () => {
    const cached = createAsyncCache(false);
    const load = vi.fn(async () => 'value');
    await cached('a', load);
    await cached('a', load);
    expect(load).toHaveBeenCalledTimes(2);
  });

  it('evicts rejected promises so the next call retries', async () => {
    const cached = createAsyncCache(true);
    const load = vi.fn().mockRejectedValueOnce(new Error('boom')).mockResolvedValueOnce('ok');
    await expect(cached('a', load)).rejects.toThrow('boom');
    expect(await cached('a', load)).toBe('ok');
  });
});
