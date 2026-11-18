import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { DropdownMenuSubProps } from './types';

export const DropdownMenuSub = (props: DropdownMenuSubProps) => (
  <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
);
