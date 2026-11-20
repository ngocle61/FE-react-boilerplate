import { describe, expect, it } from 'vitest';

import {
  PERMISSION_ACTIONS,
  PERMISSION_SEPARATOR,
  PERMISSIONS,
} from '@/core/constants/permissions.constant';
import { ROLE_PERMISSIONS } from '@/core/constants/role-permissions.constant';
import type { Permission } from '@/core/types/access.type';

const toViewPermission = (permission: Permission): Maybe<Permission> => {
  const [resource] = permission.split(PERMISSION_SEPARATOR);
  const view = `${resource}${PERMISSION_SEPARATOR}${PERMISSION_ACTIONS.VIEW}`;
  return Object.values(PERMISSIONS).find((candidate) => candidate === view);
};

describe('ROLE_PERMISSIONS', () => {
  it.each(Object.entries(ROLE_PERMISSIONS))(
    'grants %s the view permission of every resource it may change',
    (_role, granted) => {
      const missing = granted
        .map(toViewPermission)
        .filter((view): view is Permission => view !== undefined && !granted.includes(view));

      expect(missing).toEqual([]);
    },
  );
});
