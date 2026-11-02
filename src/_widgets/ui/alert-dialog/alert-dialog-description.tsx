import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import type { AlertDialogDescriptionProps } from './types';
import { cn } from '../../lib/cn';

export const AlertDialogDescription = ({ className, ...props }: AlertDialogDescriptionProps) => (
  <AlertDialogPrimitive.Description
    data-slot="alert-dialog-description"
    className={cn(
      'text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3',
      className,
    )}
    {...props}
  />
);
