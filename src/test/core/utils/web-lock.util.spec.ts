import { afterEach, describe, expect, it, vi } from 'vitest';

import { runWithWebLock } from '@/core/utils/web-lock.util';

const LOCK_NAME = 'test-lock';

const stubLocks = () => {
  const request = vi.fn((_name: string, task: () => Promise<string>) => task());
  Object.defineProperty(navigator, 'locks', { configurable: true, value: { request } });
  return request;
};

describe('runWithWebLock', () => {
  afterEach(() => {
    Reflect.deleteProperty(navigator, 'locks');
  });

  it('runs the task inside the named lock when the browser supports it', async () => {
    const request = stubLocks();

    await expect(runWithWebLock(LOCK_NAME, () => Promise.resolve('done'))).resolves.toBe('done');
    expect(request).toHaveBeenCalledWith(LOCK_NAME, expect.any(Function));
  });

  it('runs the task directly when the browser has no Web Locks', async () => {
    await expect(runWithWebLock(LOCK_NAME, () => Promise.resolve('done'))).resolves.toBe('done');
  });
});
