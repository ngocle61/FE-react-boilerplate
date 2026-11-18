import { use } from 'react';

import { FilterBarContext } from './filter-bar-context';
import { FILTER_BAR_CONTEXT_ERROR } from '../../constants/filter-bar.constant';

export const useFilterBar = () => {
  const context = use(FilterBarContext);

  if (!context) throw new Error(FILTER_BAR_CONTEXT_ERROR);

  return context;
};
