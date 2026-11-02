import { apiClient } from './api-client';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { zUsersListTechniciansResponse } from '../contract/zod.gen';
import type { UserSummaryDto } from '../types/user.dto';

export const technicianApi = {
  list: (signal?: AbortSignal) =>
    apiClient.get<UserSummaryDto[]>(API_ENDPOINTS.USERS.TECHNICIANS, {
      signal,
      responseSchema: zUsersListTechniciansResponse,
    }),
};
