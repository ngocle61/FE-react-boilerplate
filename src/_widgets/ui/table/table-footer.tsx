import type { TableFooterProps } from './types';
import { cn } from '../../lib/cn';

export const TableFooter = ({ className, ...props }: TableFooterProps) => (
  <tfoot
    data-slot="table-footer"
    className={cn(
      'border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0',
      className,
    )}
    {...props}
  />
);
