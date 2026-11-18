import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { sessionService } from '@/core/services/session.service';
import { getErrorMessage } from '@/core/utils/http-error.util';

import { signInService } from '../services/sign-in.service';

export const useSignIn = () => {
  const { t } = useTranslation(I18N_NAMESPACES.AUTHENTICATION);

  return useMutation({
    mutationFn: signInService.signIn,
    meta: { skipErrorToast: true },
    onSuccess: (session) => sessionService.start(session),
    onError: (error) =>
      toast.error(t('signIn.failedTitle'), { description: getErrorMessage(error) }),
  });
};
