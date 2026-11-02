import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { useAuthUser } from '@/core/hooks/use-auth-user';
import {
  PageHeader,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from '@/shared/components/page-header/page-header';
import { Flex, FLEX_DIRECTIONS } from '@ui';

import { AccessOverviewCard } from './components/access-overview-card';
import { SessionCard } from './components/session-card';

export const DashboardPage = () => {
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD);
  const user = useAuthUser();

  return (
    <>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>{t('title', { name: user?.fullName })}</PageHeaderTitle>
          <PageHeaderDescription>{t('description')}</PageHeaderDescription>
        </PageHeaderContent>
      </PageHeader>
      <Flex direction={FLEX_DIRECTIONS.COL} gap={6} className="lg:flex-row">
        <div className="flex-1">
          <SessionCard />
        </div>
        <div className="flex-1">
          <AccessOverviewCard />
        </div>
      </Flex>
    </>
  );
};
