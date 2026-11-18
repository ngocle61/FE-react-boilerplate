import type { ComponentProps } from 'react';

import type { ButtonProps } from '../button/types';

export type PaginationProps = ComponentProps<'nav'>;

export type PaginationContentProps = ComponentProps<'ul'>;

export type PaginationItemProps = ComponentProps<'li'>;

export interface PaginationLinkProps extends ComponentProps<'a'>, Pick<ButtonProps, 'size'> {
  isActive?: boolean;
}

export interface PaginationStepProps extends PaginationLinkProps {
  text?: string;
}

export interface PaginationEllipsisProps extends ComponentProps<'span'> {
  label?: string;
}
