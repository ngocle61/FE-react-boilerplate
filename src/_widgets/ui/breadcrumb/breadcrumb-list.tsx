import type { BreadcrumbListProps } from './types';
import { cn } from '../../lib/cn';

export const BreadcrumbList = ({ className, ...props }: BreadcrumbListProps) => (
  <ol
    data-slot="breadcrumb-list"
    className={cn(
      'flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground',
      className,
    )}
    {...props}
  />
);
