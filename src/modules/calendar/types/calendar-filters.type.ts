import type { z } from 'zod';

import type { InterventionStatus } from '@/core/types/intervention.dto';

import type { calendarSearchSchema } from '../schema/calendar-search.schema';

export interface CalendarFilterValues {
  search: string;
  technicianIds: string[];
  statuses: InterventionStatus[];
}

export type CalendarSearchState = z.infer<typeof calendarSearchSchema>;
