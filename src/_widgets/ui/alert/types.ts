import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import type { alertVariants } from './variant';

export type AlertVariant = NonNullable<VariantProps<typeof alertVariants>['variant']>;

export interface AlertProps extends ComponentProps<'div'>, VariantProps<typeof alertVariants> {}

export type AlertTitleProps = ComponentProps<'div'>;

export type AlertDescriptionProps = ComponentProps<'div'>;

export type AlertActionProps = ComponentProps<'div'>;
