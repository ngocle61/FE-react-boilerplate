import type { AccessChecker } from '@/core/types/access.type';

import type {
  NavigationGroup,
  NavigationItem,
  NavigationLeafItem,
  NavigationLink,
  NavigationParentItem,
} from '../types/navigation.type';

export const isNavigationParent = (item: NavigationItem): item is NavigationParentItem =>
  'children' in item;

const filterItemByAccess = (item: NavigationItem, can: AccessChecker): Nullable<NavigationItem> => {
  if (!isNavigationParent(item)) return can(item.access) ? item : null;
  const children = item.children.filter((child) => can(child.access));
  return children.length > 0 ? { ...item, children } : null;
};

export const filterNavigationByAccess = (
  groups: readonly NavigationGroup[],
  can: AccessChecker,
): NavigationGroup[] =>
  groups
    .map((group) => ({
      ...group,
      items: group.items
        .map((item) => filterItemByAccess(item, can))
        .filter((item): item is NavigationItem => item !== null),
    }))
    .filter((group) => group.items.length > 0);

export const toNavigationLinks = (item: NavigationItem): readonly NavigationLink[] =>
  isNavigationParent(item) ? item.children : [item];

export const toNavigationHref = (item: NavigationItem): string =>
  toNavigationLinks(item)[0]?.href ?? '';

export const flattenNavigationItems = (groups: readonly NavigationGroup[]): NavigationLeafItem[] =>
  groups
    .flatMap((group) => group.items)
    .flatMap((item) =>
      isNavigationParent(item)
        ? item.children.map((child) => ({ ...child, icon: item.icon }))
        : [item],
    );

export const findFirstAccessibleHref = (
  groups: readonly NavigationGroup[],
  can: AccessChecker,
): Nullable<string> =>
  groups
    .flatMap((group) => group.items)
    .flatMap(toNavigationLinks)
    .find((link) => can(link.access))?.href ?? null;

export const isNavigationPathActive = (pathname: string, href: string): boolean =>
  pathname === href || pathname.startsWith(`${href}/`);

export const findActiveNavigationHref = (
  links: readonly NavigationLink[],
  pathname: string,
): Nullable<string> =>
  links
    .map((link) => link.href)
    .filter((href) => isNavigationPathActive(pathname, href))
    .reduce<Nullable<string>>(
      (longest, href) => (longest && longest.length >= href.length ? longest : href),
      null,
    );
