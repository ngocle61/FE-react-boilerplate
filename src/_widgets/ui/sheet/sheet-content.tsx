import { Dialog as SheetPrimitive } from 'radix-ui';

import { SHEET_SIDES } from './constants';
import { SheetOverlay } from './sheet-overlay';
import { SheetPortal } from './sheet-portal';
import type { SheetContentProps } from './types';
import { sheetContentVariants } from './variant';
import { cn } from '../../lib/cn';

export const SheetContent = ({
  className,
  children,
  side = SHEET_SIDES.RIGHT,
  ...props
}: SheetContentProps) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      data-slot="sheet-content"
      data-side={side}
      className={cn(sheetContentVariants({ side }), className)}
      {...props}
    >
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
);
