import { Tabs as TabsPrimitive } from 'radix-ui';

import { TABS_ORIENTATIONS } from './constants';
import type { TabsProps } from './types';
import { cn } from '../../lib/cn';

export const Tabs = ({
  className,
  orientation = TABS_ORIENTATIONS.HORIZONTAL,
  ...props
}: TabsProps) => (
  <TabsPrimitive.Root
    data-slot="tabs"
    data-orientation={orientation}
    orientation={orientation}
    className={cn('group/tabs flex gap-3 data-horizontal:flex-col', className)}
    {...props}
  />
);
