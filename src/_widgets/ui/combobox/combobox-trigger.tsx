import { ChevronDownIcon } from 'lucide-react';

import type { ComboboxTriggerProps } from './types';
import { comboboxTriggerVariants } from './variant';
import { cn } from '../../lib/cn';

export const ComboboxTrigger = <TValue extends ID>({
  className,
  selectedOption,
  placeholder,
  ...props
}: ComboboxTriggerProps<TValue>) => (
  <button
    type="button"
    data-slot="combobox-trigger"
    data-placeholder={selectedOption ? undefined : ''}
    className={cn(comboboxTriggerVariants(), className)}
    {...props}
  >
    <span className="truncate">{selectedOption?.label ?? placeholder}</span>
    <ChevronDownIcon aria-hidden className="size-4 shrink-0 text-muted-foreground" />
  </button>
);
