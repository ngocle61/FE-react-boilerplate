export const SESSION_END_REASONS = {
  SIGN_OUT: 'sign-out',
  EXPIRED: 'expired',
} as const;

export const MISSING_REFRESH_TOKEN_ERROR = 'Missing refresh token';

export const SESSION_CHANGED_ERROR = 'Session changed during token refresh';

export const TOKEN_REFRESH_LOCK = 'app-auth-refresh';

export const TOKEN_REFRESH_TIMEOUT_MS = 15_000;
