import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import { DROPDOWN_MENU_ALIGNMENTS, DROPDOWN_MENU_SIDE_OFFSET } from './constants';
import type { DropdownMenuContentProps } from './types';
import { dropdownMenuSurfaceClassName } from './variant';
import { cn } from '../../lib/cn';

export const DropdownMenuContent = ({
  className,
  align = DROPDOWN_MENU_ALIGNMENTS.START,
  sideOffset = DROPDOWN_MENU_SIDE_OFFSET,
  ...props
}: DropdownMenuContentProps) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      data-slot="dropdown-menu-content"
      sideOffset={sideOffset}
      align={align}
      className={cn(
        dropdownMenuSurfaceClassName,
        'max-h-(--radix-dropdown-menu-content-available-height) w-(--radix-dropdown-menu-trigger-width) min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-y-auto',
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);
