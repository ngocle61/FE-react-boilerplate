import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { DropdownMenuTriggerProps } from './types';

export const DropdownMenuTrigger = (props: DropdownMenuTriggerProps) => (
  <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
);
