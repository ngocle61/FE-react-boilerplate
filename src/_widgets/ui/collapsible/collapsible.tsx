import { Collapsible as CollapsiblePrimitive } from 'radix-ui';

import type { CollapsibleProps } from './types';

export const Collapsible = (props: CollapsibleProps) => (
  <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
);
