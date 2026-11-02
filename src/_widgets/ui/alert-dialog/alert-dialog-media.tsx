import type { AlertDialogMediaProps } from './types';
import { cn } from '../../lib/cn';

export const AlertDialogMedia = ({ className, ...props }: AlertDialogMediaProps) => (
  <div
    data-slot="alert-dialog-media"
    aria-hidden
    className={cn(
      "mb-2 inline-flex size-10 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6",
      className,
    )}
    {...props}
  />
);
