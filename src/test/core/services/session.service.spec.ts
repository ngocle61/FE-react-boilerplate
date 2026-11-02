import { afterEach, describe, expect, it } from 'vitest';

import { ROLES } from '@/core/constants/roles.constant';
import { SESSION_END_REASONS } from '@/core/constants/session.constant';
import { queryClient } from '@/core/libs/query-client';
import { authQueries } from '@/core/queries/auth.queries';
import { sessionService } from '@/core/services/session.service';
import { useAuthStore } from '@/core/store/auth.store';
import { createUserDto, resetSession } from '@/test/fixtures/auth-session.fixture';

const TOKENS = { accessToken: 'access-token', refreshToken: 'refresh-token' };

const readCurrentUser = () => queryClient.getQueryData(authQueries.currentUser().queryKey);

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
});
