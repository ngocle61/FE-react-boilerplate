import { Dialog as DialogPrimitive } from 'radix-ui';

import type { DialogTriggerProps } from './types';

export const DialogTrigger = (props: DialogTriggerProps) => (
  <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
);
