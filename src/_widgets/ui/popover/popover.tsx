import { Popover as PopoverPrimitive } from 'radix-ui';

import type { PopoverProps } from './types';

export const Popover = (props: PopoverProps) => (
  <PopoverPrimitive.Root data-slot="popover" {...props} />
);
