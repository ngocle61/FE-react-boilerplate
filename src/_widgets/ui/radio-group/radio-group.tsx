import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';

import type { RadioGroupProps } from './types';
import { cn } from '../../lib/cn';

export const RadioGroup = ({ className, ...props }: RadioGroupProps) => (
  <RadioGroupPrimitive.Root
    data-slot="radio-group"
    className={cn('grid w-full gap-3', className)}
    {...props}
  />
);
