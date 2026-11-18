import { cva } from 'class-variance-authority';

import { FIELD_ORIENTATIONS } from './constants';

export const fieldVariants = cva(
  'group/field flex w-full gap-2 data-[invalid=true]:text-destructive',
  {
    variants: {
      orientation: {
        [FIELD_ORIENTATIONS.VERTICAL]: 'flex-col *:w-full [&>.sr-only]:w-auto',
        [FIELD_ORIENTATIONS.HORIZONTAL]:
          'flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
        [FIELD_ORIENTATIONS.RESPONSIVE]:
          'flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
      },
    },
    defaultVariants: {
      orientation: FIELD_ORIENTATIONS.VERTICAL,
    },
  },
);
