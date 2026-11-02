export const API_ENDPOINTS = {
  AUTH: {
    SIGN_IN: '/auth/sign-in',
    SIGN_OUT: '/auth/sign-out',
    REFRESH_TOKEN: '/auth/refresh-token',
  },
  USERS: {
    ME: '/users/me',
    TECHNICIANS: '/users/technicians',
    BASE: '/users',
    DETAIL: (id: string) => `/users/${id}`,
  },
  CLIENTS: {
    BASE: '/clients',
  },
  INTERVENTIONS: {
    BASE: '/interventions',
    DETAIL: (id: string) => `/interventions/${id}`,
  },
  CHAT: {
    CONVERSATION: '/chat/conversation',
    STREAM: '/chat/messages/stream',
  },
} as const;

export const PUBLIC_AUTH_ENDPOINTS: readonly string[] = [
  API_ENDPOINTS.AUTH.SIGN_IN,
  API_ENDPOINTS.AUTH.REFRESH_TOKEN,
];
