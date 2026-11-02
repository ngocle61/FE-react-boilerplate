import { useMutation, useQueryClient } from '@tanstack/react-query';

import { clientQueries } from '../queries/client.queries';
import { clientService } from '../services/client.service';

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clientService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: clientQueries.all() }),
  });
};
