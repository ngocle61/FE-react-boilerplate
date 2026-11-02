import { describe, expect, it } from 'vitest';

import { toVisibleClients } from '@/modules/calendar/utils/client-option.util';

const PINNED = [{ id: 'client-9', name: 'Zeta' }];
const RESULTS = [
  { id: 'client-1', name: 'Acme' },
  { id: 'client-9', name: 'Zeta' },
];

describe('toVisibleClients', () => {
  it('lists the pinned clients first when nothing is searched, without duplicates', () => {
    expect(toVisibleClients(PINNED, RESULTS, '')).toEqual([
      { id: 'client-9', name: 'Zeta' },
      { id: 'client-1', name: 'Acme' },
    ]);
  });

  it('shows the search results only while searching', () => {
    const searchResults = [{ id: 'client-1', name: 'Acme' }];

    expect(toVisibleClients(PINNED, searchResults, 'ac')).toEqual(searchResults);
  });
});
