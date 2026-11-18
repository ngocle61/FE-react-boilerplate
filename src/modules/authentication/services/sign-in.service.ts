import { authApi } from '@/core/apis/auth.api';
import type { AuthSession } from '@/core/types/auth.type';

import { signInConverter } from '../converters/sign-in.converter';
import type { SignInFormValues } from '../types/sign-in.type';

export const signInService = {
  signIn: async (values: SignInFormValues): Promise<AuthSession> => {
    const { data } = await authApi.signIn(signInConverter.toPayload(values));
    return signInConverter.toSession(data);
  },
};
