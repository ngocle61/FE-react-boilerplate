import { useQuery } from '@tanstack/react-query';

import { interventionConverter } from '../converters/intervention.converter';
import { interventionQueries } from '../queries/intervention.queries';

export const useInterventionQuery = (interventionId: string) =>
  useQuery({ ...interventionQueries.detail(interventionId), select: interventionConverter.toRow });
