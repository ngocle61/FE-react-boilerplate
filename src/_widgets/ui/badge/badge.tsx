import { Slot } from 'radix-ui';

import { BADGE_VARIANTS } from './constants';
import type { BadgeProps } from './types';
import { badgeVariants } from './variant';
import { cn } from '../../lib/cn';

export const Badge = ({
  className,
  variant = BADGE_VARIANTS.DEFAULT,
  asChild = false,
  ...props
}: BadgeProps) => {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
};
