import { Navigate, Outlet, useSearchParams } from 'react-router';

import { REDIRECT_SEARCH_PARAM } from '../constants/route-paths.constant';
import { useIsAuthenticated } from '../store/auth.store';
import { toSafeRedirectPath } from '../utils/redirect.util';

export const GuestRoute = () => {
  const isAuthenticated = useIsAuthenticated();
  const [searchParams] = useSearchParams();

  if (isAuthenticated) {
    return <Navigate to={toSafeRedirectPath(searchParams.get(REDIRECT_SEARCH_PARAM))} replace />;
  }

  return <Outlet />;
};
