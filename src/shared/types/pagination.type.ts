import type { PAGE_ELLIPSIS } from '../constants/pagination.constant';

export type PageItem = number | typeof PAGE_ELLIPSIS;

export interface PageData<TItem> {
  rows: TItem[];
  total: number;
  totalPages: number;
}

export interface PaginatedQueryResult<TItem> extends PageData<TItem> {
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<unknown>;
}
