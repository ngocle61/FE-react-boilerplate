import type { QUERY_STATES } from '../constants/query-state.constant';

export type QueryStateKind = (typeof QUERY_STATES)[keyof typeof QUERY_STATES];

export interface ResolveQueryStateInput {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  hasEmptyNode?: boolean;
}
