import type { SheetHeaderProps } from './types';
import { cn } from '../../lib/cn';

export const SheetHeader = ({ className, ...props }: SheetHeaderProps) => (
  <div data-slot="sheet-header" className={cn('flex flex-col gap-1 p-4', className)} {...props} />
);
