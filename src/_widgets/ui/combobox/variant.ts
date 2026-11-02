import { cva } from 'class-variance-authority';

export const comboboxTriggerVariants = cva(
  'flex h-input w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-left text-sm whitespace-nowrap shadow-default transition-[color,box-shadow,border-color] outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground',
);
