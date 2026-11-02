import { Tooltip as TooltipPrimitive } from 'radix-ui';

import { TOOLTIP_DELAY_DURATION } from './constants';
import type { TooltipProviderProps } from './types';

export const TooltipProvider = ({
  delayDuration = TOOLTIP_DELAY_DURATION,
  ...props
}: TooltipProviderProps) => (
  <TooltipPrimitive.Provider
    data-slot="tooltip-provider"
    delayDuration={delayDuration}
    {...props}
  />
);
