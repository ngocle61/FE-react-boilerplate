import { XIcon } from 'lucide-react';

import type { MultiSelectBadgeProps } from './types';
import { multiSelectRemoveButtonVariants } from './variant';
import { ICON_PLACEMENTS } from '../../lib/constants';
import { Badge } from '../badge/badge';
import { BADGE_VARIANTS } from '../badge/constants';

export const MultiSelectBadge = <TValue extends ID>({
  option,
  removeLabel,
  disabled,
  onRemove,
}: MultiSelectBadgeProps<TValue>) => (
  <Badge variant={BADGE_VARIANTS.SECONDARY} className="max-w-40">
    <span aria-hidden className="truncate">
      {option.label}
    </span>
    {!disabled && (
      <button
        type="button"
        data-slot="multi-select-remove-button"
        data-icon={ICON_PLACEMENTS.INLINE_END}
        aria-label={`${removeLabel} ${option.label}`}
        className={multiSelectRemoveButtonVariants()}
        onClick={() => onRemove(option.value)}
      >
        <XIcon aria-hidden />
      </button>
    )}
  </Badge>
);
