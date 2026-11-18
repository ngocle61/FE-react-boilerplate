import { Tabs as TabsPrimitive } from 'radix-ui';

import type { TabsContentProps } from './types';
import { cn } from '../../lib/cn';

export const TabsContent = ({ className, ...props }: TabsContentProps) => (
  <TabsPrimitive.Content
    data-slot="tabs-content"
    className={cn(
      'flex-1 rounded-md text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/40',
      className,
    )}
    {...props}
  />
);
