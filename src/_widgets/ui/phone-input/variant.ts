import { cva } from 'class-variance-authority';

export const phoneInputVariants = cva(
  'flex h-input w-full items-stretch rounded-md border border-input bg-background shadow-default transition-[color,box-shadow,border-color] has-disabled:opacity-50 has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-3 has-[input:focus-visible]:ring-ring/20 has-[input[aria-invalid=true]]:border-destructive has-[input[aria-invalid=true]]:ring-3 has-[input[aria-invalid=true]]:ring-destructive/20',
);
