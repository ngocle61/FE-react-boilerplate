import { XIcon } from 'lucide-react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, BUTTON_VARIANTS, ICON_PLACEMENTS } from '@ui';

import { useFilterBar } from './use-filter-bar';
import { hasActiveFilters } from '../../utils/filter-bar.util';

export const FilterBarClearButton = () => {
  const { t } = useTranslation();
  const { state, actions } = useFilterBar();
  const isActive = useWatch({
    compute: (values) => hasActiveFilters(values, state.defaultValues),
  });

  if (!isActive) return null;

  return (
    <Button type="button" variant={BUTTON_VARIANTS.GHOST} onClick={actions.clearAll}>
      <XIcon data-icon={ICON_PLACEMENTS.INLINE_START} />
      {t('filterBar.clearAll')}
    </Button>
  );
};
