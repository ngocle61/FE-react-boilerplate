import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import { AlertDialogOverlay } from './alert-dialog-overlay';
import { AlertDialogPortal } from './alert-dialog-portal';
import { ALERT_DIALOG_CONTENT_SIZES } from './constants';
import type { AlertDialogContentProps } from './types';
import { cn } from '../../lib/cn';

export const AlertDialogContent = ({
  className,
  size = ALERT_DIALOG_CONTENT_SIZES.DEFAULT,
  ...props
}: AlertDialogContentProps) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      data-slot="alert-dialog-content"
      data-size={size}
      className={cn(
        'group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl border border-border bg-popover p-6 text-popover-foreground shadow-toast duration-100 outline-none data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-md data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
);
