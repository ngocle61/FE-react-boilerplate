export const ROUTE_PATHS = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  DASHBOARD: '/dashboard',
  CHAT: '/chat',
  CALENDAR: '/calendar',
  INTERVENTION_CALL: '/calendar/interventions/:interventionId/call',
  USERS: '/admin/users',
} as const;

export const REDIRECT_SEARCH_PARAM = 'redirect';

export const CHAT_SEARCH_PARAMS = {
  INTERVENTION_ID: 'interventionId',
  LABEL: 'label',
} as const;
