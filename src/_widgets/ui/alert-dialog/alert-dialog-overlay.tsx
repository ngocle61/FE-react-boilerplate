import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import type { AlertDialogOverlayProps } from './types';
import { cn } from '../../lib/cn';

export const AlertDialogOverlay = ({ className, ...props }: AlertDialogOverlayProps) => (
  <AlertDialogPrimitive.Overlay
    data-slot="alert-dialog-overlay"
    className={cn(
      'fixed inset-0 z-50 bg-black/40 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
      className,
    )}
    {...props}
  />
);
