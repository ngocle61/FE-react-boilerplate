import type { PopoverHeaderProps } from './types';
import { cn } from '../../lib/cn';

export const PopoverHeader = ({ className, ...props }: PopoverHeaderProps) => (
  <div
    data-slot="popover-header"
    className={cn('flex flex-col gap-0.5 text-sm', className)}
    {...props}
  />
);
