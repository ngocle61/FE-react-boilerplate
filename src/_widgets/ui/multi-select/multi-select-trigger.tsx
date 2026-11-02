import { ChevronDownIcon } from 'lucide-react';

import type { MultiSelectTriggerProps } from './types';
import { toSelectionSummary } from './utils';
import { multiSelectTriggerVariants } from './variant';
import { cn } from '../../lib/cn';

export const MultiSelectTrigger = <TValue extends ID>({
  className,
  selectedOptions,
  placeholder,
  ...props
}: MultiSelectTriggerProps<TValue>) => (
  <button
    type="button"
    data-slot="multi-select-trigger"
    className={cn(multiSelectTriggerVariants(), className)}
    {...props}
  >
    <span className="sr-only">{toSelectionSummary(selectedOptions, placeholder)}</span>
    <ChevronDownIcon
      aria-hidden
      className="size-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]/multi-select:rotate-180"
    />
  </button>
);
