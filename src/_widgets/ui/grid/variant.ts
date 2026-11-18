import { cva } from 'class-variance-authority';

import { GRID_ALIGNMENTS, GRID_DEFAULT_COLUMNS, GRID_JUSTIFICATIONS } from './constants';

export const gridVariants = cva('grid', {
  variants: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      12: 'grid-cols-12',
    },
    gap: {
      0: 'gap-0',
      0.5: 'gap-0.5',
      1: 'gap-1',
      1.5: 'gap-1.5',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
    },
    align: {
      [GRID_ALIGNMENTS.START]: 'items-start',
      [GRID_ALIGNMENTS.CENTER]: 'items-center',
      [GRID_ALIGNMENTS.END]: 'items-end',
      [GRID_ALIGNMENTS.STRETCH]: 'items-stretch',
    },
    justify: {
      [GRID_JUSTIFICATIONS.START]: 'justify-start',
      [GRID_JUSTIFICATIONS.CENTER]: 'justify-center',
      [GRID_JUSTIFICATIONS.END]: 'justify-end',
      [GRID_JUSTIFICATIONS.BETWEEN]: 'justify-between',
      [GRID_JUSTIFICATIONS.AROUND]: 'justify-around',
      [GRID_JUSTIFICATIONS.EVENLY]: 'justify-evenly',
    },
  },
  defaultVariants: {
    cols: GRID_DEFAULT_COLUMNS,
  },
});
