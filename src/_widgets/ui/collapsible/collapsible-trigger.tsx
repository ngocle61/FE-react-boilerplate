import { Collapsible as CollapsiblePrimitive } from 'radix-ui';

import type { CollapsibleTriggerProps } from './types';

export const CollapsibleTrigger = (props: CollapsibleTriggerProps) => (
  <CollapsiblePrimitive.CollapsibleTrigger data-slot="collapsible-trigger" {...props} />
);
