import { Dialog as DialogPrimitive } from 'radix-ui';

import type { DialogDescriptionProps } from './types';
import { cn } from '../../lib/cn';

export const DialogDescription = ({ className, ...props }: DialogDescriptionProps) => (
  <DialogPrimitive.Description
    data-slot="dialog-description"
    className={cn(
      'text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3',
      className,
    )}
    {...props}
  />
);
