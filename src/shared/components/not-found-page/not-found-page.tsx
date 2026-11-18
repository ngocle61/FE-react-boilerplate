import { ArrowLeftIcon, SearchXIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';
import { Button, BUTTON_VARIANTS, ICON_PLACEMENTS } from '@ui';

import { StatusView } from '../status-view/status-view';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <StatusView
      icon={SearchXIcon}
      title={t('status.notFound.title')}
      description={t('status.notFound.description')}
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
