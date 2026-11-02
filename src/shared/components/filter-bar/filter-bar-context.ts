import { createContext } from 'react';

import type { FilterBarContextValue } from './filter-bar.type';

export const FilterBarContext = createContext<Nullable<FilterBarContextValue>>(null);
