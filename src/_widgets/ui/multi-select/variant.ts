import { cva } from 'class-variance-authority';

export const multiSelectVariants = cva(
  'relative flex h-input w-full items-center gap-1 rounded-md border border-input bg-background pr-9 pl-3 text-left text-sm shadow-default transition-[color,box-shadow,border-color] has-[[data-slot=multi-select-trigger]:disabled]:opacity-50 has-[[data-slot=multi-select-trigger]:focus-visible]:border-ring has-[[data-slot=multi-select-trigger]:focus-visible]:ring-3 has-[[data-slot=multi-select-trigger]:focus-visible]:ring-ring/20 has-[[data-slot=multi-select-trigger][aria-invalid=true]]:border-destructive has-[[data-slot=multi-select-trigger][aria-invalid=true]]:ring-3 has-[[data-slot=multi-select-trigger][aria-invalid=true]]:ring-destructive/20',
);

export const multiSelectTriggerVariants = cva(
  'group/multi-select absolute inset-0 flex cursor-pointer items-center justify-end rounded-md px-3 outline-none disabled:cursor-not-allowed',
);

export const multiSelectValueVariants = cva(
  'pointer-events-none relative flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden',
);

export const multiSelectClearButtonVariants = cva(
  'pointer-events-auto relative inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40 [&>svg]:size-4',
);

export const multiSelectRemoveButtonVariants = cva(
  'pointer-events-auto inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40 [&>svg]:size-3',
);
