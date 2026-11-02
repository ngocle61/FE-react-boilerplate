import { MoreHorizontalIcon } from 'lucide-react';

import { PAGINATION_MORE_LABEL } from './constants';
import type { PaginationEllipsisProps } from './types';
import { cn } from '../../lib/cn';

export const PaginationEllipsis = ({
  className,
  label = PAGINATION_MORE_LABEL,
  ...props
}: PaginationEllipsisProps) => (
  <span
    data-slot="pagination-ellipsis"
    className={cn(
      "flex size-9 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
      className,
    )}
    {...props}
  >
    <MoreHorizontalIcon aria-hidden />
    <span className="sr-only">{label}</span>
  </span>
);
