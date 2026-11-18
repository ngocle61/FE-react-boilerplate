import { useMutation, useQueryClient } from '@tanstack/react-query';

import { INTERVENTION_MUTATION_KEYS } from '../constants/query-keys.constant';
import { interventionQueries } from '../queries/intervention.queries';
import { interventionService } from '../services/intervention.service';
import type { UpdateInterventionVariables } from '../types/intervention.type';

export const useUpdateIntervention = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: INTERVENTION_MUTATION_KEYS.UPDATE,
    mutationFn: ({ id, payload }: UpdateInterventionVariables) =>
      interventionService.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: interventionQueries.all() }),
  });
};
