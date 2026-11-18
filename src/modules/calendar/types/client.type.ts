import type { ClientDto } from '@/core/types/client.dto';

export type ClientOptionSource = Pick<ClientDto, 'id' | 'name'>;

export interface NewClientFields {
  name: string;
  phone: string;
  email: string;
}
