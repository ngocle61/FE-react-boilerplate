import { cva } from 'class-variance-authority';

import { SHEET_SIDES } from './constants';

export const sheetContentVariants = cva(
  'fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-toast transition duration-200 ease-in-out data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
  {
    variants: {
      side: {
        [SHEET_SIDES.TOP]:
          'inset-x-0 top-0 h-auto border-b border-border data-open:slide-in-from-top-10 data-closed:slide-out-to-top-10',
        [SHEET_SIDES.RIGHT]:
          'inset-y-0 right-0 h-full w-3/4 border-l border-border sm:max-w-sm data-open:slide-in-from-right-10 data-closed:slide-out-to-right-10',
        [SHEET_SIDES.BOTTOM]:
          'inset-x-0 bottom-0 h-auto border-t border-border data-open:slide-in-from-bottom-10 data-closed:slide-out-to-bottom-10',
        [SHEET_SIDES.LEFT]:
          'inset-y-0 left-0 h-full w-3/4 border-r border-border sm:max-w-sm data-open:slide-in-from-left-10 data-closed:slide-out-to-left-10',
      },
    },
    defaultVariants: {
      side: SHEET_SIDES.RIGHT,
    },
  },
);
