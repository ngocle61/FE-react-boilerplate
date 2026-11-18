import type { OptionListEmptyProps } from './types';
import { cn } from '../../lib/cn';

export const OptionListEmpty = ({ className, ...props }: OptionListEmptyProps) => (
  <div
    role="status"
    data-slot="option-list-empty"
    className={cn('py-6 text-center text-sm text-muted-foreground', className)}
    {...props}
  />
);
