import { Progress as ProgressPrimitive } from 'radix-ui';

import type { ProgressProps } from './types';
import { toProgressTransform } from './utils';
import { cn } from '../../lib/cn';

export const Progress = ({ className, value, ...props }: ProgressProps) => (
  <ProgressPrimitive.Root
    data-slot="progress"
    value={value}
    className={cn(
      'relative flex h-2 w-full items-center overflow-x-hidden rounded-full bg-muted',
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className="size-full flex-1 rounded-full bg-primary transition-all"
      style={{ transform: toProgressTransform(value) }}
    />
  </ProgressPrimitive.Root>
);
