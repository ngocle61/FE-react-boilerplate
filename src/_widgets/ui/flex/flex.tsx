import { Slot } from 'radix-ui';

import type { FlexProps } from './types';
import { flexVariants } from './variant';
import { cn } from '../../lib/cn';

export const Flex = ({
  className,
  direction,
  align,
  justify,
  gap,
  wrap,
  asChild = false,
  ...props
}: FlexProps) => {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp
      data-slot="flex"
      className={cn(flexVariants({ direction, align, justify, gap, wrap }), className)}
      {...props}
    />
  );
};
