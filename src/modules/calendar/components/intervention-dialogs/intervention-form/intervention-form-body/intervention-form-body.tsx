import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2Icon } from 'lucide-react';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { useDateLocale } from '@/core/hooks/use-date-locale';
import type { ClientDto } from '@/core/types/client.dto';
import { SUBMIT_FIRST_VALIDATION } from '@/shared/constants/form.constant';
import {
  Button,
  BUTTON_VARIANTS,
  FieldGroup,
  Flex,
  ICON_PLACEMENTS,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Spinner,
} from '@ui';
import {
  DatePickerField,
  Form,
  InputField,
  SelectField,
  SwitchField,
  TextareaField,
} from '@ui/form';

import { InterventionClientFields } from './intervention-client-fields';
import { UNASSIGNED_TECHNICIAN_VALUE } from '../../../../constants/calendar.constant';
import { DURATION_OPTIONS_MINUTES } from '../../../../constants/duration-options.constant';
import { CLIENT_FIELDS_MODES } from '../../../../constants/intervention-client-fields.constant';
import { INTERVENTION_FORM_DEFAULT_VALUES } from '../../../../constants/intervention-form.constant';
import { INTERVENTION_STATUS_OPTIONS } from '../../../../constants/intervention-status.constant';
import { interventionConverter } from '../../../../converters/intervention.converter';
import { technicianConverter } from '../../../../converters/technician.converter';
import { useSubmitInterventionForm } from '../../../../hooks/use-submit-intervention-form';
import { createInterventionFormSchema } from '../../../../schema/intervention-form.schema';
import type { ClientOptionSource } from '../../../../types/client.type';
import type { ClientFieldsMode } from '../../../../types/intervention-client-fields.type';
import type {
  InterventionFormBodyProps,
  InterventionFormValues,
} from '../../../../types/intervention-form.type';
import { formatDuration } from '../../../../utils/format-duration.util';

export const InterventionFormBody = ({
  intervention,
  technicians,
  onDeleteRequest,
  onOpenChange,
}: InterventionFormBodyProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.CALENDAR);
  const formId = useId();
  const dateLocale = useDateLocale();

  const isEditing = Boolean(intervention);

  const [clientFieldsMode, setClientFieldsMode] = useState<ClientFieldsMode>(
    CLIENT_FIELDS_MODES.EXISTING,
  );
  const [pinnedClients, setPinnedClients] = useState<ClientOptionSource[]>(() =>
    intervention ? [intervention.raw.client] : [],
  );

  const schema = createInterventionFormSchema(t);

  const form = useForm<InterventionFormValues>({
    resolver: zodResolver(schema),
    defaultValues: intervention
      ? interventionConverter.toFormValues(intervention.raw)
      : INTERVENTION_FORM_DEFAULT_VALUES,
    ...SUBMIT_FIRST_VALIDATION,
  });

  const clearNewClientFields = () => {
    form.resetField('newClientName');
    form.resetField('newClientPhone');
    form.resetField('newClientEmail');
  };

  const handleClientFieldsModeChange = (mode: ClientFieldsMode) => {
    setClientFieldsMode(mode);
    switch (mode) {
      case CLIENT_FIELDS_MODES.NEW:
        form.resetField('clientId', { defaultValue: '' });
        return;
      case CLIENT_FIELDS_MODES.EXISTING:
        clearNewClientFields();
        return;
    }
  };

  const handleClientCreated = (client: ClientDto) => {
    setPinnedClients((current) => [...current, client]);
    setClientFieldsMode(CLIENT_FIELDS_MODES.EXISTING);
    form.resetField('clientId', { defaultValue: client.id });
    clearNewClientFields();
  };

  const { submit, isPending } = useSubmitInterventionForm({
    interventionId: intervention?.id,
    setError: form.setError,
    onClientCreated: handleClientCreated,
    onSuccess: () => onOpenChange(false),
  });

  const technicianOptions = [
    { value: UNASSIGNED_TECHNICIAN_VALUE, label: t('form.unassigned') },
    ...technicianConverter.toOptions(technicians),
  ];
  const durationOptions = DURATION_OPTIONS_MINUTES.map((minutes) => ({
    value: String(minutes),
    label: formatDuration(minutes, t),
  }));
  const statusOptions = INTERVENTION_STATUS_OPTIONS.map((status) => ({
    value: status,
    label: t(`status.${status}`),
  }));

  return (
    <>
      <SheetHeader>
        <SheetTitle>{isEditing ? t('form.editTitle') : t('form.createTitle')}</SheetTitle>
        <SheetDescription>
          {isEditing ? t('form.editDescription') : t('form.createDescription')}
        </SheetDescription>
      </SheetHeader>
      <Form id={formId} form={form} onSubmit={submit} className="flex-1 overflow-y-auto px-4 py-2">
        <FieldGroup>
          <InterventionClientFields
            pinnedClients={pinnedClients}
            mode={clientFieldsMode}
            onModeChange={handleClientFieldsModeChange}
          />
          <InputField
            name="type"
            label={t('form.typeLabel')}
            placeholder={t('form.typePlaceholder')}
          />
          <SelectField
            name="technicianId"
            label={t('form.technicianLabel')}
            options={technicianOptions}
          />
          <Flex gap={3}>
            <DatePickerField
              name="startsAtDate"
              label={t('form.dateLabel')}
              placeholder={t('form.datePlaceholder')}
              locale={dateLocale}
              className="flex-1"
            />
            <InputField
              name="startsAtTime"
              type="time"
              label={t('form.timeLabel')}
              className="flex-1"
            />
          </Flex>
          <SelectField
            name="durationMinutes"
            label={t('form.durationLabel')}
            options={durationOptions}
          />
          {isEditing && (
            <SelectField name="status" label={t('form.statusLabel')} options={statusOptions} />
          )}
          <SwitchField
            name="isUrgent"
            label={t('form.urgentLabel')}
            description={t('form.urgentDescription')}
          />
          <TextareaField name="notes" label={t('form.notesLabel')} />
        </FieldGroup>
      </Form>
      <SheetFooter className="flex-row items-center justify-between border-t border-border pt-4">
        {intervention ? (
          <Button
            type="button"
            variant={BUTTON_VARIANTS.DESTRUCTIVE}
            onClick={() => onDeleteRequest(intervention)}
          >
            <Trash2Icon data-icon={ICON_PLACEMENTS.INLINE_START} />
            {t('form.delete')}
          </Button>
        ) : (
          <span />
        )}
        <Button type="submit" form={formId} disabled={isPending}>
          {isPending && <Spinner data-icon={ICON_PLACEMENTS.INLINE_START} />}
          {isEditing ? t('form.saveChanges') : t('form.create')}
        </Button>
      </SheetFooter>
    </>
  );
};
