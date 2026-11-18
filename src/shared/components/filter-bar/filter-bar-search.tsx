import { Flex, FLEX_ALIGNMENTS } from '@ui';

import type { FilterBarSearchProps } from './filter-bar.type';

export const FilterBarSearch = ({ children }: FilterBarSearchProps) => (
  <Flex align={FLEX_ALIGNMENTS.CENTER} className="min-w-0 flex-1 md:flex-none">
    {children}
  </Flex>
);
