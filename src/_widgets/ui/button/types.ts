import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import type { buttonVariants } from './variant';

export interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
