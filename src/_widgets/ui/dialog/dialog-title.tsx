import { Dialog as DialogPrimitive } from 'radix-ui';

import type { DialogTitleProps } from './types';
import { cn } from '../../lib/cn';

export const DialogTitle = ({ className, ...props }: DialogTitleProps) => (
  <DialogPrimitive.Title
    data-slot="dialog-title"
    className={cn('font-heading text-lg leading-snug font-semibold', className)}
    {...props}
  />
);
