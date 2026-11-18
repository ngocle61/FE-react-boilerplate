import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userManagementQueries } from '../queries/user-management.queries';
import { userManagementService } from '../services/user-management.service';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userManagementService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userManagementQueries.all() }),
  });
};
