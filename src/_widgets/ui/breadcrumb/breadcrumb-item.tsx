import type { BreadcrumbItemProps } from './types';
import { cn } from '../../lib/cn';

export const BreadcrumbItem = ({ className, ...props }: BreadcrumbItemProps) => (
  <li
    data-slot="breadcrumb-item"
    className={cn('inline-flex items-center gap-1.5', className)}
    {...props}
  />
);
