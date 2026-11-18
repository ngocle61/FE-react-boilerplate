import { apiClient } from './api-client';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { zInterventionResponse, zInterventionsListResponse } from '../contract/zod.gen';
import type {
  CreateInterventionPayload,
  InterventionDto,
  InterventionListRequestParams,
  UpdateInterventionPayload,
} from '../types/intervention.dto';

export const interventionApi = {
  list: (params: InterventionListRequestParams, signal?: AbortSignal) =>
    apiClient.get<InterventionDto[]>(API_ENDPOINTS.INTERVENTIONS.BASE, {
      params,
      signal,
      responseSchema: zInterventionsListResponse,
    }),

  get: (id: string, signal?: AbortSignal) =>
    apiClient.get<InterventionDto>(API_ENDPOINTS.INTERVENTIONS.DETAIL(id), {
      signal,
      responseSchema: zInterventionResponse,
    }),

  create: (payload: CreateInterventionPayload) =>
    apiClient.post<InterventionDto>(API_ENDPOINTS.INTERVENTIONS.BASE, payload, {
      responseSchema: zInterventionResponse,
    }),

  update: (id: string, payload: UpdateInterventionPayload) =>
    apiClient.patch<InterventionDto>(API_ENDPOINTS.INTERVENTIONS.DETAIL(id), payload, {
      responseSchema: zInterventionResponse,
    }),

  remove: (id: string) => apiClient.delete<void>(API_ENDPOINTS.INTERVENTIONS.DETAIL(id)),
};
