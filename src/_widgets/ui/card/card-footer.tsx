import type { CardFooterProps } from './types';
import { cn } from '../../lib/cn';

export const CardFooter = ({ className, ...props }: CardFooterProps) => (
  <div
    data-slot="card-footer"
    className={cn(
      'flex items-center gap-2 border-t border-border bg-muted/50 p-(--card-spacing)',
      className,
    )}
    {...props}
  />
);
