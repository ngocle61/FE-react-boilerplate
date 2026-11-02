import type { BreadcrumbPageProps } from './types';
import { cn } from '../../lib/cn';

export const BreadcrumbPage = ({ className, ...props }: BreadcrumbPageProps) => (
  <span
    data-slot="breadcrumb-page"
    aria-current="page"
    className={cn('font-semibold text-foreground', className)}
    {...props}
  />
);
