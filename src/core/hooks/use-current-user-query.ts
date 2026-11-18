import { useQuery } from '@tanstack/react-query';

import { authConverter } from '../converters/auth.converter';
import { authQueries } from '../queries/auth.queries';
import { useIsAuthenticated } from '../store/auth.store';

export const useCurrentUserQuery = () => {
  const isAuthenticated = useIsAuthenticated();

  return useQuery({
    ...authQueries.currentUser(),
    enabled: isAuthenticated,
    select: authConverter.toAuthUser,
  });
};
