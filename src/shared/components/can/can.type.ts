import type { ReactNode } from 'react';

import type { AccessRequirement } from '@/core/types/access.type';

export interface CanProps extends AccessRequirement {
  children: ReactNode;
  fallback?: ReactNode;
}
