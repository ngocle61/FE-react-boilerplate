import type { CreateClientPayload } from '@/core/types/client.dto';

import type { ClientOptionSource, NewClientFields } from '../types/client.type';

export const clientConverter = {
  toOptions: (clients: readonly ClientOptionSource[]): ValueOption<string>[] =>
    clients.map((client) => ({ value: client.id, label: client.name })),

  toCreatePayload: (values: NewClientFields): CreateClientPayload => ({
    name: values.name,
    phone: values.phone || undefined,
    email: values.email || undefined,
  }),
};
