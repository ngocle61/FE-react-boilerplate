import type { AccessChecker } from '@/core/types/access.type';

import type { NavigationGroup } from '../types/navigation.type';

export const filterNavigationByAccess = (
  groups: readonly NavigationGroup[],
  can: AccessChecker,
): NavigationGroup[] =>
  groups
    .map((group) => ({ ...group, items: group.items.filter((item) => can(item.access)) }))
    .filter((group) => group.items.length > 0);

export const findFirstAccessibleHref = (
  groups: readonly NavigationGroup[],
  can: AccessChecker,
): Nullable<string> =>
  groups.flatMap((group) => group.items).find((item) => can(item.access))?.href ?? null;

export const isNavigationPathActive = (pathname: string, href: string): boolean =>
  pathname === href || pathname.startsWith(`${href}/`);
