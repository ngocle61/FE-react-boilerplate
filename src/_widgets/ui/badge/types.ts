import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import type { badgeVariants } from './variant';

export interface BadgeProps extends ComponentProps<'span'>, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}
