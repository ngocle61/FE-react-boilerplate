import { interventionApi } from '@/core/apis/intervention.api';
import type {
  CreateInterventionPayload,
  InterventionDto,
  UpdateInterventionPayload,
} from '@/core/types/intervention.dto';
import { toBooleanQueryParam } from '@/core/utils/query-param.util';

import type { InterventionQueryParams } from '../types/intervention.type';

export const interventionService = {
  list: async (
    params: InterventionQueryParams,
    signal?: AbortSignal,
  ): Promise<InterventionDto[]> => {
    const { data } = await interventionApi.list(
      {
        from: params.from,
        to: params.to,
        technicianId: params.technicianId,
        status: params.status?.length ? params.status : undefined,
        unscheduled: toBooleanQueryParam(params.unscheduled),
        search: params.search,
      },
      signal,
    );
    return data;
  },

  get: async (id: string, signal?: AbortSignal): Promise<InterventionDto> => {
    const { data } = await interventionApi.get(id, signal);
    return data;
  },

  create: async (payload: CreateInterventionPayload): Promise<InterventionDto> => {
    const { data } = await interventionApi.create(payload);
    return data;
  },

  update: async (id: string, payload: UpdateInterventionPayload): Promise<InterventionDto> => {
    const { data } = await interventionApi.update(id, payload);
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await interventionApi.remove(id);
  },
};
