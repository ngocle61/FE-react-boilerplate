import { apiClient } from './api-client';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { zClientResponse, zClientsListResponse } from '../contract/zod.gen';
import type { ClientDto, ClientListRequestParams, CreateClientPayload } from '../types/client.dto';

export const clientApi = {
  list: (params: ClientListRequestParams, signal?: AbortSignal) =>
    apiClient.get<ClientDto[]>(API_ENDPOINTS.CLIENTS.BASE, {
      params,
      signal,
      responseSchema: zClientsListResponse,
    }),

  create: (payload: CreateClientPayload) =>
    apiClient.post<ClientDto>(API_ENDPOINTS.CLIENTS.BASE, payload, {
      responseSchema: zClientResponse,
    }),
};
