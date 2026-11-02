import { describe, expect, it } from 'vitest';

import { PAGE_ELLIPSIS } from '@/shared/constants/pagination.constant';
import { buildPageItems, toPageData } from '@/shared/utils/pagination.util';

describe('toPageData', () => {
  it('derives rows, total and page count from the envelope', () => {
    expect(toPageData({ items: ['a', 'b'], total: 45, page: 1, pageSize: 20 })).toEqual({
      rows: ['a', 'b'],
      total: 45,
      totalPages: 3,
    });
  });

  it('falls back to an empty page while the query has not resolved', () => {
    expect(toPageData(undefined)).toEqual({ rows: [], total: 0, totalPages: 0 });
  });
});

describe('buildPageItems', () => {
  it('lists every page when there are only a few', () => {
    expect(buildPageItems(1, 3)).toEqual([1, 2, 3]);
  });

  it('collapses both sides around a page in the middle', () => {
    expect(buildPageItems(5, 10)).toEqual([1, PAGE_ELLIPSIS, 4, 5, 6, PAGE_ELLIPSIS, 10]);
  });

  it('shows no ellipsis between the first page and its neighbour', () => {
    expect(buildPageItems(2, 10)).toEqual([1, 2, 3, PAGE_ELLIPSIS, 10]);
  });
});
