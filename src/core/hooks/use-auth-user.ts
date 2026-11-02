import { useCurrentUserQuery } from './use-current-user-query';
import type { AuthUser } from '../types/auth.type';

export const useAuthUser = (): Nullable<AuthUser> => useCurrentUserQuery().data ?? null;
