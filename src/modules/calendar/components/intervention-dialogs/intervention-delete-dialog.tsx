import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  BUTTON_VARIANTS,
  ICON_PLACEMENTS,
  Spinner,
} from '@ui';

import { useDeleteIntervention } from '../../hooks/use-delete-intervention';
import type { InterventionDeleteDialogProps } from '../../types/intervention-delete-dialog.type';

export const InterventionDeleteDialog = ({
  intervention,
  open,
  onOpenChange,
  onDeleted,
}: InterventionDeleteDialogProps) => {
  const { t } = useTranslation([I18N_NAMESPACES.CALENDAR, I18N_NAMESPACES.COMMON]);
  const deleteIntervention = useDeleteIntervention();

  const handleConfirm = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!intervention) return;
    deleteIntervention.mutate(intervention.id, {
      onSuccess: () => {
        toast.success(t('actions.deleteSuccess'));
        onOpenChange(false);
        onDeleted();
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('deleteDialog.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('deleteDialog.description', { client: intervention?.clientName })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteIntervention.isPending}>
            {t('common:actions.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            variant={BUTTON_VARIANTS.DESTRUCTIVE}
            disabled={deleteIntervention.isPending}
            onClick={handleConfirm}
          >
            {deleteIntervention.isPending && <Spinner data-icon={ICON_PLACEMENTS.INLINE_START} />}
            {t('deleteDialog.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
