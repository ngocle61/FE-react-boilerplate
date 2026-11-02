import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { DropdownMenuProps } from './types';

export const DropdownMenu = (props: DropdownMenuProps) => (
  <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
);
