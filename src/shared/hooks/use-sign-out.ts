import { useMutation } from '@tanstack/react-query';

import { SESSION_END_REASONS } from '@/core/constants/session.constant';
import { authService } from '@/core/services/auth.service';
import { sessionService } from '@/core/services/session.service';

export const useSignOut = () =>
  useMutation({
    mutationFn: authService.signOut,
    meta: { skipErrorToast: true },
    onSettled: () => sessionService.end(SESSION_END_REASONS.SIGN_OUT),
  });
