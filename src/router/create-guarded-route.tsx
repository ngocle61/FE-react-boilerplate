import type { RouteObject } from 'react-router';

import { PermissionRoute } from '@/core/guards/permission-route';
import type { AccessRequirement } from '@/core/types/access.type';
import { ForbiddenPage } from '@/shared/components/forbidden-page/forbidden-page';
import { RouteErrorPage } from '@/shared/components/route-error-page/route-error-page';

export const createGuardedRoute = (
  { permissions, mode }: AccessRequirement,
  children: RouteObject[],
): RouteObject => ({
  element: <PermissionRoute permissions={permissions} mode={mode} fallback={<ForbiddenPage />} />,
  errorElement: <RouteErrorPage />,
  children,
});
