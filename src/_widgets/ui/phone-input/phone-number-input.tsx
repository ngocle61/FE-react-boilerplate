import type { PhoneNumberInputProps } from './types';
import { cn } from '../../lib/cn';

export const PhoneNumberInput = ({ className, ...props }: PhoneNumberInputProps) => (
  <input
    data-slot="phone-number-input"
    className={cn(
      'h-full w-full min-w-0 flex-1 rounded-r-md bg-transparent px-3 text-md outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed md:text-sm',
      className,
    )}
    {...props}
  />
);
