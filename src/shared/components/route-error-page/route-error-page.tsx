import { RefreshCwIcon, TriangleAlertIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useRouteError } from 'react-router';

import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';
import { Button, BUTTON_VARIANTS, Flex, FLEX_JUSTIFICATIONS, ICON_PLACEMENTS } from '@ui';

import { ROUTE_ERROR_KINDS } from '../../constants/route-error.constant';
import { toRouteErrorKind } from '../../utils/route-error.util';
import { NotFoundPage } from '../not-found-page/not-found-page';
import { StatusView } from '../status-view/status-view';

export const RouteErrorPage = () => {
  const { t } = useTranslation();

  const kind = toRouteErrorKind(useRouteError());

  if (kind === ROUTE_ERROR_KINDS.NOT_FOUND) {
    return <NotFoundPage />;
  }

  const copyKey = kind === ROUTE_ERROR_KINDS.CHUNK_LOAD ? 'status.chunk' : 'status.error';

  return (
    <StatusView
      icon={TriangleAlertIcon}
      title={t(`${copyKey}.title`)}
      description={t(`${copyKey}.description`)}
    >
      <Flex justify={FLEX_JUSTIFICATIONS.CENTER} gap={2} wrap>
        <Button onClick={() => window.location.reload()}>
          <RefreshCwIcon data-icon={ICON_PLACEMENTS.INLINE_START} />
          {t('actions.reload')}
        </Button>
        <Button asChild variant={BUTTON_VARIANTS.OUTLINE}>
          <Link to={ROUTE_PATHS.ROOT}>{t('actions.goHome')}</Link>
        </Button>
      </Flex>
    </StatusView>
  );
};
