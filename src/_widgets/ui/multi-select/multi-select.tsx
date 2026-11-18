import { useRef, useState } from 'react';

import {
  MULTI_SELECT_CLEAR_LABEL,
  MULTI_SELECT_EMPTY_TEXT,
  MULTI_SELECT_PLACEHOLDER,
  MULTI_SELECT_REMOVE_LABEL,
  MULTI_SELECT_SEARCH_PLACEHOLDER,
} from './constants';
import { MultiSelectClearButton } from './multi-select-clear-button';
import { MultiSelectContent } from './multi-select-content';
import { MultiSelectTrigger } from './multi-select-trigger';
import { MultiSelectValue } from './multi-select-value';
import type { MultiSelectProps } from './types';
import { removeValue, toggleValue, toSelectedOptions } from './utils';
import { multiSelectVariants } from './variant';
import { cn } from '../../lib/cn';
import { useOptionList } from '../option-list/use-option-list';
import { POPOVER_ALIGNMENTS } from '../popover/constants';
import { Popover } from '../popover/popover';
import { PopoverAnchor } from '../popover/popover-anchor';
import { PopoverContent } from '../popover/popover-content';
import { PopoverTrigger } from '../popover/popover-trigger';

export const MultiSelect = <TValue extends ID>({
  options,
  value,
  onValueChange,
  placeholder = MULTI_SELECT_PLACEHOLDER,
  searchPlaceholder = MULTI_SELECT_SEARCH_PLACEHOLDER,
  emptyText = MULTI_SELECT_EMPTY_TEXT,
  removeLabel = MULTI_SELECT_REMOVE_LABEL,
  clearLabel = MULTI_SELECT_CLEAR_LABEL,
  className,
  disabled,
  ...triggerProps
}: MultiSelectProps<TValue>) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const optionList = useOptionList({
    options,
    onSelect: (option) => onValueChange(toggleValue(value, option.value)),
  });

  const selectedOptions = toSelectedOptions(options, value);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) optionList.actions.reset();
  };

  const handleRemove = (removedValue: TValue) => {
    onValueChange(removeValue(value, removedValue));
    triggerRef.current?.focus();
  };

  const handleClear = () => {
    onValueChange([]);
    triggerRef.current?.focus();
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverAnchor asChild>
        <div data-slot="multi-select" className={cn(multiSelectVariants(), className)}>
          <PopoverTrigger ref={triggerRef} asChild>
            <MultiSelectTrigger
              selectedOptions={selectedOptions}
              placeholder={placeholder}
              disabled={disabled}
              {...triggerProps}
            />
          </PopoverTrigger>
          <MultiSelectValue
            selectedOptions={selectedOptions}
            placeholder={placeholder}
            removeLabel={removeLabel}
            disabled={disabled}
            onRemove={handleRemove}
          />
          {selectedOptions.length > 0 && !disabled && (
            <MultiSelectClearButton label={clearLabel} onClear={handleClear} />
          )}
        </div>
      </PopoverAnchor>
      <PopoverContent
        align={POPOVER_ALIGNMENTS.START}
        className="w-(--radix-popover-trigger-width) gap-0 p-0"
      >
        <MultiSelectContent
          value={value}
          searchPlaceholder={searchPlaceholder}
          emptyText={emptyText}
          optionList={optionList}
        />
      </PopoverContent>
    </Popover>
  );
};
