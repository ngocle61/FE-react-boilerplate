import { describe, expect, it } from 'vitest';

import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';
import { SESSION_END_REASONS } from '@/core/constants/session.constant';
import { toSafeRedirectPath, toSignInPath } from '@/core/utils/redirect.util';

describe('toSafeRedirectPath', () => {
  it.each([null, undefined, '', 'https://evil.com', '//evil.com', '/\\evil.com'])(
    'falls back to root for %s',
    (value) => {
      expect(toSafeRedirectPath(value)).toBe(ROUTE_PATHS.ROOT);
    },
  );

  it('keeps an internal path with its query string', () => {
    expect(toSafeRedirectPath('/calendar?view=week')).toBe('/calendar?view=week');
  });
});

describe('toSignInPath', () => {
  const location = { pathname: '/chat', search: '?id=1', hash: '' };

  it('remembers the requested location', () => {
    expect(toSignInPath(location, null)).toBe('/sign-in?redirect=%2Fchat%3Fid%3D1');
  });

  it('remembers the location after the session expired', () => {
    expect(toSignInPath(location, SESSION_END_REASONS.EXPIRED)).toBe(
      '/sign-in?redirect=%2Fchat%3Fid%3D1',
    );
  });

  it('forgets the location after an explicit sign-out', () => {
    expect(toSignInPath(location, SESSION_END_REASONS.SIGN_OUT)).toBe(ROUTE_PATHS.SIGN_IN);
  });

  it('skips the redirect for the root path', () => {
    expect(toSignInPath({ pathname: '/', search: '', hash: '' }, null)).toBe(ROUTE_PATHS.SIGN_IN);
  });
});
