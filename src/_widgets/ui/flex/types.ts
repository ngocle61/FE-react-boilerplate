import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import type { flexVariants } from './variant';

export interface FlexProps extends ComponentProps<'div'>, VariantProps<typeof flexVariants> {
  asChild?: boolean;
}
