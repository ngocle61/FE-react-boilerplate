import { Navigate } from 'react-router';

import { useAccess } from '@/core/hooks/use-access';

import { NAVIGATION_GROUPS } from '../../constants/navigation.constant';
import { findFirstAccessibleHref } from '../../utils/navigation.util';
import { ForbiddenPage } from '../forbidden-page/forbidden-page';

export const HomeRedirect = () => {
  const { can } = useAccess();

  const href = findFirstAccessibleHref(NAVIGATION_GROUPS, can);

  if (!href) {
    return <ForbiddenPage />;
  }

  return <Navigate to={href} replace />;
};
