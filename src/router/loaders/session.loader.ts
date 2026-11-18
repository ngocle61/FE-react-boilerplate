import { queryClient } from '@/core/libs/query-client';
import { authQueries } from '@/core/queries/auth.queries';
import { accessTokenService } from '@/core/services/access-token.service';

export const sessionLoader = async (): Promise<null> => {
  if (accessTokenService.read()) await queryClient.prefetchQuery(authQueries.currentUser());
  return null;
};
