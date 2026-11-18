import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { applyServerFieldErrors } from '@/core/utils/form-error.util';

import { useCreateClient } from './use-create-client';
import { useCreateIntervention } from './use-create-intervention';
import { useUpdateIntervention } from './use-update-intervention';
import { INTERVENTION_FORM_SERVER_FIELDS } from '../constants/intervention-form.constant';
import { clientConverter } from '../converters/client.converter';
import { interventionConverter } from '../converters/intervention.converter';
import type {
  InterventionFormValues,
  UseSubmitInterventionFormParams,
} from '../types/intervention-form.type';

export const useSubmitInterventionForm = ({
  interventionId,
  setError,
  onClientCreated,
  onSuccess,
}: UseSubmitInterventionFormParams) => {
  const { t } = useTranslation(I18N_NAMESPACES.CALENDAR);
  const createClient = useCreateClient();
  const createIntervention = useCreateIntervention();
  const updateIntervention = useUpdateIntervention();

  const isPending =
    createClient.isPending || createIntervention.isPending || updateIntervention.isPending;

  const resolveClientId = async (values: InterventionFormValues): Promise<string> => {
    if (values.clientId) return values.clientId;

    const client = await createClient.mutateAsync(
      clientConverter.toCreatePayload({
        name: values.newClientName,
        phone: values.newClientPhone,
        email: values.newClientEmail,
      }),
    );
    onClientCreated(client);
    return client.id;
  };

  const submit = async (values: InterventionFormValues) => {
    try {
      const clientId = await resolveClientId(values);

      if (interventionId) {
        await updateIntervention.mutateAsync({
          id: interventionId,
          payload: interventionConverter.toUpdatePayload(values, clientId),
        });
        toast.success(t('form.updateSuccess'));
      } else {
        await createIntervention.mutateAsync(
          interventionConverter.toCreatePayload(values, clientId),
        );
        toast.success(t('form.createSuccess'));
      }

      onSuccess();
    } catch (error) {
      applyServerFieldErrors(error, setError, INTERVENTION_FORM_SERVER_FIELDS);
    }
  };

  return { submit, isPending };
};
