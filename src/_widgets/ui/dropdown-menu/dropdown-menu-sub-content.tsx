import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { DropdownMenuSubContentProps } from './types';
import { dropdownMenuSurfaceClassName } from './variant';
import { cn } from '../../lib/cn';

export const DropdownMenuSubContent = ({ className, ...props }: DropdownMenuSubContentProps) => (
  <DropdownMenuPrimitive.SubContent
    data-slot="dropdown-menu-sub-content"
    className={cn(
      dropdownMenuSurfaceClassName,
      'min-w-32 origin-(--radix-dropdown-menu-content-transform-origin)',
      className,
    )}
    {...props}
  />
);
