import { Separator as SeparatorPrimitive } from 'radix-ui';

import { SEPARATOR_ORIENTATIONS } from './constants';
import type { SeparatorProps } from './types';
import { cn } from '../../lib/cn';

export const Separator = ({
  className,
  orientation = SEPARATOR_ORIENTATIONS.HORIZONTAL,
  decorative = true,
  ...props
}: SeparatorProps) => (
  <SeparatorPrimitive.Root
    data-slot="separator"
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch',
      className,
    )}
    {...props}
  />
);
