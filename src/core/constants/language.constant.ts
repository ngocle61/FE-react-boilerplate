export const LANGUAGES = {
  EN: 'en',
  VI: 'vi',
} as const;

export const DEFAULT_LANGUAGE = LANGUAGES.EN;

export const I18N_NAMESPACES = {
  AUTHENTICATION: 'authentication',
  CALENDAR: 'calendar',
  CHAT: 'chat',
  COMMON: 'common',
  DASHBOARD: 'dashboard',
  ERRORS: 'errors',
  USER_MANAGEMENT: 'user-management',
} as const;

export const DEFAULT_NAMESPACE = I18N_NAMESPACES.COMMON;
