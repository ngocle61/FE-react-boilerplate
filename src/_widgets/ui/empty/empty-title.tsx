import type { EmptyTitleProps } from './types';
import { cn } from '../../lib/cn';

export const EmptyTitle = ({ className, children, ...props }: EmptyTitleProps) => (
  <h2
    data-slot="empty-title"
    className={cn('font-heading text-lg font-semibold tracking-tight text-foreground', className)}
    {...props}
  >
    {children}
  </h2>
);
