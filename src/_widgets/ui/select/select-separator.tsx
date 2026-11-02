import { Select as SelectPrimitive } from 'radix-ui';

import type { SelectSeparatorProps } from './types';
import { cn } from '../../lib/cn';

export const SelectSeparator = ({ className, ...props }: SelectSeparatorProps) => (
  <SelectPrimitive.Separator
    data-slot="select-separator"
    className={cn('pointer-events-none -mx-1 my-1 h-px bg-border', className)}
    {...props}
  />
);
