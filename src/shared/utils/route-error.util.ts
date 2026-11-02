import { isRouteErrorResponse } from 'react-router';

import { HTTP_STATUS } from '@/core/constants/http.constant';

import { CHUNK_LOAD_ERROR_PATTERN, ROUTE_ERROR_KINDS } from '../constants/route-error.constant';
import type { RouteErrorKind } from '../types/route-error.type';

export const toRouteErrorKind = (error: unknown): RouteErrorKind => {
  if (isRouteErrorResponse(error) && error.status === HTTP_STATUS.NOT_FOUND) {
    return ROUTE_ERROR_KINDS.NOT_FOUND;
  }
  if (error instanceof Error && CHUNK_LOAD_ERROR_PATTERN.test(error.message)) {
    return ROUTE_ERROR_KINDS.CHUNK_LOAD;
  }
  return ROUTE_ERROR_KINDS.UNKNOWN;
};
