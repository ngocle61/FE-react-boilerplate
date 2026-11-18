import { Dialog as SheetPrimitive } from 'radix-ui';

import type { SheetCloseProps } from './types';

export const SheetClose = (props: SheetCloseProps) => (
  <SheetPrimitive.Close data-slot="sheet-close" {...props} />
);
