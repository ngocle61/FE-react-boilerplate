import { UserCreateDialog } from './user-create-dialog/user-create-dialog';
import { UserEditDialog } from './user-edit-dialog/user-edit-dialog';
import type { UserManagementDialogsProps } from '../../types/user-management-dialogs.type';

export const UserManagementDialogs = ({
  isCreateOpen,
  onCreateOpenChange,
  editTarget,
  isEditOpen,
  onEditOpenChange,
}: UserManagementDialogsProps) => (
  <>
    <UserCreateDialog open={isCreateOpen} onOpenChange={onCreateOpenChange} />
    <UserEditDialog user={editTarget} open={isEditOpen} onOpenChange={onEditOpenChange} />
  </>
);
