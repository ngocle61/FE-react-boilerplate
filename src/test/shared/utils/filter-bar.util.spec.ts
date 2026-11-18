import { describe, expect, it } from 'vitest';

import {
  countActiveFilters,
  hasActiveFilters,
  isFilterValueActive,
} from '@/shared/utils/filter-bar.util';

const DEFAULT_VALUES = { search: '', role: 'ALL', statuses: [] as string[] };

describe('filter-bar util', () => {
  it('treats whitespace-only text as the default', () => {
    expect(isFilterValueActive('   ', '')).toBe(false);
    expect(isFilterValueActive(' ann ', '')).toBe(true);
  });

  it('compares selections by content', () => {
    expect(isFilterValueActive([], [])).toBe(false);
    expect(isFilterValueActive(['a'], [])).toBe(true);
    expect(isFilterValueActive(['a', 'b'], ['a', 'b'])).toBe(false);
  });

  it('counts only the given fields', () => {
    const values = { search: 'ann', role: 'ADMIN', statuses: ['DONE'] };

    expect(countActiveFilters(values, DEFAULT_VALUES, ['role', 'statuses'])).toBe(2);
    expect(countActiveFilters(DEFAULT_VALUES, DEFAULT_VALUES, ['role', 'statuses'])).toBe(0);
  });

  it('detects any active value across every field', () => {
    expect(hasActiveFilters({ ...DEFAULT_VALUES, search: 'ann' }, DEFAULT_VALUES)).toBe(true);
    expect(hasActiveFilters(DEFAULT_VALUES, DEFAULT_VALUES)).toBe(false);
  });
});
