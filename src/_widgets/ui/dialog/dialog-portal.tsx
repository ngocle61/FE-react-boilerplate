import { Dialog as DialogPrimitive } from 'radix-ui';

import type { DialogPortalProps } from './types';

export const DialogPortal = (props: DialogPortalProps) => (
  <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
);
