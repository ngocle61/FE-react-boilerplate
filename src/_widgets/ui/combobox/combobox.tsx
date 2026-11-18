import { useState } from 'react';

import { ComboboxContent } from './combobox-content';
import { ComboboxTrigger } from './combobox-trigger';
import {
  COMBOBOX_EMPTY_TEXT,
  COMBOBOX_PLACEHOLDER,
  COMBOBOX_SEARCH_PLACEHOLDER,
} from './constants';
import type { ComboboxProps } from './types';
import { findOption, toSelectedOption } from './utils';
import { useOptionList } from '../option-list/use-option-list';
import { keepAllOptions } from '../option-list/utils';
import { POPOVER_ALIGNMENTS } from '../popover/constants';
import { Popover } from '../popover/popover';
import { PopoverContent } from '../popover/popover-content';
import { PopoverTrigger } from '../popover/popover-trigger';

export const Combobox = <TValue extends ID>({
  options,
  value,
  onValueChange,
  onSearchChange,
  placeholder = COMBOBOX_PLACEHOLDER,
  searchPlaceholder = COMBOBOX_SEARCH_PLACEHOLDER,
  emptyText = COMBOBOX_EMPTY_TEXT,
  ...triggerProps
}: ComboboxProps<TValue>) => {
  const [open, setOpen] = useState(false);
  const [rememberedOption, setRememberedOption] = useState(() => findOption(options, value));

  const optionList = useOptionList({
    options,
    filter: onSearchChange ? keepAllOptions : undefined,
    onSelect: (option) => {
      setRememberedOption(option);
      onValueChange(option.value);
      handleOpenChange(false);
    },
  });

  const selectedOption = toSelectedOption(options, value, rememberedOption);

  const handleQueryChange = (query: string) => {
    optionList.actions.changeQuery(query);
    onSearchChange?.(query);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) return;
    optionList.actions.reset();
    onSearchChange?.('');
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <ComboboxTrigger
          selectedOption={selectedOption}
          placeholder={placeholder}
          {...triggerProps}
        />
      </PopoverTrigger>
      <PopoverContent
        align={POPOVER_ALIGNMENTS.START}
        className="w-(--radix-popover-trigger-width) gap-0 p-0"
      >
        <ComboboxContent
          value={value}
          searchPlaceholder={searchPlaceholder}
          emptyText={emptyText}
          optionList={optionList}
          onQueryChange={handleQueryChange}
        />
      </PopoverContent>
    </Popover>
  );
};
