import type { PaginationItemProps } from './types';

export const PaginationItem = (props: PaginationItemProps) => (
  <li data-slot="pagination-item" {...props} />
);
