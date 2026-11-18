import { describe, expect, it } from 'vitest';

import { HTTP_STATUS } from '@/core/constants/http.constant';
import { ROUTE_ERROR_KINDS } from '@/shared/constants/route-error.constant';
import { toRouteErrorKind } from '@/shared/utils/route-error.util';

const routeErrorResponse = (status: number) => ({
  status,
  statusText: '',
  internal: true,
  data: null,
});

describe('toRouteErrorKind', () => {
  it('recognises a route that does not exist', () => {
    expect(toRouteErrorKind(routeErrorResponse(HTTP_STATUS.NOT_FOUND))).toBe(
      ROUTE_ERROR_KINDS.NOT_FOUND,
    );
  });

  it('recognises a page chunk that failed to load after a deploy', () => {
    expect(
      toRouteErrorKind(new TypeError('Failed to fetch dynamically imported module: /a.js')),
    ).toBe(ROUTE_ERROR_KINDS.CHUNK_LOAD);
  });

  it('treats any other failure as unknown', () => {
    expect(toRouteErrorKind(routeErrorResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR))).toBe(
      ROUTE_ERROR_KINDS.UNKNOWN,
    );
    expect(toRouteErrorKind(new Error('boom'))).toBe(ROUTE_ERROR_KINDS.UNKNOWN);
    expect(toRouteErrorKind('boom')).toBe(ROUTE_ERROR_KINDS.UNKNOWN);
  });
});
