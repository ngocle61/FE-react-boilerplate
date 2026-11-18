import { Slot } from 'radix-ui';

import { BUTTON_SIZES, BUTTON_VARIANTS } from './constants';
import type { ButtonProps } from './types';
import { buttonVariants } from './variant';
import { cn } from '../../lib/cn';

export const Button = ({
  className,
  variant = BUTTON_VARIANTS.DEFAULT,
  size = BUTTON_SIZES.DEFAULT,
  asChild = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
};
