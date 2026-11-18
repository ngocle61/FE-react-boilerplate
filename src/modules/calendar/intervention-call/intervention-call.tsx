import { PhoneOffIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import {
  PageHeader,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from '@/shared/components/page-header/page-header';
import { QueryState } from '@/shared/components/query-state/query-state';
import { StatusView } from '@/shared/components/status-view/status-view';

import { useInterventionQuery } from '../hooks/use-intervention-query';
import { InterventionCallCard } from './components/intervention-call-card/intervention-call-card';

export const InterventionCallPage = () => {
  const { t } = useTranslation(I18N_NAMESPACES.CALENDAR);
  const { interventionId = '' } = useParams();
  const query = useInterventionQuery(interventionId);

  const row = query.data;

  return (
    <>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>{t('call.title')}</PageHeaderTitle>
          <PageHeaderDescription>{t('call.description')}</PageHeaderDescription>
        </PageHeaderContent>
      </PageHeader>
      <QueryState
        isLoading={query.isPending}
        isError={query.isError}
        isEmpty={!row?.clientPhone}
        onRetry={() => query.refetch()}
        empty={
          <StatusView
            icon={PhoneOffIcon}
            title={t('call.noPhoneTitle')}
            description={t('call.noPhoneDescription')}
            className="border"
          />
        }
      >
        {row && <InterventionCallCard row={row} />}
      </QueryState>
    </>
  );
};
