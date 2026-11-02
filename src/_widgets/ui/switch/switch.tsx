import { Switch as SwitchPrimitive } from 'radix-ui';

import { SWITCH_SIZES } from './constants';
import type { SwitchProps } from './types';
import { switchThumbVariants, switchVariants } from './variant';
import { cn } from '../../lib/cn';

export const Switch = ({ className, size = SWITCH_SIZES.DEFAULT, ...props }: SwitchProps) => (
  <SwitchPrimitive.Root
    data-slot="switch"
    data-size={size}
    className={cn(switchVariants({ size }), className)}
    {...props}
  >
    <SwitchPrimitive.Thumb data-slot="switch-thumb" className={switchThumbVariants({ size })} />
  </SwitchPrimitive.Root>
);
