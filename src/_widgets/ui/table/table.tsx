import type { TableProps } from './types';
import { cn } from '../../lib/cn';

export const Table = ({ className, containerClassName, ...props }: TableProps) => (
  <div
    data-slot="table-container"
    className={cn(
      'relative scrollbar-thin w-full overflow-auto rounded-lg border border-border bg-card',
      containerClassName,
    )}
  >
    <table
      data-slot="table"
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  </div>
);
