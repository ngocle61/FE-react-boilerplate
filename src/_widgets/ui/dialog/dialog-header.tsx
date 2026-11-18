import type { DialogHeaderProps } from './types';
import { cn } from '../../lib/cn';

export const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div
    data-slot="dialog-header"
    className={cn('flex flex-col gap-1.5 text-center sm:text-left', className)}
    {...props}
  />
);
