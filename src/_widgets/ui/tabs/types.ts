import type { VariantProps } from 'class-variance-authority';
import type { Tabs as TabsPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import type { tabsListVariants } from './variant';

export type TabsProps = ComponentProps<typeof TabsPrimitive.Root>;

export interface TabsListProps
  extends ComponentProps<typeof TabsPrimitive.List>, VariantProps<typeof tabsListVariants> {}

export type TabsTriggerProps = ComponentProps<typeof TabsPrimitive.Trigger>;

export type TabsContentProps = ComponentProps<typeof TabsPrimitive.Content>;
