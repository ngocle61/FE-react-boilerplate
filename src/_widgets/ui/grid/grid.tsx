import { Slot } from 'radix-ui';

import type { GridProps } from './types';
import { gridVariants } from './variant';
import { cn } from '../../lib/cn';

export const Grid = ({
  className,
  cols,
  gap,
  align,
  justify,
  asChild = false,
  ...props
}: GridProps) => {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp
      data-slot="grid"
      className={cn(gridVariants({ cols, gap, align, justify }), className)}
      {...props}
    />
  );
};
