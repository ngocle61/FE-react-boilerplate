import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import type { AlertDialogProps } from './types';

export const AlertDialog = (props: AlertDialogProps) => (
  <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
);
