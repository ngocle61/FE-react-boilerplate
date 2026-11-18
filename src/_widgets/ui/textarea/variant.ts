import { cva } from 'class-variance-authority';

export const textareaVariants = cva(
  'flex field-sizing-content min-h-24 w-full rounded-md border border-input bg-background px-3 py-2.5 text-md shadow-default transition-[color,box-shadow,border-color] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm',
);
