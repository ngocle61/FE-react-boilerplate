import type { TableCellProps } from './types';
import { cn } from '../../lib/cn';

export const TableCell = ({ className, ...props }: TableCellProps) => (
  <td
    data-slot="table-cell"
    className={cn(
      'px-4 py-3 align-middle whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0',
      className,
    )}
    {...props}
  />
);
