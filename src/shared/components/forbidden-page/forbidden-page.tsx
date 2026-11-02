import { ArrowLeftIcon, ShieldXIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';
import { Button, BUTTON_VARIANTS, ICON_PLACEMENTS } from '@ui';

import { StatusView } from '../status-view/status-view';

export const ForbiddenPage = () => {
  const { t } = useTranslation();

  return (
    <StatusView
      icon={ShieldXIcon}
      title={t('status.forbidden.title')}
      description={t('status.forbidden.description')}
    >
      <Button asChild variant={BUTTON_VARIANTS.OUTLINE}>
        <Link to={ROUTE_PATHS.ROOT}>
          <ArrowLeftIcon data-icon={ICON_PLACEMENTS.INLINE_START} />
          {t('actions.goHome')}
        </Link>
      </Button>
    </StatusView>
  );
};
