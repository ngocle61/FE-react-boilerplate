import { queryOptions } from '@tanstack/react-query';

import { QUERY_KEYS } from '../constants/query-keys.constant';
import { authService } from '../services/auth.service';

export const authQueries = {
  currentUser: () =>
    queryOptions({
      queryKey: [QUERY_KEYS.CURRENT_USER],
      queryFn: ({ signal }) => authService.getCurrentUser(signal),
    }),
};
