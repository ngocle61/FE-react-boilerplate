import { CheckIcon } from 'lucide-react';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { DropdownMenuCheckboxItemProps } from './types';
import { dropdownMenuItemClassName } from './variant';
import { cn } from '../../lib/cn';

export const DropdownMenuCheckboxItem = ({
  className,
  children,
  checked,
  ...props
}: DropdownMenuCheckboxItemProps) => (
  <DropdownMenuPrimitive.CheckboxItem
    data-slot="dropdown-menu-checkbox-item"
    checked={checked}
    className={cn(dropdownMenuItemClassName, 'pr-8', className)}
    {...props}
  >
    <span
      data-slot="dropdown-menu-checkbox-item-indicator"
      className="pointer-events-none absolute right-2 flex items-center justify-center"
    >
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon aria-hidden />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
);
