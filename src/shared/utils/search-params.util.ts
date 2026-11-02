import { z } from 'zod';

import type {
  RawSearchParams,
  SearchParamRecord,
  SearchParamValue,
} from '../types/search-params.type';

const serializeSearchParam = (value: SearchParamValue): string => JSON.stringify([value].flat());

const isEmptySearchParam = (value: SearchParamValue): boolean =>
  value === undefined || value === null || value === '' || [value].flat().length === 0;

export const readSearchParams = (searchParams: URLSearchParams): RawSearchParams =>
  Object.fromEntries(
    [...new Set(searchParams.keys())].map((key) => {
      const values = searchParams.getAll(key);
      return [key, values.length > 1 ? values : values[0]];
    }),
  );

export const toSearchParams = <TState extends SearchParamRecord>(
  state: TState,
  defaults: TState,
  current?: URLSearchParams,
): URLSearchParams => {
  const params = new URLSearchParams(current);

  Object.keys(state).forEach((key) => params.delete(key));

  Object.entries(state).forEach(([key, value]) => {
    if (isEmptySearchParam(value)) return;
    if (serializeSearchParam(value) === serializeSearchParam(defaults[key])) return;
    [value].flat().forEach((item) => params.append(key, String(item)));
  });

  return params;
};

export const hasSearchStateChanges = <TState extends SearchParamRecord>(
  state: TState,
  patch: Partial<TState>,
): boolean =>
  Object.entries<SearchParamValue>(patch).some(
    ([key, value]) => serializeSearchParam(value) !== serializeSearchParam(state[key]),
  );

export const searchParamArray = <TItem extends z.ZodType>(item: TItem) =>
  z.preprocess((value) => (value === undefined ? [] : [value].flat()), z.array(item)).catch([]);
