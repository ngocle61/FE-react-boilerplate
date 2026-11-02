import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { DropdownMenuSeparatorProps } from './types';
import { cn } from '../../lib/cn';

export const DropdownMenuSeparator = ({ className, ...props }: DropdownMenuSeparatorProps) => (
  <DropdownMenuPrimitive.Separator
    data-slot="dropdown-menu-separator"
    className={cn('-mx-1 my-1 h-px bg-border', className)}
    {...props}
  />
);
