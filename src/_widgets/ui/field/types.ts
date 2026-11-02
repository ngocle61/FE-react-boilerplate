import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';

import type { FIELD_LEGEND_VARIANTS } from './constants';
import type { fieldVariants } from './variant';
import type { LabelProps } from '../label/types';

export type FieldErrorEntry = Maybe<{ message?: string }>;

export type FieldSetProps = ComponentProps<'fieldset'>;

export interface FieldLegendProps extends ComponentProps<'legend'> {
  variant?: (typeof FIELD_LEGEND_VARIANTS)[keyof typeof FIELD_LEGEND_VARIANTS];
}

export type FieldGroupProps = ComponentProps<'div'>;

export interface FieldProps extends ComponentProps<'div'>, VariantProps<typeof fieldVariants> {}

export type FieldContentProps = ComponentProps<'div'>;

export type FieldLabelProps = LabelProps;

export type FieldTitleProps = ComponentProps<'div'>;

export type FieldDescriptionProps = ComponentProps<'p'>;

export interface FieldSeparatorProps extends ComponentProps<'div'> {
  children?: ReactNode;
}

export interface FieldErrorProps extends ComponentProps<'div'> {
  errors?: FieldErrorEntry[];
}

export interface FieldErrorListProps {
  messages: string[];
}
