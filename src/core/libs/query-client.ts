import { MutationCache, QueryClient } from '@tanstack/react-query';

import { QUERY_STALE_TIME_MS } from '../constants/query-client.constant';
import { shouldRetryQuery, toastMutationError } from '../utils/query-client.util';

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({ onError: toastMutationError }),
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME_MS,
      retry: shouldRetryQuery,
      refetchOnWindowFocus: false,
    },
  },
});
