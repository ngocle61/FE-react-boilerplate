import { Select as SelectPrimitive } from 'radix-ui';

import type { SelectGroupProps } from './types';
import { cn } from '../../lib/cn';

export const SelectGroup = ({ className, ...props }: SelectGroupProps) => (
  <SelectPrimitive.Group
    data-slot="select-group"
    className={cn('scroll-my-1 p-1', className)}
    {...props}
  />
);
