import { useAccess } from '@/core/hooks/use-access';

import type { CanProps } from './can.type';

export const Can = ({ permissions, mode, fallback = null, children }: CanProps) => {
  const { can } = useAccess();

  return can({ permissions, mode }) ? children : fallback;
};
