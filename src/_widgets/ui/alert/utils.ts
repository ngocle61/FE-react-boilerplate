import { ALERT_ROLES, ASSERTIVE_ALERT_VARIANTS } from './constants';
import type { AlertVariant } from './types';

export const toAlertRole = (variant: AlertVariant) =>
  (ASSERTIVE_ALERT_VARIANTS as readonly AlertVariant[]).includes(variant)
    ? ALERT_ROLES.ALERT
    : ALERT_ROLES.STATUS;
