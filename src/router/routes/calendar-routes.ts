import type { RouteObject } from 'react-router';

import { ROUTE_ACCESS } from '@/core/constants/route-access.constant';
import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';
import type { RouteHandle } from '@/core/types/route-handle.type';

import { createGuardedRoute } from '../create-guarded-route';
import { lazyPage } from '../lazy-page';
import { calendarLoader } from '../loaders/calendar.loader';

export const calendarRoutes: RouteObject[] = [
  createGuardedRoute(ROUTE_ACCESS.CALENDAR, [
    {
      path: ROUTE_PATHS.CALENDAR,
      handle: { breadcrumb: 'navigation.items.calendar' } satisfies RouteHandle,
      children: [
        {
          index: true,
          loader: calendarLoader,
          lazy: lazyPage(() => import('@/modules/calendar/calendar'), 'CalendarPage'),
        },
        {
          path: ROUTE_PATHS.INTERVENTION_CALL,
          lazy: lazyPage(
            () => import('@/modules/calendar/intervention-call/intervention-call'),
            'InterventionCallPage',
          ),
          handle: { breadcrumb: 'navigation.items.interventionCall' } satisfies RouteHandle,
        },
      ],
    },
  ]),
];
