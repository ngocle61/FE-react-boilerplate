import { cva } from 'class-variance-authority';

import { SWITCH_SIZES } from './constants';

export const switchVariants = cva(
  'peer group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-checked:bg-primary data-unchecked:bg-input data-disabled:cursor-not-allowed data-disabled:opacity-50',
  {
    variants: {
      size: {
        [SWITCH_SIZES.SM]: 'h-5 w-9',
        [SWITCH_SIZES.DEFAULT]: 'h-6 w-11',
      },
    },
    defaultVariants: {
      size: SWITCH_SIZES.DEFAULT,
    },
  },
);

export const switchThumbVariants = cva(
  'pointer-events-none block rounded-full bg-background shadow-default ring-0 transition-transform data-unchecked:translate-x-0.5',
  {
    variants: {
      size: {
        [SWITCH_SIZES.SM]: 'size-4 data-checked:translate-x-4',
        [SWITCH_SIZES.DEFAULT]: 'size-5 data-checked:translate-x-5',
      },
    },
    defaultVariants: {
      size: SWITCH_SIZES.DEFAULT,
    },
  },
);
