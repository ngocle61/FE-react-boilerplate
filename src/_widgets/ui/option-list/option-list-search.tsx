import { SearchIcon } from 'lucide-react';

import type { OptionListSearchProps } from './types';
import { cn } from '../../lib/cn';

export const OptionListSearch = ({
  className,
  listId,
  activeOptionId,
  ...props
}: OptionListSearchProps) => (
  <div
    data-slot="option-list-search"
    className="flex items-center gap-2 border-b border-border px-3"
  >
    <SearchIcon aria-hidden className="size-4 shrink-0 text-muted-foreground" />
    <input
      role="combobox"
      aria-expanded
      aria-controls={listId}
      aria-activedescendant={activeOptionId}
      aria-autocomplete="list"
      autoComplete="off"
      className={cn(
        'h-10 w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground',
        className,
      )}
      {...props}
    />
  </div>
);
