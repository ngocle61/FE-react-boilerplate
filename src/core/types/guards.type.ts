import type { ReactNode } from 'react';

import type { AccessRequirement } from './access.type';

export interface PermissionRouteProps extends AccessRequirement {
  fallback: ReactNode;
}
