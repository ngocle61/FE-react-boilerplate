import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import type { AlertDialogTitleProps } from './types';
import { cn } from '../../lib/cn';

export const AlertDialogTitle = ({ className, ...props }: AlertDialogTitleProps) => (
  <AlertDialogPrimitive.Title
    data-slot="alert-dialog-title"
    className={cn(
      'font-heading text-lg font-semibold sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2',
      className,
    )}
    {...props}
  />
);
