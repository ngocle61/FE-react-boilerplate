import {
  cn,
  Empty,
  EMPTY_MEDIA_VARIANTS,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@ui';

import type { StatusViewProps } from './status-view.type';

export const StatusView = ({
  icon: Icon,
  title,
  description,
  children,
  className,
}: StatusViewProps) => (
  <Empty className={cn('flex-1', className)}>
    <EmptyHeader>
      <EmptyMedia variant={EMPTY_MEDIA_VARIANTS.ICON}>
        <Icon />
      </EmptyMedia>
      <EmptyTitle>{title}</EmptyTitle>
      <EmptyDescription>{description}</EmptyDescription>
    </EmptyHeader>
    {children && <EmptyContent>{children}</EmptyContent>}
  </Empty>
);
