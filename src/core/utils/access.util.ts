import { ACCESS_MODES } from '../constants/access.constant';
import { ROLE_PERMISSIONS } from '../constants/role-permissions.constant';
import type { AccessRequirement, Permission } from '../types/access.type';
import type { AuthUser } from '../types/auth.type';

export const resolvePermissions = (user: Nullable<AuthUser>): readonly Permission[] => {
  if (!user) return [];
  return user.permissions ?? ROLE_PERMISSIONS[user.role] ?? [];
};

export const isAccessGranted = (
  granted: readonly Permission[],
  { permissions, mode = ACCESS_MODES.ALL }: AccessRequirement,
): boolean => {
  if (permissions.length === 0) return true;
  if (mode === ACCESS_MODES.ANY) {
    return permissions.some((permission) => granted.includes(permission));
  }
  return permissions.every((permission) => granted.includes(permission));
};
