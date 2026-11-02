import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { DropdownMenuRadioGroupProps } from './types';

export const DropdownMenuRadioGroup = (props: DropdownMenuRadioGroupProps) => (
  <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
);
