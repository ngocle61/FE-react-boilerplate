import type { DialogFooterProps } from './types';
import { cn } from '../../lib/cn';

export const DialogFooter = ({ className, ...props }: DialogFooterProps) => (
  <div
    data-slot="dialog-footer"
    className={cn(
      '-mx-6 -mb-6 flex flex-col-reverse gap-2 rounded-b-xl border-t border-border bg-muted/50 px-6 py-4 sm:flex-row sm:justify-end',
      className,
    )}
    {...props}
  />
);
