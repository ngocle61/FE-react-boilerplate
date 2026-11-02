import { useQuery } from '@tanstack/react-query';

import { interventionConverter } from '../converters/intervention.converter';
import { interventionQueries } from '../queries/intervention.queries';

export const useUnscheduledInterventionsQuery = () =>
  useQuery({
    ...interventionQueries.list({ unscheduled: true }),
    select: interventionConverter.toRows,
  });
