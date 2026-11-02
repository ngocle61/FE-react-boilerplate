import type { LoaderFunctionArgs } from 'react-router';

import { authConverter } from '@/core/converters/auth.converter';
import { queryClient } from '@/core/libs/query-client';
import { authQueries } from '@/core/queries/auth.queries';
import { accessTokenService } from '@/core/services/access-token.service';
import type { AccessRequirement } from '@/core/types/access.type';
import { isAccessGranted, resolvePermissions } from '@/core/utils/access.util';

export const createPrefetchLoader =
  (access: AccessRequirement, prefetch: (searchParams: URLSearchParams) => void) =>
  async ({ request }: LoaderFunctionArgs): Promise<null> => {
    if (!accessTokenService.read()) return null;

    const user = await queryClient.ensureQueryData(authQueries.currentUser()).catch(() => null);
    const permissions = resolvePermissions(user && authConverter.toAuthUser(user));
    if (isAccessGranted(permissions, access)) prefetch(new URL(request.url).searchParams);

    return null;
  };
