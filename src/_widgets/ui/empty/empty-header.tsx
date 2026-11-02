import type { EmptyHeaderProps } from './types';
import { cn } from '../../lib/cn';

export const EmptyHeader = ({ className, ...props }: EmptyHeaderProps) => (
  <div
    data-slot="empty-header"
    className={cn('flex max-w-sm flex-col items-center gap-2', className)}
    {...props}
  />
);
