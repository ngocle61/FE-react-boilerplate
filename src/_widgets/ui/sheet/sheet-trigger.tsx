import { Dialog as SheetPrimitive } from 'radix-ui';

import type { SheetTriggerProps } from './types';

export const SheetTrigger = (props: SheetTriggerProps) => (
  <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
);
