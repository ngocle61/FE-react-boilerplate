import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { useDebouncedValue } from '@/shared/hooks/use-debounced-value';
import { Button, BUTTON_SIZES, BUTTON_VARIANTS, ICON_PLACEMENTS } from '@ui';
import { ComboboxField, InputField } from '@ui/form';

import { CLIENT_FIELDS_MODES } from '../../../../constants/intervention-client-fields.constant';
import { clientConverter } from '../../../../converters/client.converter';
import { useClientsQuery } from '../../../../hooks/use-clients-query';
import type { InterventionClientFieldsProps } from '../../../../types/intervention-client-fields.type';
import { toVisibleClients } from '../../../../utils/client-option.util';

export const InterventionClientFields = ({
  pinnedClients,
  mode,
  onModeChange,
}: InterventionClientFieldsProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.CALENDAR);

  const [search, setSearch] = useState('');

  const debouncedSearch = useDebouncedValue(search.trim());
  const clientsQuery = useClientsQuery(debouncedSearch);

  const clientOptions = clientConverter.toOptions(
    toVisibleClients(pinnedClients, clientsQuery.data ?? [], debouncedSearch),
  );

  switch (mode) {
    case CLIENT_FIELDS_MODES.NEW:
      return (
        <>
          <InputField name="newClientName" label={t('form.clientNameLabel')} />
          <InputField name="newClientPhone" label={t('form.clientPhoneLabel')} />
          <InputField name="newClientEmail" type="email" label={t('form.clientEmailLabel')} />
          <Button
            type="button"
            variant={BUTTON_VARIANTS.GHOST}
            size={BUTTON_SIZES.SM}
            className="self-start"
            onClick={() => onModeChange(CLIENT_FIELDS_MODES.EXISTING)}
          >
            {t('form.useExistingClient')}
          </Button>
        </>
      );

    case CLIENT_FIELDS_MODES.EXISTING:
      return (
        <>
          <ComboboxField
            name="clientId"
            label={t('form.clientLabel')}
            options={clientOptions}
            onSearchChange={setSearch}
            placeholder={t('form.clientPlaceholder')}
            searchPlaceholder={t('form.clientSearchPlaceholder')}
            emptyText={
              clientsQuery.isFetching ? t('form.clientSearching') : t('form.clientSearchEmpty')
            }
          />
          <Button
            type="button"
            variant={BUTTON_VARIANTS.GHOST}
            size={BUTTON_SIZES.SM}
            className="self-start"
            onClick={() => onModeChange(CLIENT_FIELDS_MODES.NEW)}
          >
            <PlusIcon data-icon={ICON_PLACEMENTS.INLINE_START} />
            {t('form.createNewClient')}
          </Button>
        </>
      );
  }
};
