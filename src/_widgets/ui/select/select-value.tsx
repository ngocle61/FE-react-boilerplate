import { Select as SelectPrimitive } from 'radix-ui';

import type { SelectValueProps } from './types';

export const SelectValue = (props: SelectValueProps) => (
  <SelectPrimitive.Value data-slot="select-value" {...props} />
);
