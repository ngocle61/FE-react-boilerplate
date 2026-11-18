import { ROUTE_ACCESS } from '@/core/constants/route-access.constant';
import { queryClient } from '@/core/libs/query-client';
import { userFilterConverter } from '@/modules/user-management/converters/user-filter.converter';
import { userManagementQueries } from '@/modules/user-management/queries/user-management.queries';
import { userManagementSearchSchema } from '@/modules/user-management/schema/user-management-search.schema';
import { readSearchParams } from '@/shared/utils/search-params.util';

import { createPrefetchLoader } from './create-prefetch-loader';

export const userManagementLoader = createPrefetchLoader(ROUTE_ACCESS.USERS, (searchParams) => {
  const searchState = userManagementSearchSchema.parse(readSearchParams(searchParams));

  void queryClient.prefetchQuery(
    userManagementQueries.list(userFilterConverter.toListParams(searchState)),
  );
});
