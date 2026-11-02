import type { ComponentProps } from 'react';

import type { OptionListController } from '../option-list/types';

export interface MultiSelectProps<TValue extends ID = ID> extends Omit<
  ComponentProps<'button'>,
  'value' | 'defaultValue' | 'onChange' | 'children' | 'type'
> {
  options: readonly ValueOption<TValue>[];
  value: TValue[];
  onValueChange: (value: TValue[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  removeLabel?: string;
  clearLabel?: string;
}

export interface MultiSelectClearButtonProps {
  label: string;
  onClear: () => void;
}

export interface MultiSelectTriggerProps<TValue extends ID> extends Omit<
  ComponentProps<'button'>,
  'type' | 'children'
> {
  selectedOptions: ValueOption<TValue>[];
  placeholder: string;
}

export interface MultiSelectValueProps<TValue extends ID> {
  selectedOptions: ValueOption<TValue>[];
  placeholder: string;
  removeLabel: string;
  disabled?: boolean;
  onRemove: (value: TValue) => void;
}

export interface MultiSelectBadgeProps<TValue extends ID> {
  option: ValueOption<TValue>;
  removeLabel: string;
  disabled?: boolean;
  onRemove: (value: TValue) => void;
}

export interface MultiSelectContentProps<TValue extends ID> {
  value: TValue[];
  searchPlaceholder: string;
  emptyText: string;
  optionList: OptionListController<TValue>;
}
