import { useQuery } from '@tanstack/react-query';

import { interventionConverter } from '../converters/intervention.converter';
import { interventionQueries } from '../queries/intervention.queries';
import type { InterventionQueryParams } from '../types/intervention.type';

export const useInterventionsQuery = (params: InterventionQueryParams) =>
  useQuery({ ...interventionQueries.list(params), select: interventionConverter.toRows });
