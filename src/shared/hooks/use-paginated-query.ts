import {
  keepPreviousData,
  useQuery,
  type DefaultError,
  type QueryKey,
  type UseQueryOptions,
} from '@tanstack/react-query';

import type { PaginatedResponse } from '@/core/types/pagination.dto';

import type { PaginatedQueryResult } from '../types/pagination.type';
import { toPageData } from '../utils/pagination.util';

export const usePaginatedQuery = <TQueryFnData, TItem, TQueryKey extends QueryKey>(
  options: UseQueryOptions<TQueryFnData, DefaultError, PaginatedResponse<TItem>, TQueryKey>,
): PaginatedQueryResult<TItem> => {
  const query = useQuery({ ...options, placeholderData: keepPreviousData });

  return {
    ...toPageData(query.data),
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
};
