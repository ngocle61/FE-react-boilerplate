import { Tooltip as TooltipPrimitive } from 'radix-ui';

import type { TooltipTriggerProps } from './types';

export const TooltipTrigger = (props: TooltipTriggerProps) => (
  <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
);
