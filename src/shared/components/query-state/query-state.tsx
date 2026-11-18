import { RefreshCwIcon, TriangleAlertIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button, BUTTON_VARIANTS, Flex, FLEX_JUSTIFICATIONS, ICON_PLACEMENTS, Spinner } from '@ui';

import type { QueryStateProps } from './query-state.type';
import { QUERY_STATES } from '../../constants/query-state.constant';
import { resolveQueryState } from '../../utils/query-state.util';
import { StatusView } from '../status-view/status-view';

export const QueryState = ({
  isLoading,
  isError,
  isEmpty,
  onRetry,
  loading,
  empty,
  children,
}: QueryStateProps) => {
  const { t } = useTranslation();

  const state = resolveQueryState({
    isLoading,
    isError,
    isEmpty,
    hasEmptyNode: empty !== undefined,
  });

  if (state === QUERY_STATES.LOADING) {
    return (
      loading ?? (
        <Flex justify={FLEX_JUSTIFICATIONS.CENTER} className="py-12">
          <Spinner className="size-6 text-muted-foreground" />
        </Flex>
      )
    );
  }

  if (state === QUERY_STATES.ERROR) {
    return (
      <StatusView
        icon={TriangleAlertIcon}
        title={t('queryState.errorTitle')}
        description={t('queryState.errorDescription')}
      >
        {onRetry && (
          <Button variant={BUTTON_VARIANTS.OUTLINE} onClick={onRetry}>
            <RefreshCwIcon data-icon={ICON_PLACEMENTS.INLINE_START} />
            {t('actions.retry')}
          </Button>
        )}
      </StatusView>
    );
  }

  if (state === QUERY_STATES.EMPTY) {
    return empty;
  }

  return children;
};
