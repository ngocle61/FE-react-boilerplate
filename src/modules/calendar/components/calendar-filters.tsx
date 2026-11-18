import { SearchIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { FilterBar } from '@/shared/components/filter-bar/filter-bar';
import { FilterBarFilters } from '@/shared/components/filter-bar/filter-bar-filters';
import { FilterBarSearch } from '@/shared/components/filter-bar/filter-bar-search';
import { useDebouncedValue } from '@/shared/hooks/use-debounced-value';
import { useSearchParamsState } from '@/shared/hooks/use-search-params-state';
import { hasSearchStateChanges } from '@/shared/utils/search-params.util';
import { FIELD_LABEL_DISPLAYS, InputField, MultiSelectField } from '@ui/form';

import {
  CALENDAR_FILTER_FIELDS,
  CALENDAR_FILTERS_DEFAULT_VALUES,
} from '../constants/calendar-filters.constant';
import { INTERVENTION_STATUS_OPTIONS } from '../constants/intervention-status.constant';
import { calendarFilterConverter } from '../converters/calendar-filter.converter';
import { useTechnicianOptionsQuery } from '../hooks/use-technician-options-query';
import { calendarSearchSchema } from '../schema/calendar-search.schema';
import type { CalendarFilterValues } from '../types/calendar-filters.type';

export const CalendarFilters = () => {
  const { t } = useTranslation([I18N_NAMESPACES.CALENDAR, I18N_NAMESPACES.COMMON]);
  const { state: searchState, setState: setSearchState } =
    useSearchParamsState(calendarSearchSchema);
  const form = useForm<CalendarFilterValues>({
    defaultValues: calendarFilterConverter.toFormValues(searchState),
  });
  const search = useWatch({
    control: form.control,
    name: 'search',
    compute: (value) => value.trim(),
  });
  const debouncedSearch = useDebouncedValue(search);
  const filters = useWatch({
    control: form.control,
    compute: ({ technicianIds, statuses }) => ({ technicianIds, statuses }),
  });
  const technicianOptionsQuery = useTechnicianOptionsQuery();

  const statusOptions = INTERVENTION_STATUS_OPTIONS.map((status) => ({
    value: status,
    label: t(`status.${status}`),
  }));
  const multiSelectLabels = {
    searchPlaceholder: t('common:multiSelect.searchPlaceholder'),
    emptyText: t('common:multiSelect.empty'),
    removeLabel: t('common:multiSelect.remove'),
    clearLabel: t('common:multiSelect.clear'),
  };

  useEffect(() => {
    const nextFilters = { ...filters, search: debouncedSearch };
    if (!hasSearchStateChanges(searchState, nextFilters)) return;
    setSearchState(nextFilters, { replace: true });
  }, [filters, debouncedSearch, searchState, setSearchState]);

  return (
    <FilterBar form={form} defaultValues={CALENDAR_FILTERS_DEFAULT_VALUES}>
      <FilterBarSearch>
        <InputField
          name="search"
          label={t('filters.searchLabel')}
          labelDisplay={FIELD_LABEL_DISPLAYS.SR_ONLY}
          startAddon={<SearchIcon />}
          placeholder={t('filters.searchPlaceholder')}
          className="w-full md:w-64"
        />
      </FilterBarSearch>
      <FilterBarFilters fields={CALENDAR_FILTER_FIELDS}>
        <MultiSelectField
          name="technicianIds"
          label={t('filters.technicianLabel')}
          labelDisplay={FIELD_LABEL_DISPLAYS.SR_ONLY}
          options={technicianOptionsQuery.data ?? []}
          placeholder={t('filters.technicianPlaceholder')}
          {...multiSelectLabels}
          className="min-w-0 flex-1 md:w-56 md:flex-none"
        />
        <MultiSelectField
          name="statuses"
          label={t('filters.statusLabel')}
          labelDisplay={FIELD_LABEL_DISPLAYS.SR_ONLY}
          options={statusOptions}
          placeholder={t('filters.statusPlaceholder')}
          {...multiSelectLabels}
          className="min-w-0 flex-1 md:w-56 md:flex-none"
        />
      </FilterBarFilters>
    </FilterBar>
  );
};
