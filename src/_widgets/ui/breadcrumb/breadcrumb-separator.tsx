import { ChevronRightIcon } from 'lucide-react';

import type { BreadcrumbSeparatorProps } from './types';
import { cn } from '../../lib/cn';

export const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) => (
  <li
    data-slot="breadcrumb-separator"
    role="presentation"
    aria-hidden
    className={cn('[&>svg]:size-3.5', className)}
    {...props}
  >
    {children ?? <ChevronRightIcon />}
  </li>
);
