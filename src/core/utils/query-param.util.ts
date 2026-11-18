import { BOOLEAN_QUERY_VALUES } from '../constants/http.constant';
import type { BooleanQueryValue } from '../types/query-param.type';

export const toBooleanQueryParam = (value: Maybe<boolean>): Maybe<BooleanQueryValue> => {
  if (value === undefined) return undefined;
  return value ? BOOLEAN_QUERY_VALUES.TRUE : BOOLEAN_QUERY_VALUES.FALSE;
};
