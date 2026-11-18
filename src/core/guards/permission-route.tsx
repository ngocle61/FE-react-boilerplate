import { Outlet } from 'react-router';

import { useAccess } from '../hooks/use-access';
import type { PermissionRouteProps } from '../types/guards.type';

export const PermissionRoute = ({ permissions, mode, fallback }: PermissionRouteProps) => {
  const { can } = useAccess();

  if (!can({ permissions, mode })) {
    return fallback;
  }

  return <Outlet />;
};
