import { BEARER_SCHEME } from '../constants/http.constant';

export const toBearerAuthorization = (accessToken: string): string =>
  `${BEARER_SCHEME} ${accessToken}`;
