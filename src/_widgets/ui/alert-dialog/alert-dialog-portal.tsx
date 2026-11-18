import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import type { AlertDialogPortalProps } from './types';

export const AlertDialogPortal = (props: AlertDialogPortalProps) => (
  <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
);
