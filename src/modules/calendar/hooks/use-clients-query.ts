import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { clientQueries } from '../queries/client.queries';

export const useClientsQuery = (search?: string) =>
  useQuery({ ...clientQueries.list(search), placeholderData: keepPreviousData });
