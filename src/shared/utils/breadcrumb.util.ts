import type { UIMatch } from 'react-router';

import type { RouteHandle } from '@/core/types/route-handle.type';

import type { BreadcrumbEntry } from '../types/breadcrumb.type';

const hasBreadcrumb = (match: UIMatch): match is UIMatch<unknown, Required<RouteHandle>> =>
  typeof match.handle === 'object' &&
  match.handle !== null &&
  'breadcrumb' in match.handle &&
  typeof match.handle.breadcrumb === 'string';

export const toBreadcrumbEntries = (matches: UIMatch[]): BreadcrumbEntry[] =>
  matches
    .filter(hasBreadcrumb)
    .map(({ id, pathname, handle }) => ({ id, pathname, labelKey: handle.breadcrumb }));
