import type { PaginatedResponse } from '@/core/types/pagination.dto';

import { PAGE_ELLIPSIS, PAGINATION_SIBLING_COUNT } from '../constants/pagination.constant';
import type { PageData, PageItem } from '../types/pagination.type';

export const toPageData = <TItem>(data: Maybe<PaginatedResponse<TItem>>): PageData<TItem> => ({
  rows: data?.items ?? [],
  total: data?.total ?? 0,
  totalPages: data && data.pageSize > 0 ? Math.ceil(data.total / data.pageSize) : 0,
});

export const buildPageItems = (
  page: number,
  totalPages: number,
  siblingCount = PAGINATION_SIBLING_COUNT,
): PageItem[] => {
  const items: PageItem[] = [];
  const left = Math.max(1, page - siblingCount);
  const right = Math.min(totalPages, page + siblingCount);

  if (left > 1) {
    items.push(1);
    if (left > 2) items.push(PAGE_ELLIPSIS);
  }

  for (let current = left; current <= right; current += 1) items.push(current);

  if (right < totalPages) {
    if (right < totalPages - 1) items.push(PAGE_ELLIPSIS);
    items.push(totalPages);
  }

  return items;
};
