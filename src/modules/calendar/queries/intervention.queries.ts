import { queryOptions } from '@tanstack/react-query';

import { QUERY_SCOPES } from '@/core/constants/query-keys.constant';

import { CALENDAR_QUERY_KEYS } from '../constants/query-keys.constant';
import { interventionService } from '../services/intervention.service';
import type { InterventionQueryParams } from '../types/intervention.type';

export const interventionQueries = {
  all: () => [CALENDAR_QUERY_KEYS.INTERVENTIONS],

  list: (params: InterventionQueryParams) =>
    queryOptions({
      queryKey: [CALENDAR_QUERY_KEYS.INTERVENTIONS, QUERY_SCOPES.LIST, params],
      queryFn: ({ signal }) => interventionService.list(params, signal),
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: [CALENDAR_QUERY_KEYS.INTERVENTIONS, QUERY_SCOPES.DETAIL, id],
      queryFn: ({ signal }) => interventionService.get(id, signal),
      enabled: id.length > 0,
    }),
};
