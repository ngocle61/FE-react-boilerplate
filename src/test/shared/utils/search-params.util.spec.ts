import { describe, expect, it } from 'vitest';

import { userManagementSearchSchema } from '@/modules/user-management/schema/user-management-search.schema';
import {
  hasSearchStateChanges,
  readSearchParams,
  toSearchParams,
} from '@/shared/utils/search-params.util';

const DEFAULTS = userManagementSearchSchema.parse({});

describe('search params util', () => {
  it('reads repeated keys as arrays and single keys as strings', () => {
    expect(readSearchParams(new URLSearchParams('statuses=A&statuses=B&search=ann'))).toEqual({
      statuses: ['A', 'B'],
      search: 'ann',
    });
  });

  it('falls back to defaults for missing or invalid values', () => {
    expect(
      userManagementSearchSchema.parse(
        readSearchParams(new URLSearchParams('page=-4&role=OWNER&isActive=maybe')),
      ),
    ).toEqual(DEFAULTS);
  });

  it('writes only the values that differ from the defaults', () => {
    const params = toSearchParams({ ...DEFAULTS, page: 2, search: 'ann' }, DEFAULTS);

    expect(params.toString()).toBe('page=2&search=ann');
  });

  it('writes every item of an array value', () => {
    const params = toSearchParams({ statuses: ['A', 'B'] }, { statuses: [] });

    expect(params.getAll('statuses')).toEqual(['A', 'B']);
  });

  it('keeps params the schema does not own and replaces the ones it does', () => {
    const current = new URLSearchParams('utm=mail&page=3&search=old');

    const params = toSearchParams({ ...DEFAULTS, search: 'ann' }, DEFAULTS, current);

    expect(params.toString()).toBe('utm=mail&search=ann');
  });

  it('detects whether a patch changes the state', () => {
    expect(hasSearchStateChanges(DEFAULTS, { search: '' })).toBe(false);
    expect(hasSearchStateChanges(DEFAULTS, { search: 'ann' })).toBe(true);
  });
});
