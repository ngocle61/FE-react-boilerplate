import { SearchIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { FilterBar } from '@/shared/components/filter-bar/filter-bar';
import { FilterBarFilters } from '@/shared/components/filter-bar/filter-bar-filters';
import { FilterBarSearch } from '@/shared/components/filter-bar/filter-bar-search';
import { FIRST_PAGE } from '@/shared/constants/pagination.constant';
import { useDebouncedValue } from '@/shared/hooks/use-debounced-value';
import { useSearchParamsState } from '@/shared/hooks/use-search-params-state';
import { hasSearchStateChanges } from '@/shared/utils/search-params.util';
import { FIELD_LABEL_DISPLAYS, InputField, SelectField } from '@ui/form';

import { USER_ROLES } from '../../constants/role.constant';
import {
  ROLE_FILTER_VALUES,
  STATUS_FILTER_VALUES,
  USER_MANAGEMENT_FILTER_FIELDS,
  USER_MANAGEMENT_FILTERS_DEFAULT_VALUES,
} from '../../constants/user-management-filters.constant';
import { userFilterConverter } from '../../converters/user-filter.converter';
import { userManagementSearchSchema } from '../../schema/user-management-search.schema';
import type { UserManagementFilterValues } from '../../types/user-management-filters.type';

export const UserManagementFilters = () => {
  const { t } = useTranslation([I18N_NAMESPACES.USER_MANAGEMENT, I18N_NAMESPACES.COMMON]);
  const { state: searchState, setState: setSearchState } = useSearchParamsState(
    userManagementSearchSchema,
  );
  const form = useForm<UserManagementFilterValues>({
    defaultValues: userFilterConverter.toFormValues(searchState),
  });
  const search = useWatch({
    control: form.control,
    name: 'search',
    compute: (value) => value.trim(),
  });
  const debouncedSearch = useDebouncedValue(search);
  const filters = useWatch({
    control: form.control,
    compute: ({ role, isActive }) => ({ role, isActive }),
  });

  const roleOptions = [
    { value: ROLE_FILTER_VALUES.ALL, label: t('filters.allRoles') },
    ...USER_ROLES.map((role) => ({ value: role, label: t(`common:roles.${role}`) })),
  ];
  const statusOptions = [
    { value: STATUS_FILTER_VALUES.ALL, label: t('filters.allStatuses') },
    { value: STATUS_FILTER_VALUES.ACTIVE, label: t('status.active') },
    { value: STATUS_FILTER_VALUES.INACTIVE, label: t('status.inactive') },
  ];

  useEffect(() => {
    const nextFilters = { ...filters, search: debouncedSearch };
    if (!hasSearchStateChanges(searchState, nextFilters)) return;
    setSearchState({ ...nextFilters, page: FIRST_PAGE }, { replace: true });
  }, [filters, debouncedSearch, searchState, setSearchState]);

  return (
    <FilterBar form={form} defaultValues={USER_MANAGEMENT_FILTERS_DEFAULT_VALUES}>
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
      <FilterBarFilters fields={USER_MANAGEMENT_FILTER_FIELDS}>
        <SelectField
          name="role"
          label={t('filters.roleLabel')}
          labelDisplay={FIELD_LABEL_DISPLAYS.SR_ONLY}
          options={roleOptions}
          className="min-w-0 flex-1 md:w-40 md:flex-none"
        />
        <SelectField
          name="isActive"
          label={t('filters.statusLabel')}
          labelDisplay={FIELD_LABEL_DISPLAYS.SR_ONLY}
          options={statusOptions}
          className="min-w-0 flex-1 md:w-40 md:flex-none"
        />
      </FilterBarFilters>
    </FilterBar>
  );
};
