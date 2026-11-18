import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { DropdownMenuGroupProps } from './types';

export const DropdownMenuGroup = (props: DropdownMenuGroupProps) => (
  <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
);
