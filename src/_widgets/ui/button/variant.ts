import { cva } from 'class-variance-authority';

import { BUTTON_SIZES, BUTTON_VARIANTS } from './constants';

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        [BUTTON_VARIANTS.DEFAULT]:
          'bg-primary text-primary-foreground shadow-default hover:bg-primary/90',
        [BUTTON_VARIANTS.OUTLINE]:
          'border-input bg-background shadow-default hover:bg-accent hover:text-accent-foreground aria-expanded:bg-accent aria-expanded:text-accent-foreground',
        [BUTTON_VARIANTS.SECONDARY]:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary/80',
        [BUTTON_VARIANTS.GHOST]:
          'hover:bg-accent hover:text-accent-foreground aria-expanded:bg-accent aria-expanded:text-accent-foreground',
        [BUTTON_VARIANTS.DESTRUCTIVE]:
          'bg-destructive text-destructive-foreground shadow-default hover:bg-destructive/90 focus-visible:border-destructive focus-visible:ring-destructive/30',
        [BUTTON_VARIANTS.LINK]: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        [BUTTON_SIZES.XS]:
          "h-7 gap-1 rounded-md px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        [BUTTON_SIZES.SM]:
          'h-9 gap-1.5 rounded-md px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5',
        [BUTTON_SIZES.DEFAULT]:
          'h-button px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        [BUTTON_SIZES.LG]:
          'h-button px-6 text-md has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5',
        [BUTTON_SIZES.ICON_XS]: "size-7 rounded-md [&_svg:not([class*='size-'])]:size-3",
        [BUTTON_SIZES.ICON_SM]: 'size-9 rounded-md',
        [BUTTON_SIZES.ICON]: 'size-button',
      },
    },
    defaultVariants: {
      variant: BUTTON_VARIANTS.DEFAULT,
      size: BUTTON_SIZES.DEFAULT,
    },
  },
);
