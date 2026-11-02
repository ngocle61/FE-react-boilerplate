import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import { DROPDOWN_MENU_ITEM_VARIANTS } from './constants';
import type { DropdownMenuItemProps } from './types';
import { dropdownMenuItemClassName } from './variant';
import { cn } from '../../lib/cn';

export const DropdownMenuItem = ({
  className,
  variant = DROPDOWN_MENU_ITEM_VARIANTS.DEFAULT,
  ...props
}: DropdownMenuItemProps) => (
  <DropdownMenuPrimitive.Item
    data-slot="dropdown-menu-item"
    data-variant={variant}
    className={cn(
      dropdownMenuItemClassName,
      'group/dropdown-menu-item data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-error data-[variant=destructive]:focus:text-error-foreground data-[variant=destructive]:*:[svg]:text-current',
      className,
    )}
    {...props}
  />
);
