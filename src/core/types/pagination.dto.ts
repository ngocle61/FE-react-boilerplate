export interface PaginatedResponse<TItem> {
  items: TItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface PageRequest {
  page: number;
  pageSize?: number;
}
