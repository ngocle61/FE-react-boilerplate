import type { SignInPayload, SignInResponseDto } from '@/core/types/auth.dto';
import type { AuthSession } from '@/core/types/auth.type';

import type { SignInFormValues } from '../types/sign-in.type';

export const signInConverter = {
  toPayload: ({ email, password }: SignInFormValues): SignInPayload => ({
    email: email.toLowerCase(),
    password,
  }),

  toSession: ({ user, accessToken, refreshToken }: SignInResponseDto): AuthSession => ({
    user,
    tokens: { accessToken, refreshToken },
  }),
};
