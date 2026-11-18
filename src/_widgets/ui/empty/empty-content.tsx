import type { EmptyContentProps } from './types';
import { cn } from '../../lib/cn';

export const EmptyContent = ({ className, ...props }: EmptyContentProps) => (
  <div
    data-slot="empty-content"
    className={cn(
      'flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-sm text-balance',
      className,
    )}
    {...props}
  />
);
