import { useMutationState } from '@tanstack/react-query';

import { MUTATION_STATUSES } from '@/core/constants/query-client.constant';

import { INTERVENTION_MUTATION_KEYS } from '../constants/query-keys.constant';
import type { UpdateInterventionVariables } from '../types/intervention.type';

export const usePendingInterventionUpdates = (): UpdateInterventionVariables[] =>
  useMutationState({
    filters: { mutationKey: INTERVENTION_MUTATION_KEYS.UPDATE, status: MUTATION_STATUSES.PENDING },
    select: (mutation) => mutation.state.variables as UpdateInterventionVariables,
  });
