import type { TableBodyProps } from './types';
import { cn } from '../../lib/cn';

export const TableBody = ({ className, ...props }: TableBodyProps) => (
  <tbody
    data-slot="table-body"
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
);
