import type { RouteObject } from 'react-router';

import { ROUTE_ACCESS } from '@/core/constants/route-access.constant';
import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';
import type { RouteHandle } from '@/core/types/route-handle.type';

import { createGuardedRoute } from '../create-guarded-route';
import { lazyPage } from '../lazy-page';
import { userManagementLoader } from '../loaders/user-management.loader';

export const userManagementRoutes: RouteObject[] = [
  createGuardedRoute(ROUTE_ACCESS.USERS, [
    {
      path: ROUTE_PATHS.USERS,
      loader: userManagementLoader,
      lazy: lazyPage(
        () => import('@/modules/user-management/user-management'),
        'UserManagementPage',
      ),
      handle: { breadcrumb: 'navigation.items.users' } satisfies RouteHandle,
    },
  ]),
];
