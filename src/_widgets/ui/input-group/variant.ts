import { cva } from 'class-variance-authority';

import { INPUT_GROUP_ADDON_ALIGNMENTS, INPUT_GROUP_BUTTON_SIZES } from './constants';

export const inputGroupVariants = cva(
  'group/input-group relative flex h-input w-full min-w-0 items-center rounded-md border border-input bg-background shadow-default transition-[color,box-shadow,border-color] outline-none has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/20 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5',
);

export const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-sm [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        [INPUT_GROUP_ADDON_ALIGNMENTS.INLINE_START]:
          'order-first pl-3 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]',
        [INPUT_GROUP_ADDON_ALIGNMENTS.INLINE_END]:
          'order-last pr-3 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]',
        [INPUT_GROUP_ADDON_ALIGNMENTS.BLOCK_START]:
          'order-first w-full justify-start px-3 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2',
        [INPUT_GROUP_ADDON_ALIGNMENTS.BLOCK_END]:
          'order-last w-full justify-start px-3 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2',
      },
    },
    defaultVariants: {
      align: INPUT_GROUP_ADDON_ALIGNMENTS.INLINE_START,
    },
  },
);

export const inputGroupButtonVariants = cva('flex items-center gap-2 text-sm shadow-none', {
  variants: {
    size: {
      [INPUT_GROUP_BUTTON_SIZES.XS]:
        "h-7 gap-1 rounded-sm px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
      [INPUT_GROUP_BUTTON_SIZES.SM]: 'h-8 gap-1.5 rounded-md px-2.5',
      [INPUT_GROUP_BUTTON_SIZES.ICON_XS]: 'size-7 rounded-sm p-0 has-[>svg]:p-0',
      [INPUT_GROUP_BUTTON_SIZES.ICON_SM]: 'size-8 rounded-md p-0 has-[>svg]:p-0',
    },
  },
  defaultVariants: {
    size: INPUT_GROUP_BUTTON_SIZES.XS,
  },
});

export const inputGroupControlClassName =
  'flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0';
