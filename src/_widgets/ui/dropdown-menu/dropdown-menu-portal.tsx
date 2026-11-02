import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { DropdownMenuPortalProps } from './types';

export const DropdownMenuPortal = (props: DropdownMenuPortalProps) => (
  <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
);
