import type { Location, NavigateOptions } from 'react-router';

export type SearchParamScalar = string | number | boolean;

export type SearchParamValue = Nillable<SearchParamScalar | readonly SearchParamScalar[]>;

export type SearchParamRecord = Record<string, SearchParamValue>;

export type RawSearchParams = Record<string, string | string[]>;

export interface PendingSearchNavigation {
  fromLocation: Location;
  searchParams: URLSearchParams;
}

export interface SearchParamsState<TState extends SearchParamRecord> {
  state: TState;
  setState: (patch: Partial<TState>, options?: NavigateOptions) => void;
}
