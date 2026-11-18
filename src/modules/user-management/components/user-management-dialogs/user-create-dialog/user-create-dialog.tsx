import { Dialog, DialogContent } from '@ui';

import { UserCreateDialogBody } from './user-create-dialog-body';
import type { UserCreateDialogProps } from '../../../types/user-create-dialog.type';

export const UserCreateDialog = ({ open, onOpenChange }: UserCreateDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <UserCreateDialogBody onOpenChange={onOpenChange} />
    </DialogContent>
  </Dialog>
);
