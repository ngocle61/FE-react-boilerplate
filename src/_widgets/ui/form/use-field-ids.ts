import { useId } from 'react';

import type { FieldAriaIds } from './types';
import { toFieldAriaIds } from './utils';

export const useFieldIds = (id?: string): FieldAriaIds => {
  const generatedId = useId();

  return toFieldAriaIds(id ?? generatedId);
};
