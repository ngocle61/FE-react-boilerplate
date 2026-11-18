import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import type { emptyMediaVariants } from './variant';

export type EmptyProps = ComponentProps<'div'>;

export type EmptyHeaderProps = ComponentProps<'div'>;

export interface EmptyMediaProps
  extends ComponentProps<'div'>, VariantProps<typeof emptyMediaVariants> {}

export type EmptyTitleProps = ComponentProps<'h2'>;

export type EmptyDescriptionProps = ComponentProps<'p'>;

export type EmptyContentProps = ComponentProps<'div'>;
