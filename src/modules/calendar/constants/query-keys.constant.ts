import { MUTATION_SCOPES } from '@/core/constants/query-keys.constant';

export const CALENDAR_QUERY_KEYS = {
  INTERVENTIONS: 'calendar-interventions',
  CLIENTS: 'calendar-clients',
  TECHNICIANS: 'calendar-technicians',
} as const;

export const INTERVENTION_MUTATION_KEYS = {
  UPDATE: [CALENDAR_QUERY_KEYS.INTERVENTIONS, MUTATION_SCOPES.UPDATE],
} as const;
