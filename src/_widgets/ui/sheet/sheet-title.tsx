import { Dialog as SheetPrimitive } from 'radix-ui';

import type { SheetTitleProps } from './types';
import { cn } from '../../lib/cn';

export const SheetTitle = ({ className, ...props }: SheetTitleProps) => (
  <SheetPrimitive.Title
    data-slot="sheet-title"
    className={cn('font-heading text-lg font-semibold text-foreground', className)}
    {...props}
  />
);
