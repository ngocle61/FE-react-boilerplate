import { cva } from 'class-variance-authority';

import { FLEX_ALIGNMENTS, FLEX_DIRECTIONS, FLEX_JUSTIFICATIONS } from './constants';

export const flexVariants = cva('flex', {
  variants: {
    direction: {
      [FLEX_DIRECTIONS.ROW]: 'flex-row',
      [FLEX_DIRECTIONS.COL]: 'flex-col',
      [FLEX_DIRECTIONS.ROW_REVERSE]: 'flex-row-reverse',
      [FLEX_DIRECTIONS.COL_REVERSE]: 'flex-col-reverse',
    },
    align: {
      [FLEX_ALIGNMENTS.START]: 'items-start',
      [FLEX_ALIGNMENTS.CENTER]: 'items-center',
      [FLEX_ALIGNMENTS.END]: 'items-end',
      [FLEX_ALIGNMENTS.STRETCH]: 'items-stretch',
      [FLEX_ALIGNMENTS.BASELINE]: 'items-baseline',
    },
    justify: {
      [FLEX_JUSTIFICATIONS.START]: 'justify-start',
      [FLEX_JUSTIFICATIONS.CENTER]: 'justify-center',
      [FLEX_JUSTIFICATIONS.END]: 'justify-end',
      [FLEX_JUSTIFICATIONS.BETWEEN]: 'justify-between',
      [FLEX_JUSTIFICATIONS.AROUND]: 'justify-around',
      [FLEX_JUSTIFICATIONS.EVENLY]: 'justify-evenly',
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
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },
  },
  defaultVariants: {
    direction: FLEX_DIRECTIONS.ROW,
  },
});
