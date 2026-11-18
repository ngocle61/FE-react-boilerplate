import { ROLES } from '@/core/constants/roles.constant';
import type { Role } from '@/core/types/access.type';
import { BADGE_VARIANTS } from '@ui';

import type { BadgeVariant } from '../types/badge-variant.type';

export const USER_ROLES: readonly Role[] = [ROLES.ADMIN, ROLES.MEMBER, ROLES.VIEWER];

export const ROLE_BADGE_VARIANT: Record<Role, BadgeVariant> = {
  [ROLES.ADMIN]: BADGE_VARIANTS.DEFAULT,
  [ROLES.MEMBER]: BADGE_VARIANTS.INFO,
  [ROLES.VIEWER]: BADGE_VARIANTS.SECONDARY,
};
