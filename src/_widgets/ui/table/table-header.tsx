import type { TableHeaderProps } from './types';
import { cn } from '../../lib/cn';

export const TableHeader = ({ className, ...props }: TableHeaderProps) => (
  <thead
    data-slot="table-header"
    className={cn(
      'sticky top-0 z-10 bg-card [&_th]:bg-[color-mix(in_srgb,var(--muted)_50%,var(--card))] [&_th]:shadow-[inset_0_-1px_0_var(--border)] [&_tr]:border-b-0',
      className,
    )}
    {...props}
  />
);
