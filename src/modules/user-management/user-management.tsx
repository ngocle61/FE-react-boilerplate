import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import {
  PageHeader,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from '@/shared/components/page-header/page-header';
import { useDialogTarget } from '@/shared/hooks/use-dialog-target';
import { useDisclosure } from '@/shared/hooks/use-disclosure';
import { usePaginatedQuery } from '@/shared/hooks/use-paginated-query';
import { useSearchParamsState } from '@/shared/hooks/use-search-params-state';
import { Flex, FLEX_DIRECTIONS } from '@ui';

import { UserManagementDialogs } from './components/user-management-dialogs/user-management-dialogs';
import { UserManagementTable } from './components/user-management-table/user-management-table';
import { UserManagementToolbar } from './components/user-management-toolbar/user-management-toolbar';
import { userFilterConverter } from './converters/user-filter.converter';
import { userConverter } from './converters/user.converter';
import { userManagementQueries } from './queries/user-management.queries';
import { userManagementSearchSchema } from './schema/user-management-search.schema';
import type { UserRow } from './types/user-row.type';

export const UserManagementPage = () => {
  const { t } = useTranslation([I18N_NAMESPACES.USER_MANAGEMENT, I18N_NAMESPACES.COMMON]);
  const { state: searchState, setState: setSearchState } = useSearchParamsState(
    userManagementSearchSchema,
  );
  const usersQuery = usePaginatedQuery({
    ...userManagementQueries.list(userFilterConverter.toListParams(searchState)),
    select: userConverter.toPage,
  });
  const createDialog = useDisclosure();
  const editDialog = useDialogTarget<UserRow>();

  return (
    <>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>{t('title')}</PageHeaderTitle>
          <PageHeaderDescription>{t('description')}</PageHeaderDescription>
        </PageHeaderContent>
      </PageHeader>
      <Flex direction={FLEX_DIRECTIONS.COL} gap={4} className="min-h-0 flex-1">
        <UserManagementToolbar onNewClick={createDialog.open} />
        <UserManagementTable
          users={usersQuery}
          page={searchState.page}
          onPageChange={(page) => setSearchState({ page })}
          onEditRequest={editDialog.open}
        />
      </Flex>
      <UserManagementDialogs
        isCreateOpen={createDialog.isOpen}
        onCreateOpenChange={createDialog.setIsOpen}
        editTarget={editDialog.target}
        isEditOpen={editDialog.isOpen}
        onEditOpenChange={editDialog.onOpenChange}
      />
    </>
  );
};
