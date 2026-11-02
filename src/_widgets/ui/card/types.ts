import type { ComponentProps } from 'react';

import type { CARD_SIZES } from './constants';

export interface CardProps extends ComponentProps<'div'> {
  size?: (typeof CARD_SIZES)[keyof typeof CARD_SIZES];
}

export type CardHeaderProps = ComponentProps<'div'>;

export interface CardTitleProps extends ComponentProps<'h3'> {
  asChild?: boolean;
}

export type CardDescriptionProps = ComponentProps<'p'>;

export type CardActionProps = ComponentProps<'div'>;

export type CardContentProps = ComponentProps<'div'>;

export type CardFooterProps = ComponentProps<'div'>;
