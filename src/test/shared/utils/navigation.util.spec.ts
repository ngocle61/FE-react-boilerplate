import { describe, expect, it } from 'vitest';

import { ROLE_PERMISSIONS } from '@/core/constants/role-permissions.constant';
import { ROLES } from '@/core/constants/roles.constant';
import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';
import type { AccessChecker, Role } from '@/core/types/access.type';
import { isAccessGranted } from '@/core/utils/access.util';
import { NAVIGATION_GROUPS } from '@/shared/constants/navigation.constant';
import {
  filterNavigationByAccess,
  findFirstAccessibleHref,
  isNavigationPathActive,
} from '@/shared/utils/navigation.util';

const checkerFor =
  (role: Role): AccessChecker =>
  (requirement) =>
    isAccessGranted(ROLE_PERMISSIONS[role], requirement);

const hrefsFor = (role: Role) =>
  filterNavigationByAccess(NAVIGATION_GROUPS, checkerFor(role)).flatMap((group) =>
    group.items.map((item) => item.href),
  );

describe('filterNavigationByAccess', () => {
  it('shows every module to admins', () => {
    expect(hrefsFor(ROLES.ADMIN)).toEqual([
      ROUTE_PATHS.DASHBOARD,
      ROUTE_PATHS.CHAT,
      ROUTE_PATHS.CALENDAR,
      ROUTE_PATHS.USERS,
    ]);
  });

  it('hides chat and administration from viewers', () => {
    expect(hrefsFor(ROLES.VIEWER)).toEqual([ROUTE_PATHS.DASHBOARD, ROUTE_PATHS.CALENDAR]);
  });

  it('drops groups left without items', () => {
    const groups = filterNavigationByAccess(NAVIGATION_GROUPS, checkerFor(ROLES.MEMBER));
    expect(groups.map((group) => group.key)).toEqual(['workspace']);
  });
});

describe('findFirstAccessibleHref', () => {
  it('returns null when nothing is accessible', () => {
    expect(findFirstAccessibleHref(NAVIGATION_GROUPS, () => false)).toBeNull();
  });

  it('returns the first accessible module', () => {
    expect(findFirstAccessibleHref(NAVIGATION_GROUPS, checkerFor(ROLES.VIEWER))).toBe(
      ROUTE_PATHS.DASHBOARD,
    );
  });
});

describe('isNavigationPathActive', () => {
  it.each([
    ['/calendar', '/calendar', true],
    ['/calendar/2026-09', '/calendar', true],
    ['/calendars', '/calendar', false],
  ])('matches %s against %s', (pathname, href, expected) => {
    expect(isNavigationPathActive(pathname, href)).toBe(expected);
  });
});
