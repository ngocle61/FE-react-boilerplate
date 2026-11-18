import { Select as SelectPrimitive } from 'radix-ui';

import type { SelectProps } from './types';

export const Select = (props: SelectProps) => (
  <SelectPrimitive.Root data-slot="select" {...props} />
);
