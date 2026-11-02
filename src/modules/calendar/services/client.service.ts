import { clientApi } from '@/core/apis/client.api';
import type { ClientDto, CreateClientPayload } from '@/core/types/client.dto';

export const clientService = {
  list: async (search?: string, signal?: AbortSignal): Promise<ClientDto[]> => {
    const { data } = await clientApi.list({ search: search || undefined }, signal);
    return data;
  },

  create: async (payload: CreateClientPayload): Promise<ClientDto> => {
    const { data } = await clientApi.create(payload);
    return data;
  },
};
