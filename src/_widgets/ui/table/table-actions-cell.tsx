import { TableCell } from './table-cell';
import type { TableActionsCellProps } from './types';
import { tableActionsClassName } from './variant';
import { cn } from '../../lib/cn';

export const TableActionsCell = ({ className, ...props }: TableActionsCellProps) => (
  <TableCell
    className={cn(tableActionsClassName, 'bg-[color:var(--table-row-bg)]', className)}
    {...props}
  />
);
