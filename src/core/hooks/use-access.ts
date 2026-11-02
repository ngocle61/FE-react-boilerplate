import { useAuthUser } from './use-auth-user';
import type { AccessRequirement } from '../types/access.type';
import { isAccessGranted, resolvePermissions } from '../utils/access.util';

export const useAccess = () => {
  const user = useAuthUser();

  const permissions = resolvePermissions(user);

  const can = (requirement: AccessRequirement) => isAccessGranted(permissions, requirement);

  return { role: user?.role ?? null, permissions, can };
};
