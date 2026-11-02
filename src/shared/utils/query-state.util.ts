import { QUERY_STATES } from '../constants/query-state.constant';
import type { QueryStateKind, ResolveQueryStateInput } from '../types/query-state.type';

export const resolveQueryState = ({
  isLoading = false,
  isError = false,
  isEmpty = false,
  hasEmptyNode = false,
}: ResolveQueryStateInput): QueryStateKind => {
  if (isLoading) return QUERY_STATES.LOADING;
  if (isError) return QUERY_STATES.ERROR;
  if (isEmpty && hasEmptyNode) return QUERY_STATES.EMPTY;
  return QUERY_STATES.CONTENT;
};
