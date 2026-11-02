import type { z } from 'zod';

import type { zClientResponse, zClientsCreateBody, zClientsListQuery } from '../contract/zod.gen';

export type ClientDto = z.infer<typeof zClientResponse>;

export type ClientListRequestParams = z.input<typeof zClientsListQuery>;

export type CreateClientPayload = z.input<typeof zClientsCreateBody>;
