import { useLocation, useSearchParams, type NavigateOptions } from 'react-router';
import type { z } from 'zod';

import type {
  PendingSearchNavigation,
  SearchParamRecord,
  SearchParamsState,
} from '../types/search-params.type';
import {
  hasSearchStateChanges,
  readSearchParams,
  toSearchParams,
} from '../utils/search-params.util';

let pendingNavigation: Nullable<PendingSearchNavigation> = null;

export const useSearchParamsState = <TState extends SearchParamRecord>(
  schema: z.ZodType<TState>,
): SearchParamsState<TState> => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const defaults = schema.parse({});
  const state = schema.parse(readSearchParams(searchParams));

  const readLatestSearchParams = (): URLSearchParams =>
    pendingNavigation?.fromLocation === location ? pendingNavigation.searchParams : searchParams;

  const setState = (patch: Partial<TState>, options?: NavigateOptions) => {
    const latestSearchParams = readLatestSearchParams();
    const latestState = schema.parse(readSearchParams(latestSearchParams));
    if (!hasSearchStateChanges(latestState, patch)) return;

    const nextSearchParams = toSearchParams(
      { ...latestState, ...patch },
      defaults,
      latestSearchParams,
    );
    pendingNavigation = { fromLocation: location, searchParams: nextSearchParams };
    setSearchParams(nextSearchParams, options);
  };

  return { state, setState };
};
