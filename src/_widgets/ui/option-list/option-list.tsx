import type { OptionListProps } from './types';
import { cn } from '../../lib/cn';

export const OptionList = ({ className, ...props }: OptionListProps) => (
  <div
    role="listbox"
    data-slot="option-list"
    className={cn('scrollbar-thin max-h-60 scroll-py-1 overflow-y-auto p-1', className)}
    {...props}
  />
);
