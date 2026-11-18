import { PAGINATION_LABEL } from './constants';
import type { PaginationProps } from './types';
import { cn } from '../../lib/cn';

export const Pagination = ({ className, ...props }: PaginationProps) => (
  <nav
    aria-label={PAGINATION_LABEL}
    data-slot="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
