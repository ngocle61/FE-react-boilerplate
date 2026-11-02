import type { ClientOptionSource } from '../types/client.type';

export const uniqueClientsById = <TClient extends ClientOptionSource>(
  clients: readonly TClient[],
): TClient[] => [...new Map(clients.map((client) => [client.id, client])).values()];

export const toVisibleClients = (
  pinnedClients: readonly ClientOptionSource[],
  searchResults: readonly ClientOptionSource[],
  search: string,
): ClientOptionSource[] =>
  uniqueClientsById(search ? searchResults : [...pinnedClients, ...searchResults]);
