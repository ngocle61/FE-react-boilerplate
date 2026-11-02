import { queryOptions } from '@tanstack/react-query';

import { QUERY_SCOPES } from '@/core/constants/query-keys.constant';

import { CALENDAR_QUERY_KEYS } from '../constants/query-keys.constant';
import { technicianService } from '../services/technician.service';

export const technicianQueries = {
  list: () =>
    queryOptions({
      queryKey: [CALENDAR_QUERY_KEYS.TECHNICIANS, QUERY_SCOPES.LIST],
      queryFn: ({ signal }) => technicianService.list(signal),
    }),
};
