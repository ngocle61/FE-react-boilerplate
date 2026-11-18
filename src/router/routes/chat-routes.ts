import type { RouteObject } from 'react-router';

import { ROUTE_ACCESS } from '@/core/constants/route-access.constant';
import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';
import type { RouteHandle } from '@/core/types/route-handle.type';

import { createGuardedRoute } from '../create-guarded-route';
import { lazyPage } from '../lazy-page';
import { chatLoader } from '../loaders/chat.loader';

export const chatRoutes: RouteObject[] = [
  createGuardedRoute(ROUTE_ACCESS.CHAT, [
    {
      path: ROUTE_PATHS.CHAT,
      loader: chatLoader,
      lazy: lazyPage(() => import('@/modules/chat/chat'), 'ChatPage'),
      handle: { breadcrumb: 'navigation.items.chat' } satisfies RouteHandle,
    },
  ]),
];
