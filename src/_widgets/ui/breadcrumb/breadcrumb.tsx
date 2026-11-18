import { BREADCRUMB_LABEL } from './constants';
import type { BreadcrumbProps } from './types';
import { cn } from '../../lib/cn';

export const Breadcrumb = ({ className, ...props }: BreadcrumbProps) => (
  <nav aria-label={BREADCRUMB_LABEL} data-slot="breadcrumb" className={cn(className)} {...props} />
);
