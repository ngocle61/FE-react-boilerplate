import type { Location } from 'react-router';

import { REDIRECT_SEARCH_PARAM, ROUTE_PATHS } from '../constants/route-paths.constant';
import { SESSION_END_REASONS } from '../constants/session.constant';
import type { SessionEndReason } from '../types/auth.type';

export const toSafeRedirectPath = (
  value: Nillable<string>,
  fallback: string = ROUTE_PATHS.ROOT,
): string => {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.startsWith('/\\')) {
    return fallback;
  }
  return value;
};

export const toSignInPath = (
  { pathname, search, hash }: Pick<Location, 'pathname' | 'search' | 'hash'>,
  endReason: Nullable<SessionEndReason>,
): string => {
  const target = `${pathname}${search}${hash}`;
  if (endReason === SESSION_END_REASONS.SIGN_OUT || target === ROUTE_PATHS.ROOT) {
    return ROUTE_PATHS.SIGN_IN;
  }
  const params = new URLSearchParams({ [REDIRECT_SEARCH_PARAM]: target });
  return `${ROUTE_PATHS.SIGN_IN}?${params.toString()}`;
};
