import { Collapsible as CollapsiblePrimitive } from 'radix-ui';

import type { CollapsibleContentProps } from './types';

export const CollapsibleContent = (props: CollapsibleContentProps) => (
  <CollapsiblePrimitive.CollapsibleContent data-slot="collapsible-content" {...props} />
);
