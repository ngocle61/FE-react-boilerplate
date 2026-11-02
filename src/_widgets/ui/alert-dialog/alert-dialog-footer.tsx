import type { AlertDialogFooterProps } from './types';
import { cn } from '../../lib/cn';

export const AlertDialogFooter = ({ className, ...props }: AlertDialogFooterProps) => (
  <div
    data-slot="alert-dialog-footer"
    className={cn(
      '-mx-6 -mb-6 flex flex-col-reverse gap-2 rounded-b-xl border-t border-border bg-muted/50 px-6 py-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end',
      className,
    )}
    {...props}
  />
);
