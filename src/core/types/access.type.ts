import type { ACCESS_MODES } from '../constants/access.constant';
import type { PERMISSIONS } from '../constants/permissions.constant';
import type { ROLES } from '../constants/roles.constant';

export type Role = (typeof ROLES)[keyof typeof ROLES];

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export type AccessMode = (typeof ACCESS_MODES)[keyof typeof ACCESS_MODES];

export interface AccessRequirement {
  permissions: readonly Permission[];
  mode?: AccessMode;
}

export type AccessChecker = (requirement: AccessRequirement) => boolean;
