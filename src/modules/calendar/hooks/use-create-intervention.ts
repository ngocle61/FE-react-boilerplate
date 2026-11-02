import { useMutation, useQueryClient } from '@tanstack/react-query';

import { interventionQueries } from '../queries/intervention.queries';
import { interventionService } from '../services/intervention.service';

export const useCreateIntervention = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: interventionService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: interventionQueries.all() }),
  });
};
