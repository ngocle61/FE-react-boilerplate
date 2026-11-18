import { ROUTE_ACCESS } from '@/core/constants/route-access.constant';
import { queryClient } from '@/core/libs/query-client';
import { interventionQueries } from '@/modules/calendar/queries/intervention.queries';
import { technicianQueries } from '@/modules/calendar/queries/technician.queries';
import { calendarSearchSchema } from '@/modules/calendar/schema/calendar-search.schema';
import { getViewRange, parseDateParam } from '@/modules/calendar/utils/calendar-range.util';
import { readSearchParams } from '@/shared/utils/search-params.util';

import { createPrefetchLoader } from './create-prefetch-loader';

export const calendarLoader = createPrefetchLoader(ROUTE_ACCESS.CALENDAR, (searchParams) => {
  const { view, date } = calendarSearchSchema.parse(readSearchParams(searchParams));
  const { from, to } = getViewRange(parseDateParam(date), view);

  void queryClient.prefetchQuery(
    interventionQueries.list({ from: from.toISOString(), to: to.toISOString() }),
  );
  void queryClient.prefetchQuery(interventionQueries.list({ unscheduled: true }));
  void queryClient.prefetchQuery(technicianQueries.list());
});
