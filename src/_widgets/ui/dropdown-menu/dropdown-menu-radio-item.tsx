import { CheckIcon } from 'lucide-react';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { DropdownMenuRadioItemProps } from './types';
import { dropdownMenuItemClassName } from './variant';
import { cn } from '../../lib/cn';

export const DropdownMenuRadioItem = ({
  className,
  children,
  ...props
}: DropdownMenuRadioItemProps) => (
  <DropdownMenuPrimitive.RadioItem
    data-slot="dropdown-menu-radio-item"
    className={cn(dropdownMenuItemClassName, 'pr-8', className)}
    {...props}
  >
    <span
      data-slot="dropdown-menu-radio-item-indicator"
      className="pointer-events-none absolute right-2 flex items-center justify-center"
    >
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon aria-hidden />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
);
