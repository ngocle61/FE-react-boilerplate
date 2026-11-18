import type { TableCaptionProps } from './types';
import { cn } from '../../lib/cn';

export const TableCaption = ({ className, ...props }: TableCaptionProps) => (
  <caption
    data-slot="table-caption"
    className={cn('my-4 text-sm text-muted-foreground', className)}
    {...props}
  />
);
