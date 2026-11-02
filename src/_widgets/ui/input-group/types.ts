import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import type { inputGroupAddonVariants, inputGroupButtonVariants } from './variant';
import type { ButtonProps } from '../button/types';

export type InputGroupProps = ComponentProps<'div'>;

export interface InputGroupAddonProps
  extends ComponentProps<'div'>, VariantProps<typeof inputGroupAddonVariants> {}

export interface InputGroupButtonProps
  extends Omit<ButtonProps, 'size'>, VariantProps<typeof inputGroupButtonVariants> {}

export type InputGroupTextProps = ComponentProps<'span'>;

export type InputGroupInputProps = ComponentProps<'input'>;

export type InputGroupTextareaProps = ComponentProps<'textarea'>;
