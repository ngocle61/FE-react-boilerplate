import { useCallback, useEffect, useId, useMemo, useState, type KeyboardEvent } from 'react';

import { OPTION_LIST_KEYS } from './constants';
import type { OptionListController, UseOptionListParams } from './types';
import { filterOptions, scrollOptionIntoView, toNextActiveIndex, toOptionId } from './utils';

export const useOptionList = <TValue extends ID>({
  options,
  onSelect,
  filter = filterOptions,
}: UseOptionListParams<TValue>): OptionListController<TValue> => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const listId = useId();

  const filteredOptions = useMemo(() => filter(options, query), [filter, options, query]);

  const getOptionId = useCallback((index: number) => toOptionId(listId, index), [listId]);

  const selectOption = (option: ValueOption<TValue>) => {
    if (option.disabled) return;
    onSelect(option);
  };

  const changeQuery = (nextQuery: string) => {
    setQuery(nextQuery);
    setActiveIndex(0);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === OPTION_LIST_KEYS.ENTER) {
      event.preventDefault();
      const activeOption = filteredOptions[activeIndex];
      if (activeOption) selectOption(activeOption);
      return;
    }

    const nextIndex = toNextActiveIndex(event.key, activeIndex, filteredOptions.length);
    if (nextIndex === null) return;
    event.preventDefault();
    setActiveIndex(nextIndex);
  };

  const reset = () => {
    setQuery('');
    setActiveIndex(0);
  };

  useEffect(() => {
    scrollOptionIntoView(getOptionId(activeIndex));
  }, [activeIndex, getOptionId]);

  return {
    state: { listId, query, activeIndex, filteredOptions },
    actions: { changeQuery, handleKeyDown, setActiveIndex, selectOption, reset },
    getOptionId,
  };
};
