import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SESSION_END_REASONS } from '@/core/constants/session.constant';
import { tokenRefreshService } from '@/core/services/token-refresh.service';

const { refresh, end } = vi.hoisted(() => ({
  refresh: vi.fn<() => Promise<string>>(),
  end: vi.fn(),
}));

vi.mock('@/core/services/access-token.service', () => ({ accessTokenService: { refresh } }));
vi.mock('@/core/services/session.service', () => ({ sessionService: { end } }));

describe('tokenRefreshService.refreshOrEndSession', () => {
  beforeEach(() => {
    refresh.mockReset();
    end.mockReset();
  });

  it('returns the new access token and keeps the session', async () => {
    refresh.mockResolvedValue('fresh-token');

    await expect(tokenRefreshService.refreshOrEndSession()).resolves.toBe('fresh-token');
    expect(end).not.toHaveBeenCalled();
  });

  it('ends the session as expired and rethrows when the refresh fails', async () => {
    const failure = new Error('refresh failed');
    refresh.mockRejectedValue(failure);

    await expect(tokenRefreshService.refreshOrEndSession()).rejects.toBe(failure);
    expect(end).toHaveBeenCalledWith(SESSION_END_REASONS.EXPIRED);
  });
});
