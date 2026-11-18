import { PERMISSIONS } from './permissions.constant';
import { ROLES } from './roles.constant';
import type { Permission, Role } from '../types/access.type';

export const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  [ROLES.ADMIN]: Object.values(PERMISSIONS),
  [ROLES.MEMBER]: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.CHAT_USE,
    PERMISSIONS.CALENDAR_VIEW,
    PERMISSIONS.CALENDAR_MANAGE,
  ],
  [ROLES.VIEWER]: [PERMISSIONS.DASHBOARD_VIEW, PERMISSIONS.CALENDAR_VIEW],
};
