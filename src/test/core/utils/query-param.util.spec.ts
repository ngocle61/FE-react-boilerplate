import { describe, expect, it } from 'vitest';

import { BOOLEAN_QUERY_VALUES } from '@/core/constants/http.constant';
import { toBooleanQueryParam } from '@/core/utils/query-param.util';

describe('toBooleanQueryParam', () => {
  it('serialises booleans the way the API query schema expects', () => {
    expect(toBooleanQueryParam(true)).toBe(BOOLEAN_QUERY_VALUES.TRUE);
    expect(toBooleanQueryParam(false)).toBe(BOOLEAN_QUERY_VALUES.FALSE);
  });

  it('omits the parameter when no value is set', () => {
    expect(toBooleanQueryParam(undefined)).toBeUndefined();
  });
});
