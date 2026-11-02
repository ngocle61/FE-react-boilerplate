const ENV_FLAG_ENABLED = 'true';

export const ENV = {
  APP_NAME: import.meta.env.VITE_APP_NAME || 'React Boilerplate',
  API_URL: import.meta.env.VITE_API_URL,
  WEB_VITALS_URL: import.meta.env.VITE_WEB_VITALS_URL || undefined,
  IS_DEV: import.meta.env.DEV,
} as const;

export const SHOW_DEMO_ACCOUNTS = import.meta.env.VITE_SHOW_DEMO_ACCOUNTS === ENV_FLAG_ENABLED;
