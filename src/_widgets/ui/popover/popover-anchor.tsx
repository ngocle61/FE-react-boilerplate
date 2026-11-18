import { Popover as PopoverPrimitive } from 'radix-ui';

import type { PopoverAnchorProps } from './types';

export const PopoverAnchor = (props: PopoverAnchorProps) => (
  <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
);
