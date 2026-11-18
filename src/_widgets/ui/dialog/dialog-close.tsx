import { Dialog as DialogPrimitive } from 'radix-ui';

import type { DialogCloseProps } from './types';

export const DialogClose = (props: DialogCloseProps) => (
  <DialogPrimitive.Close data-slot="dialog-close" {...props} />
);
