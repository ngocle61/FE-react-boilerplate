import { Select as SelectPrimitive } from 'radix-ui';

import type { SelectLabelProps } from './types';
import { cn } from '../../lib/cn';

export const SelectLabel = ({ className, ...props }: SelectLabelProps) => (
  <SelectPrimitive.Label
    data-slot="select-label"
    className={cn('px-2 py-1.5 text-xs font-medium text-muted-foreground', className)}
    {...props}
  />
);
