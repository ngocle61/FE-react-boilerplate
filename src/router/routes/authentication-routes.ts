import type { RouteObject } from 'react-router';

import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';

import { lazyPage } from '../lazy-page';

export const authenticationRoutes: RouteObject[] = [
  {
    path: ROUTE_PATHS.SIGN_IN,
    lazy: lazyPage(() => import('@/modules/authentication/sign-in/sign-in'), 'SignInPage'),
  },
];
