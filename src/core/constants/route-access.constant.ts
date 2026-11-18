import { PERMISSIONS } from './permissions.constant';
import type { AccessRequirement } from '../types/access.type';

export const ROUTE_ACCESS = {
  DASHBOARD: { permissions: [PERMISSIONS.DASHBOARD_VIEW] },
  CHAT: { permissions: [PERMISSIONS.CHAT_USE] },
  CALENDAR: { permissions: [PERMISSIONS.CALENDAR_VIEW] },
  USERS: { permissions: [PERMISSIONS.USER_MANAGE] },
} as const satisfies Record<string, AccessRequirement>;
