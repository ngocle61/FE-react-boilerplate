import { z } from 'zod';

import { INTERVENTION_STATUSES } from '@/core/constants/intervention.constant';
import { searchParamArray } from '@/shared/utils/search-params.util';

import { CALENDAR_VIEW_MODES } from '../constants/calendar-view.constant';

export const calendarSearchSchema = z.object({
  view: z.enum(CALENDAR_VIEW_MODES).catch(CALENDAR_VIEW_MODES.DAY),
  date: z.iso.date().optional().catch(undefined),
  search: z.string().catch(''),
  technicianIds: searchParamArray(z.string()),
  statuses: searchParamArray(z.enum(INTERVENTION_STATUSES)),
});
