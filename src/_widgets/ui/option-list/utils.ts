import type { MouseEvent } from 'react';

import { OPTION_LIST_KEYS } from './constants';

export const filterOptions = <TValue extends ID>(
  options: readonly ValueOption<TValue>[],
  query: string,
): ValueOption<TValue>[] => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [...options];
  return options.filter((option) => option.label.toLowerCase().includes(normalizedQuery));
};

export const keepAllOptions = <TValue extends ID>(
  options: readonly ValueOption<TValue>[],
): ValueOption<TValue>[] => [...options];

export const toNextActiveIndex = (
  key: string,
  activeIndex: number,
  total: number,
): Nullable<number> => {
  if (total === 0) return null;

  switch (key) {
    case OPTION_LIST_KEYS.ARROW_DOWN:
      return (activeIndex + 1) % total;
    case OPTION_LIST_KEYS.ARROW_UP:
      return (activeIndex - 1 + total) % total;
    case OPTION_LIST_KEYS.HOME:
      return 0;
    case OPTION_LIST_KEYS.END:
      return total - 1;
    default:
      return null;
  }
};

export const toOptionId = (listId: string, index: number) => `${listId}-option-${index}`;

export const preventFocusLoss = (event: MouseEvent<HTMLElement>) => event.preventDefault();

export const scrollOptionIntoView = (optionId: string) => {
  document.getElementById(optionId)?.scrollIntoView?.({ block: 'nearest' });
};
