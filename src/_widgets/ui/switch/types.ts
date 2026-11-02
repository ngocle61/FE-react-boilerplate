import type { VariantProps } from 'class-variance-authority';
import type { Switch as SwitchPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import type { switchVariants } from './variant';

export interface SwitchProps
  extends ComponentProps<typeof SwitchPrimitive.Root>, VariantProps<typeof switchVariants> {}
