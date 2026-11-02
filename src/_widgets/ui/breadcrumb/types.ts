import type { ComponentProps } from 'react';

export type BreadcrumbProps = ComponentProps<'nav'>;

export type BreadcrumbListProps = ComponentProps<'ol'>;

export type BreadcrumbItemProps = ComponentProps<'li'>;

export interface BreadcrumbLinkProps extends ComponentProps<'a'> {
  asChild?: boolean;
}

export type BreadcrumbPageProps = ComponentProps<'span'>;

export type BreadcrumbSeparatorProps = ComponentProps<'li'>;

export interface BreadcrumbEllipsisProps extends ComponentProps<'span'> {
  label?: string;
}
