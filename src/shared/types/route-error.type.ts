import type { ROUTE_ERROR_KINDS } from '../constants/route-error.constant';

export type RouteErrorKind = (typeof ROUTE_ERROR_KINDS)[keyof typeof ROUTE_ERROR_KINDS];
