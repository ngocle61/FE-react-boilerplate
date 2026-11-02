import type { PopoverDescriptionProps } from './types';
import { cn } from '../../lib/cn';

export const PopoverDescription = ({ className, ...props }: PopoverDescriptionProps) => (
  <p
    data-slot="popover-description"
    className={cn('text-muted-foreground', className)}
    {...props}
  />
);
