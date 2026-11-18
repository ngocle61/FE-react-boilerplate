import { describe, expect, it } from 'vitest';

import { ACCESS_MODES } from '@/core/constants/access.constant';
import { PERMISSIONS } from '@/core/constants/permissions.constant';
import { ROLE_PERMISSIONS } from '@/core/constants/role-permissions.constant';
import { ROLES } from '@/core/constants/roles.constant';
import { isAccessGranted, resolvePermissions } from '@/core/utils/access.util';
import { createAuthUser } from '@/test/fixtures/auth-user.fixture';

describe('resolvePermissions', () => {
  it('returns nothing without a signed-in user', () => {
    expect(resolvePermissions(null)).toEqual([]);
  });

  it('falls back to the role policy', () => {
    expect(resolvePermissions(createAuthUser(ROLES.VIEWER))).toEqual(
      ROLE_PERMISSIONS[ROLES.VIEWER],
    );
  });

  it('prefers permissions issued by the backend', () => {
    const user = createAuthUser(ROLES.VIEWER, { permissions: [PERMISSIONS.CHAT_USE] });
    expect(resolvePermissions(user)).toEqual([PERMISSIONS.CHAT_USE]);
  });
});

describe('isAccessGranted', () => {
  const granted = [PERMISSIONS.DASHBOARD_VIEW, PERMISSIONS.CALENDAR_VIEW];

  it('grants an empty requirement', () => {
    expect(isAccessGranted([], { permissions: [] })).toBe(true);
  });

  it('requires every permission by default', () => {
    expect(
      isAccessGranted(granted, {
        permissions: [PERMISSIONS.CALENDAR_VIEW, PERMISSIONS.CALENDAR_MANAGE],
      }),
    ).toBe(false);
  });

  it('accepts any permission in any mode', () => {
    expect(
      isAccessGranted(granted, {
        permissions: [PERMISSIONS.CALENDAR_VIEW, PERMISSIONS.CALENDAR_MANAGE],
        mode: ACCESS_MODES.ANY,
      }),
    ).toBe(true);
  });
});
