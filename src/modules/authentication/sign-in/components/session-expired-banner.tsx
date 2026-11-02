import { ClockAlertIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { Alert, AlertDescription, AlertTitle } from '@ui';

export const SessionExpiredBanner = () => {
  const { t } = useTranslation(I18N_NAMESPACES.AUTHENTICATION);

  return (
    <Alert>
      <ClockAlertIcon />
      <AlertTitle>{t('signIn.sessionExpiredTitle')}</AlertTitle>
      <AlertDescription>{t('signIn.sessionExpiredDescription')}</AlertDescription>
    </Alert>
  );
};
