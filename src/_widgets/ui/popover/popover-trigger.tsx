import { Popover as PopoverPrimitive } from 'radix-ui';

import type { PopoverTriggerProps } from './types';

export const PopoverTrigger = (props: PopoverTriggerProps) => (
  <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
);
