import { queryOptions } from '@tanstack/react-query';

import { QUERY_SCOPES } from '@/core/constants/query-keys.constant';

import { CALENDAR_QUERY_KEYS } from '../constants/query-keys.constant';
import { clientService } from '../services/client.service';

export const clientQueries = {
  all: () => [CALENDAR_QUERY_KEYS.CLIENTS],

  list: (search?: string) =>
    queryOptions({
      queryKey: [CALENDAR_QUERY_KEYS.CLIENTS, QUERY_SCOPES.LIST, search ?? ''],
      queryFn: ({ signal }) => clientService.list(search, signal),
    }),
};
