import { ChevronRightIcon } from 'lucide-react';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { DropdownMenuSubTriggerProps } from './types';
import { dropdownMenuItemClassName } from './variant';
import { cn } from '../../lib/cn';

export const DropdownMenuSubTrigger = ({
  className,
  children,
  ...props
}: DropdownMenuSubTriggerProps) => (
  <DropdownMenuPrimitive.SubTrigger
    data-slot="dropdown-menu-sub-trigger"
    className={cn(
      dropdownMenuItemClassName,
      'data-open:bg-accent data-open:text-accent-foreground',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon aria-hidden className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
);
