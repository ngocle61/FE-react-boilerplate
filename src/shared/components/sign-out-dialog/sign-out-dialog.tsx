import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

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

import type { SignOutDialogProps } from './sign-out-dialog.type';

export const SignOutDialog = ({ open, onOpenChange, onConfirm, isPending }: SignOutDialogProps) => {
  const { t } = useTranslation();

  const handleConfirm = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onConfirm();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('signOut.title')}</AlertDialogTitle>
          <AlertDialogDescription>{t('signOut.description')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>{t('actions.cancel')}</AlertDialogCancel>
          <AlertDialogAction
            variant={BUTTON_VARIANTS.DESTRUCTIVE}
            disabled={isPending}
            onClick={handleConfirm}
          >
            {isPending && <Spinner data-icon={ICON_PLACEMENTS.INLINE_START} />}
            {t('signOut.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
