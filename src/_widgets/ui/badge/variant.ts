import { cva } from 'class-variance-authority';

import { BADGE_VARIANTS } from './constants';

export const badgeVariants = cva(
  'group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2.5 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&>svg]:pointer-events-none [&>svg]:size-3!',
  {
    variants: {
      variant: {
        [BADGE_VARIANTS.DEFAULT]: 'bg-primary text-primary-foreground [a]:hover:bg-primary/90',
        [BADGE_VARIANTS.SECONDARY]:
          'border-border bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80',
        [BADGE_VARIANTS.DESTRUCTIVE]:
          'border-error-border bg-error text-error-foreground [a]:hover:bg-error/80',
        [BADGE_VARIANTS.OUTLINE]:
          'border-border text-foreground [a]:hover:bg-accent [a]:hover:text-accent-foreground',
        [BADGE_VARIANTS.GHOST]: 'hover:bg-accent hover:text-accent-foreground',
        [BADGE_VARIANTS.LINK]: 'text-primary underline-offset-4 hover:underline',
        [BADGE_VARIANTS.SUCCESS]: 'border-success-border bg-success text-success-foreground',
        [BADGE_VARIANTS.WARNING]: 'border-warning-border bg-warning text-warning-foreground',
        [BADGE_VARIANTS.INFO]: 'border-info-border bg-info text-info-foreground',
      },
    },
    defaultVariants: {
      variant: BADGE_VARIANTS.DEFAULT,
    },
  },
);
