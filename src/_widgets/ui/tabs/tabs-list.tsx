import { Tabs as TabsPrimitive } from 'radix-ui';

import { TABS_LIST_VARIANTS } from './constants';
import type { TabsListProps } from './types';
import { tabsListVariants } from './variant';
import { cn } from '../../lib/cn';

export const TabsList = ({
  className,
  variant = TABS_LIST_VARIANTS.DEFAULT,
  ...props
}: TabsListProps) => (
  <TabsPrimitive.List
    data-slot="tabs-list"
    data-variant={variant}
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  />
);
