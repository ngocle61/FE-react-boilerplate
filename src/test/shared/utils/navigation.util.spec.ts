import { CalendarDaysIcon } from 'lucide-react';
import { describe, expect, it } from 'vitest';

import { PERMISSIONS } from '@/core/constants/permissions.constant';
import { ROLE_PERMISSIONS } from '@/core/constants/role-permissions.constant';
import { ROLES } from '@/core/constants/roles.constant';
import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';
import type { AccessChecker, Role } from '@/core/types/access.type';
import { isAccessGranted } from '@/core/utils/access.util';
import { NAVIGATION_GROUPS } from '@/shared/constants/navigation.constant';
import type { NavigationGroup } from '@/shared/types/navigation.type';
import {
  filterNavigationByAccess,
  findActiveNavigationHref,
  findFirstAccessibleHref,
  flattenNavigationItems,
  isNavigationParent,
  isNavigationPathActive,
  toNavigationHref,
} from '@/shared/utils/navigation.util';

const checkerFor =
  (role: Role): AccessChecker =>
  (requirement) =>
    isAccessGranted(ROLE_PERMISSIONS[role], requirement);

const hrefsFor = (role: Role) =>
  filterNavigationByAccess(NAVIGATION_GROUPS, checkerFor(role)).flatMap((group) =>
    group.items.map(toNavigationHref),
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

const SCHEDULE_LINK = {
  key: 'schedule',
  labelKey: 'navigation.items.calendar',
  href: '/planning',
  access: { permissions: [PERMISSIONS.CALENDAR_VIEW] },
} as const;

const TEAM_LINK = {
  key: 'team',
  labelKey: 'navigation.items.users',
  href: '/planning/team',
  access: { permissions: [PERMISSIONS.USER_MANAGE] },
} as const;

const PLANNING_GROUPS: NavigationGroup[] = [
  {
    key: 'planning',
    labelKey: 'navigation.groups.workspace',
    items: [
      {
        key: 'planning',
        labelKey: 'navigation.items.calendar',
        icon: CalendarDaysIcon,
        children: [TEAM_LINK, SCHEDULE_LINK],
      },
    ],
  },
];

describe('filterNavigationByAccess with nested entries', () => {
  it('keeps only the children the role may open', () => {
    const [group] = filterNavigationByAccess(PLANNING_GROUPS, checkerFor(ROLES.VIEWER));
    const [item] = group?.items ?? [];

    expect(item && isNavigationParent(item) && item.children).toEqual([SCHEDULE_LINK]);
  });

  it('links the parent to its first child the role may open', () => {
    const [group] = filterNavigationByAccess(PLANNING_GROUPS, checkerFor(ROLES.VIEWER));

    expect(group?.items.map(toNavigationHref)).toEqual([SCHEDULE_LINK.href]);
  });

  it('drops a parent left without children', () => {
    expect(filterNavigationByAccess(PLANNING_GROUPS, () => false)).toEqual([]);
  });

  it('finds the first accessible child as the home page', () => {
    expect(findFirstAccessibleHref(PLANNING_GROUPS, checkerFor(ROLES.ADMIN))).toBe(TEAM_LINK.href);
    expect(findFirstAccessibleHref(PLANNING_GROUPS, checkerFor(ROLES.VIEWER))).toBe(
      SCHEDULE_LINK.href,
    );
  });
});

describe('flattenNavigationItems', () => {
  it('lists every child as its own entry with the parent icon', () => {
    expect(flattenNavigationItems(PLANNING_GROUPS)).toEqual([
      { ...TEAM_LINK, icon: CalendarDaysIcon },
      { ...SCHEDULE_LINK, icon: CalendarDaysIcon },
    ]);
  });
});

describe('findActiveNavigationHref', () => {
  it.each([
    ['/planning', SCHEDULE_LINK.href],
    ['/planning/42', SCHEDULE_LINK.href],
    ['/planning/team/7', TEAM_LINK.href],
    ['/calendar', null],
  ])('picks the longest matching child for %s', (pathname, expected) => {
    expect(findActiveNavigationHref([SCHEDULE_LINK, TEAM_LINK], pathname)).toBe(expected);
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
