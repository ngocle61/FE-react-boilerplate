import { XIcon } from 'lucide-react';

import type { MultiSelectClearButtonProps } from './types';
import { multiSelectClearButtonVariants } from './variant';

export const MultiSelectClearButton = ({ label, onClear }: MultiSelectClearButtonProps) => (
  <button
    type="button"
    data-slot="multi-select-clear-button"
    aria-label={label}
    className={multiSelectClearButtonVariants()}
    onClick={onClear}
  >
    <XIcon aria-hidden />
  </button>
);
