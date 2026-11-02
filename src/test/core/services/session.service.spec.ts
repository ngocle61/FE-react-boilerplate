import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { ROLES } from '@/core/constants/roles.constant';
import { SESSION_END_REASONS } from '@/core/constants/session.constant';
import { STORAGE_KEYS } from '@/core/constants/storage-keys.constant';
import { queryClient } from '@/core/libs/query-client';
import { authQueries } from '@/core/queries/auth.queries';
import { sessionService } from '@/core/services/session.service';
import { useAuthStore } from '@/core/store/auth.store';
import { createUserDto, resetSession } from '@/test/fixtures/auth-session.fixture';

const TOKENS = { accessToken: 'access-token', refreshToken: 'refresh-token' };
const ROTATED_TOKENS = { accessToken: 'access-2', refreshToken: 'refresh-2' };

const readCurrentUser = () => queryClient.getQueryData(authQueries.currentUser().queryKey);

const emitFromOtherTab = async (
  state: Record<string, Nullable<string>>,
  key: string = STORAGE_KEYS.AUTH,
) => {
  const newValue = JSON.stringify({ state, version: 0 });
  localStorage.setItem(STORAGE_KEYS.AUTH, newValue);
  window.dispatchEvent(new StorageEvent('storage', { key, newValue }));
  await Promise.resolve();
};

describe('sessionService', () => {
  afterEach(() => {
    resetSession();
  });

  it('starts a session with the tokens and seeds the current user', () => {
    useAuthStore.setState({ endReason: SESSION_END_REASONS.EXPIRED });
    const user = createUserDto(ROLES.ADMIN);

    sessionService.start({ user, tokens: TOKENS });

    expect(readCurrentUser()).toEqual(user);
    expect(useAuthStore.getState()).toMatchObject({ ...TOKENS, endReason: null });
  });

  it('ends a session by dropping the tokens and every cached query', () => {
    sessionService.start({ user: createUserDto(ROLES.ADMIN), tokens: TOKENS });

    sessionService.end(SESSION_END_REASONS.EXPIRED);

    expect(readCurrentUser()).toBeUndefined();
    expect(useAuthStore.getState()).toMatchObject({
      accessToken: null,
      refreshToken: null,
      endReason: SESSION_END_REASONS.EXPIRED,
    });
  });

  describe('startTabSync', () => {
    const user = createUserDto(ROLES.ADMIN);
    let stop: () => void = () => undefined;

    beforeEach(() => {
      sessionService.start({ user, tokens: TOKENS });
      stop = sessionService.startTabSync();
    });

    afterEach(() => {
      stop();
    });

    it('picks up tokens another tab refreshed and keeps the cache', async () => {
      await emitFromOtherTab(ROTATED_TOKENS);

      expect(useAuthStore.getState()).toMatchObject(ROTATED_TOKENS);
      expect(readCurrentUser()).toEqual(user);
    });

    it('ends the session and drops the cache when another tab signed out', async () => {
      await emitFromOtherTab({ accessToken: null, refreshToken: null });

      expect(useAuthStore.getState()).toMatchObject({ accessToken: null, refreshToken: null });
      expect(readCurrentUser()).toBeUndefined();
    });

    it('ignores changes to other storage keys', async () => {
      await emitFromOtherTab(ROTATED_TOKENS, STORAGE_KEYS.THEME);

      expect(useAuthStore.getState()).toMatchObject(TOKENS);
    });

    it('stops listening once stopped', async () => {
      stop();

      await emitFromOtherTab(ROTATED_TOKENS);

      expect(useAuthStore.getState()).toMatchObject(TOKENS);
    });
  });
});
