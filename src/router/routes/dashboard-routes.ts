import type { RouteObject } from 'react-router';

import { ROUTE_ACCESS } from '@/core/constants/route-access.constant';
import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';
import type { RouteHandle } from '@/core/types/route-handle.type';

import { createGuardedRoute } from '../create-guarded-route';
import { lazyPage } from '../lazy-page';

export const dashboardRoutes: RouteObject[] = [
  createGuardedRoute(ROUTE_ACCESS.DASHBOARD, [
    {
      path: ROUTE_PATHS.DASHBOARD,
      lazy: lazyPage(() => import('@/modules/dashboard/dashboard'), 'DashboardPage'),
      handle: { breadcrumb: 'navigation.items.dashboard' } satisfies RouteHandle,
    },
  ]),
];
