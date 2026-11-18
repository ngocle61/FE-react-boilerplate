import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userManagementQueries } from '../queries/user-management.queries';
import { userManagementService } from '../services/user-management.service';
import type { UpdateUserVariables } from '../types/user.type';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateUserVariables) => userManagementService.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userManagementQueries.all() }),
  });
};
