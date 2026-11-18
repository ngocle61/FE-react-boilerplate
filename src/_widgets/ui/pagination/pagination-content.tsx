import type { PaginationContentProps } from './types';
import { cn } from '../../lib/cn';

export const PaginationContent = ({ className, ...props }: PaginationContentProps) => (
  <ul
    data-slot="pagination-content"
    className={cn('flex items-center gap-1', className)}
    {...props}
  />
);
