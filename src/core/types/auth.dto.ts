import type { z } from 'zod';

import type {
  zAuthRefreshTokenBody,
  zAuthSignInBody,
  zSignInResponse,
  zTokenPair,
} from '../contract/zod.gen';

export type SignInPayload = z.input<typeof zAuthSignInBody>;

export type RefreshTokenPayload = z.input<typeof zAuthRefreshTokenBody>;

export type TokenPairDto = z.infer<typeof zTokenPair>;

export type SignInResponseDto = z.infer<typeof zSignInResponse>;
