import { cva } from 'class-variance-authority';

import { EMPTY_MEDIA_VARIANTS } from './constants';

export const emptyMediaVariants = cva(
  'mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        [EMPTY_MEDIA_VARIANTS.DEFAULT]: 'bg-transparent',
        [EMPTY_MEDIA_VARIANTS.ICON]:
          "size-12 rounded-lg border border-border bg-card text-foreground shadow-default [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: EMPTY_MEDIA_VARIANTS.DEFAULT,
    },
  },
);
