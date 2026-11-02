import type { PopoverTitleProps } from './types';
import { cn } from '../../lib/cn';

export const PopoverTitle = ({ className, children, ...props }: PopoverTitleProps) => (
  <h2 data-slot="popover-title" className={cn('font-semibold', className)} {...props}>
    {children}
  </h2>
);
