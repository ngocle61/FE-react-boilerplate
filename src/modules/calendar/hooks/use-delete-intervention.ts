import { useMutation, useQueryClient } from '@tanstack/react-query';

import { interventionQueries } from '../queries/intervention.queries';
import { interventionService } from '../services/intervention.service';

export const useDeleteIntervention = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: interventionService.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: interventionQueries.all() }),
  });
};
