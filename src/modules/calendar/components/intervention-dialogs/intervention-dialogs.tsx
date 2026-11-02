import { useDialogTarget } from '@/shared/hooks/use-dialog-target';

import { InterventionDeleteDialog } from './intervention-delete-dialog';
import { InterventionForm } from './intervention-form/intervention-form';
import { INTERVENTION_DIALOG_MODES } from '../../constants/intervention-dialog.constant';
import { useTechniciansQuery } from '../../hooks/use-technicians-query';
import type { InterventionDialogsProps } from '../../types/intervention-dialogs.type';
import type { InterventionRow } from '../../types/intervention-row.type';

export const InterventionDialogs = ({ target, open, onOpenChange }: InterventionDialogsProps) => {
  const deleteDialog = useDialogTarget<InterventionRow>();
  const techniciansQuery = useTechniciansQuery();

  return (
    <>
      <InterventionForm
        open={open}
        onOpenChange={onOpenChange}
        intervention={
          target?.mode === INTERVENTION_DIALOG_MODES.EDIT ? target.intervention : undefined
        }
        technicians={techniciansQuery.data ?? []}
        onDeleteRequest={deleteDialog.open}
      />
      <InterventionDeleteDialog
        intervention={deleteDialog.target}
        open={deleteDialog.isOpen}
        onOpenChange={deleteDialog.onOpenChange}
        onDeleted={() => onOpenChange(false)}
      />
    </>
  );
};
