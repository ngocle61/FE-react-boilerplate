import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { INTERVENTION_STATUSES } from '@/core/constants/intervention.constant';
import { i18nReady } from '@/core/libs/i18n';
import type { ClientDto } from '@/core/types/client.dto';
import { HttpError } from '@/core/utils/http-error.util';
import { INTERVENTION_FORM_DEFAULT_VALUES } from '@/modules/calendar/constants/intervention-form.constant';
import { useSubmitInterventionForm } from '@/modules/calendar/hooks/use-submit-intervention-form';
import type { InterventionFormValues } from '@/modules/calendar/types/intervention-form.type';

const { createClient, createIntervention, updateIntervention } = vi.hoisted(() => ({
  createClient: vi.fn(),
  createIntervention: vi.fn(),
  updateIntervention: vi.fn(),
}));

vi.mock('@/modules/calendar/services/client.service', () => ({
  clientService: { create: createClient, list: vi.fn() },
}));
vi.mock('@/modules/calendar/services/intervention.service', () => ({
  interventionService: { create: createIntervention, update: updateIntervention },
}));

const CREATED_CLIENT = { id: 'client-new', name: 'Acme' } as ClientDto;

const NEW_CLIENT_VALUES: InterventionFormValues = {
  ...INTERVENTION_FORM_DEFAULT_VALUES,
  newClientName: 'Acme',
  type: 'Repair',
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
);

const renderSubmit = (interventionId?: string) => {
  const onClientCreated = vi.fn();
  const onSuccess = vi.fn();
  const setError = vi.fn();
  const { result } = renderHook(
    () => useSubmitInterventionForm({ interventionId, setError, onClientCreated, onSuccess }),
    { wrapper },
  );
  return { result, onClientCreated, onSuccess };
};

beforeAll(() => i18nReady);

describe('useSubmitInterventionForm', () => {
  beforeEach(() => {
    createClient.mockReset().mockResolvedValue(CREATED_CLIENT);
    createIntervention.mockReset().mockResolvedValue({});
    updateIntervention.mockReset().mockResolvedValue({});
  });

  it('hands the new client back before the intervention request can fail', async () => {
    createIntervention.mockRejectedValueOnce(new HttpError({ messageKey: 'internal' }));
    const { result, onClientCreated, onSuccess } = renderSubmit();

    await act(() => result.current.submit(NEW_CLIENT_VALUES));

    expect(createClient).toHaveBeenCalledTimes(1);
    expect(onClientCreated).toHaveBeenCalledWith(CREATED_CLIENT);
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('reuses the client created by the failed attempt when the form is submitted again', async () => {
    const { result, onSuccess } = renderSubmit();

    await act(() => result.current.submit({ ...NEW_CLIENT_VALUES, clientId: CREATED_CLIENT.id }));

    expect(createClient).not.toHaveBeenCalled();
    expect(createIntervention.mock.calls[0]?.[0]).toMatchObject({ clientId: CREATED_CLIENT.id });
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('clears the notes on the server when they are emptied while editing', async () => {
    const { result } = renderSubmit('intervention-1');

    await act(() =>
      result.current.submit({
        ...NEW_CLIENT_VALUES,
        clientId: 'client-1',
        status: INTERVENTION_STATUSES.TO_SCHEDULE,
        notes: '',
      }),
    );

    expect(updateIntervention).toHaveBeenCalledWith(
      'intervention-1',
      expect.objectContaining({ notes: null }),
    );
  });
});
