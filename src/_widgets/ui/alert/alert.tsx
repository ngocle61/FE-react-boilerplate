import { ALERT_VARIANTS } from './constants';
import type { AlertProps } from './types';
import { toAlertRole } from './utils';
import { alertVariants } from './variant';
import { cn } from '../../lib/cn';

export const Alert = ({ className, variant = ALERT_VARIANTS.DEFAULT, ...props }: AlertProps) => (
  <div
    data-slot="alert"
    data-variant={variant}
    role={toAlertRole(variant ?? ALERT_VARIANTS.DEFAULT)}
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
);
