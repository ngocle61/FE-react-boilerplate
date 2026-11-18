import { cva } from 'class-variance-authority';

import { ALERT_VARIANTS } from './constants';

export const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg border px-4 py-3 text-left text-sm has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-3 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        [ALERT_VARIANTS.DEFAULT]: 'border-border bg-card text-card-foreground',
        [ALERT_VARIANTS.DESTRUCTIVE]:
          'border-error-border bg-error text-error-foreground *:data-[slot=alert-description]:text-error-foreground/90',
        [ALERT_VARIANTS.SUCCESS]:
          'border-success-border bg-success text-success-foreground *:data-[slot=alert-description]:text-success-foreground/90',
        [ALERT_VARIANTS.WARNING]:
          'border-warning-border bg-warning text-warning-foreground *:data-[slot=alert-description]:text-warning-foreground/90',
        [ALERT_VARIANTS.INFO]:
          'border-info-border bg-info text-info-foreground *:data-[slot=alert-description]:text-info-foreground/90',
      },
    },
    defaultVariants: {
      variant: ALERT_VARIANTS.DEFAULT,
    },
  },
);
