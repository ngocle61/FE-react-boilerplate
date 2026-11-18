import { Navigate, Outlet, useLocation } from 'react-router';

import { useIsAuthenticated, useSessionEndReason } from '../store/auth.store';
import { toSignInPath } from '../utils/redirect.util';

export const ProtectedRoute = () => {
  const isAuthenticated = useIsAuthenticated();
  const endReason = useSessionEndReason();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={toSignInPath(location, endReason)} replace />;
  }

  return <Outlet />;
};
