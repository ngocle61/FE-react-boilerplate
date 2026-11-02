import type { ReactNode } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';

export interface FilterBarProps<TValues extends FieldValues> {
  form: UseFormReturn<TValues>;
  defaultValues: TValues;
  children: ReactNode;
}

export interface FilterBarSearchProps {
  children: ReactNode;
}

export interface FilterBarFiltersProps {
  fields: readonly string[];
  children: ReactNode;
}

export interface FilterBarState {
  defaultValues: FieldValues;
}

export interface FilterBarActions {
  clearAll: () => void;
}

export interface FilterBarContextValue {
  state: FilterBarState;
  actions: FilterBarActions;
}
