import type { ComponentProps } from 'react';

import type { OptionListController } from '../option-list/types';

export interface ComboboxProps<TValue extends ID = ID> extends Omit<
  ComponentProps<'button'>,
  'value' | 'defaultValue' | 'onChange' | 'children' | 'type'
> {
  options: readonly ValueOption<TValue>[];
  value: Maybe<TValue>;
  onValueChange: (value: TValue) => void;
  onSearchChange?: (query: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
}

export interface ComboboxTriggerProps<TValue extends ID> extends Omit<
  ComponentProps<'button'>,
  'type' | 'children'
> {
  selectedOption: Maybe<ValueOption<TValue>>;
  placeholder: string;
}

export interface ComboboxContentProps<TValue extends ID> {
  value: Maybe<TValue>;
  searchPlaceholder: string;
  emptyText: string;
  optionList: OptionListController<TValue>;
  onQueryChange: (query: string) => void;
}
