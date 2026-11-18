import { MULTI_SELECT_MAX_VISIBLE_ITEMS } from './constants';
import { MultiSelectBadge } from './multi-select-badge';
import type { MultiSelectValueProps } from './types';
import { multiSelectValueVariants } from './variant';
import { cn } from '../../lib/cn';
import { Badge } from '../badge/badge';
import { BADGE_VARIANTS } from '../badge/constants';

export const MultiSelectValue = <TValue extends ID>({
  selectedOptions,
  placeholder,
  removeLabel,
  disabled,
  onRemove,
}: MultiSelectValueProps<TValue>) => {
  if (selectedOptions.length === 0) {
    return (
      <span aria-hidden className={cn(multiSelectValueVariants(), 'text-muted-foreground')}>
        <span className="truncate">{placeholder}</span>
      </span>
    );
  }

  const visibleOptions = selectedOptions.slice(0, MULTI_SELECT_MAX_VISIBLE_ITEMS);
  const hiddenCount = selectedOptions.length - visibleOptions.length;

  return (
    <span className={multiSelectValueVariants()}>
      {visibleOptions.map((option) => (
        <MultiSelectBadge
          key={option.value}
          option={option}
          removeLabel={removeLabel}
          disabled={disabled}
          onRemove={onRemove}
        />
      ))}
      {hiddenCount > 0 && (
        <Badge aria-hidden variant={BADGE_VARIANTS.OUTLINE}>
          +{hiddenCount}
        </Badge>
      )}
    </span>
  );
};
