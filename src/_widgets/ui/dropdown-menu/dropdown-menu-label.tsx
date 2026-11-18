import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { DropdownMenuLabelProps } from './types';
import { cn } from '../../lib/cn';

export const DropdownMenuLabel = ({ className, ...props }: DropdownMenuLabelProps) => (
  <DropdownMenuPrimitive.Label
    data-slot="dropdown-menu-label"
    className={cn('px-2 py-1.5 text-xs font-medium text-muted-foreground', className)}
    {...props}
  />
);
