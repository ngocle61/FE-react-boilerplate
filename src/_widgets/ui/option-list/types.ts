import type { ComponentProps, KeyboardEvent } from 'react';

export type OptionFilter<TValue extends ID> = (
  options: readonly ValueOption<TValue>[],
  query: string,
) => ValueOption<TValue>[];

export interface UseOptionListParams<TValue extends ID> {
  options: readonly ValueOption<TValue>[];
  onSelect: (option: ValueOption<TValue>) => void;
  filter?: OptionFilter<TValue>;
}

export interface OptionListState<TValue extends ID> {
  listId: string;
  query: string;
  activeIndex: number;
  filteredOptions: ValueOption<TValue>[];
}

export interface OptionListActions<TValue extends ID> {
  changeQuery: (query: string) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  setActiveIndex: (index: number) => void;
  selectOption: (option: ValueOption<TValue>) => void;
  reset: () => void;
}

export interface OptionListController<TValue extends ID> {
  state: OptionListState<TValue>;
  actions: OptionListActions<TValue>;
  getOptionId: (index: number) => string;
}

export type OptionListProps = ComponentProps<'div'>;

export interface OptionListSearchProps extends Omit<ComponentProps<'input'>, 'role'> {
  listId: string;
  activeOptionId?: string;
}

export interface OptionListItemProps extends Omit<ComponentProps<'div'>, 'role'> {
  isSelected?: boolean;
  isActive?: boolean;
  disabled?: boolean;
}

export type OptionListEmptyProps = ComponentProps<'div'>;
