import type { EmptyProps } from './types';
import { cn } from '../../lib/cn';

export const Empty = ({ className, ...props }: EmptyProps) => (
  <div
    data-slot="empty"
    className={cn(
      'flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl border-dashed border-border p-6 text-center text-balance',
      className,
    )}
    {...props}
  />
);
