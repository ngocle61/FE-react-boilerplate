import type { RouteObject } from 'react-router';

import { GuestRoute } from '@/core/guards/guest-route';
import { ProtectedRoute } from '@/core/guards/protected-route';
import { HomeRedirect } from '@/shared/components/home-redirect/home-redirect';
import { NotFoundPage } from '@/shared/components/not-found-page/not-found-page';
import { PageLoader } from '@/shared/components/page-loader/page-loader';
import { RouteErrorPage } from '@/shared/components/route-error-page/route-error-page';
import { AuthLayout } from '@/shared/layout/auth-layout/auth-layout';
import { MainLayout } from '@/shared/layout/main-layout/main-layout';

import { sessionLoader } from './loaders/session.loader';
import { authenticationRoutes } from './routes/authentication-routes';
import { calendarRoutes } from './routes/calendar-routes';
import { chatRoutes } from './routes/chat-routes';
import { dashboardRoutes } from './routes/dashboard-routes';
import { userManagementRoutes } from './routes/user-management-routes';

export const routes: RouteObject[] = [
  {
    errorElement: <RouteErrorPage />,
    hydrateFallbackElement: <PageLoader />,
    children: [
      {
        element: <GuestRoute />,
        children: [{ element: <AuthLayout />, children: authenticationRoutes }],
      },
      {
        element: <ProtectedRoute />,
        loader: sessionLoader,
        children: [
          {
            element: <MainLayout />,
            children: [
              { index: true, element: <HomeRedirect /> },
              ...dashboardRoutes,
              ...chatRoutes,
              ...calendarRoutes,
              ...userManagementRoutes,
              { path: '*', element: <NotFoundPage /> },
            ],
          },
        ],
      },
    ],
  },
];
