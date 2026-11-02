import { TableHead } from './table-head';
import type { TableActionsHeadProps } from './types';
import { tableActionsClassName } from './variant';
import { cn } from '../../lib/cn';

export const TableActionsHead = ({ className, ...props }: TableActionsHeadProps) => (
  <TableHead className={cn(tableActionsClassName, className)} {...props} />
);
