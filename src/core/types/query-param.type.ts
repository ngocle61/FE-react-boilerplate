import type { BOOLEAN_QUERY_VALUES } from '../constants/http.constant';

export type BooleanQueryValue = (typeof BOOLEAN_QUERY_VALUES)[keyof typeof BOOLEAN_QUERY_VALUES];
