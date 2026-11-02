import { MoreHorizontalIcon } from 'lucide-react';

import { BREADCRUMB_MORE_LABEL } from './constants';
import type { BreadcrumbEllipsisProps } from './types';
import { cn } from '../../lib/cn';

export const BreadcrumbEllipsis = ({
  className,
  label = BREADCRUMB_MORE_LABEL,
  ...props
}: BreadcrumbEllipsisProps) => (
  <span
    data-slot="breadcrumb-ellipsis"
    className={cn('flex size-5 items-center justify-center [&>svg]:size-4', className)}
    {...props}
  >
    <MoreHorizontalIcon aria-hidden />
    <span className="sr-only">{label}</span>
  </span>
);
