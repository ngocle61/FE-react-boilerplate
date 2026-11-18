import { cn, Flex, FLEX_ALIGNMENTS, FLEX_JUSTIFICATIONS, useIsMobile } from '@ui';

import { FilterBarClearButton } from './filter-bar-clear-button';
import { FilterBarDialog } from './filter-bar-dialog';
import type { FilterBarFiltersProps } from './filter-bar.type';
import { FILTER_BAR_COLLAPSE_THRESHOLD } from '../../constants/filter-bar.constant';

export const FilterBarFilters = ({ fields, children }: FilterBarFiltersProps) => {
  const isMobile = useIsMobile();

  const isCollapsed = isMobile && fields.length > FILTER_BAR_COLLAPSE_THRESHOLD;

  return (
    <Flex
      align={FLEX_ALIGNMENTS.CENTER}
      justify={FLEX_JUSTIFICATIONS.END}
      gap={2}
      wrap
      className={cn(!isCollapsed && 'w-full md:w-auto')}
    >
      {isCollapsed ? <FilterBarDialog fields={fields}>{children}</FilterBarDialog> : children}
      <FilterBarClearButton />
    </Flex>
  );
};
