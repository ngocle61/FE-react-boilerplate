import { Slot } from 'radix-ui';

import type { CardTitleProps } from './types';
import { cn } from '../../lib/cn';

export const CardTitle = ({ className, asChild = false, ...props }: CardTitleProps) => {
  const Comp = asChild ? Slot.Root : 'h3';

  return (
    <Comp
      data-slot="card-title"
      className={cn(
        'font-heading text-lg leading-snug font-semibold text-card-foreground group-data-[size=sm]/card:text-base',
        className,
      )}
      {...props}
    />
  );
};
