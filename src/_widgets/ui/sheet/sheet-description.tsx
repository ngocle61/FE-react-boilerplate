import { Dialog as SheetPrimitive } from 'radix-ui';

import type { SheetDescriptionProps } from './types';
import { cn } from '../../lib/cn';

export const SheetDescription = ({ className, ...props }: SheetDescriptionProps) => (
  <SheetPrimitive.Description
    data-slot="sheet-description"
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
);
