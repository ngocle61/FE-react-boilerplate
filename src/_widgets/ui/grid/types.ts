import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import type { gridVariants } from './variant';

export interface GridProps extends ComponentProps<'div'>, VariantProps<typeof gridVariants> {
  asChild?: boolean;
}
