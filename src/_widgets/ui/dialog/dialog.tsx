import { Dialog as DialogPrimitive } from 'radix-ui';

import type { DialogProps } from './types';

export const Dialog = (props: DialogProps) => (
  <DialogPrimitive.Root data-slot="dialog" {...props} />
);
