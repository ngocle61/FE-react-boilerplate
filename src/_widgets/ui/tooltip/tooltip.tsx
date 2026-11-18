import { Tooltip as TooltipPrimitive } from 'radix-ui';

import type { TooltipProps } from './types';

export const Tooltip = (props: TooltipProps) => (
  <TooltipPrimitive.Root data-slot="tooltip" {...props} />
);
