import { TABLE_HEAD_SCOPES } from './constants';
import type { TableHeadProps } from './types';
import { cn } from '../../lib/cn';

export const TableHead = ({
  className,
  scope = TABLE_HEAD_SCOPES.COL,
  ...props
}: TableHeadProps) => (
  <th
    data-slot="table-head"
    scope={scope}
    className={cn(
      'h-11 px-4 text-left align-middle text-xs font-semibold whitespace-nowrap text-muted-foreground [&:has([role=checkbox])]:pr-0',
      className,
    )}
    {...props}
  />
);
