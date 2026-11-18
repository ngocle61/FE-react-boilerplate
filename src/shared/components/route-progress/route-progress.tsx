import { useTranslation } from 'react-i18next';
import { useNavigation } from 'react-router';

import { ROUTER_NAVIGATION_STATES } from '@/shared/constants/navigation-state.constant';

export const RouteProgress = () => {
  const { t } = useTranslation();
  const { state } = useNavigation();

  if (state === ROUTER_NAVIGATION_STATES.IDLE) return null;

  return (
    <div
      role="progressbar"
      aria-label={t('status.loading')}
      className="fixed inset-x-0 top-0 h-0.5 animate-pulse bg-primary"
    />
  );
};
