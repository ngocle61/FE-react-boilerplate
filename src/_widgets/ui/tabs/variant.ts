import { cva } from 'class-variance-authority';

import { TABS_LIST_VARIANTS } from './constants';

export const tabsListVariants = cva(
  'group/tabs-list inline-flex w-fit items-center justify-center text-muted-foreground group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col',
  {
    variants: {
      variant: {
        [TABS_LIST_VARIANTS.DEFAULT]: 'rounded-lg bg-muted p-1 group-data-horizontal/tabs:h-10',
        [TABS_LIST_VARIANTS.LINE]:
          'gap-6 border-b border-border bg-transparent group-data-vertical/tabs:border-r group-data-vertical/tabs:border-b-0',
      },
    },
    defaultVariants: {
      variant: TABS_LIST_VARIANTS.DEFAULT,
    },
  },
);
