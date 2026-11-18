export const ALERT_VARIANTS = {
  DEFAULT: 'default',
  DESTRUCTIVE: 'destructive',
  SUCCESS: 'success',
  WARNING: 'warning',
  INFO: 'info',
} as const;

export const ASSERTIVE_ALERT_VARIANTS = [
  ALERT_VARIANTS.DESTRUCTIVE,
  ALERT_VARIANTS.WARNING,
] as const;

export const ALERT_ROLES = {
  ALERT: 'alert',
  STATUS: 'status',
} as const;
