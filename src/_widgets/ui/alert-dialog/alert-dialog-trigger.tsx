import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import type { AlertDialogTriggerProps } from './types';

export const AlertDialogTrigger = (props: AlertDialogTriggerProps) => (
  <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
);
