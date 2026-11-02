import { technicianApi } from '@/core/apis/technician.api';
import type { UserSummaryDto } from '@/core/types/user.dto';

export const technicianService = {
  list: async (signal?: AbortSignal): Promise<UserSummaryDto[]> => {
    const { data } = await technicianApi.list(signal);
    return data;
  },
};
