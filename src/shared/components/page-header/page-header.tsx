import { cn, Flex, FLEX_ALIGNMENTS, FLEX_DIRECTIONS, FLEX_JUSTIFICATIONS } from '@ui';

import type { PageHeaderSlotProps } from './page-header.type';

export const PageHeader = ({ children, className }: PageHeaderSlotProps) => (
  <Flex
    align={FLEX_ALIGNMENTS.START}
    justify={FLEX_JUSTIFICATIONS.BETWEEN}
    gap={4}
    wrap
    className={className}
  >
    {children}
  </Flex>
);

export const PageHeaderContent = ({ children, className }: PageHeaderSlotProps) => (
  <Flex direction={FLEX_DIRECTIONS.COL} gap={1} className={cn('min-w-0', className)}>
    {children}
  </Flex>
);

export const PageHeaderTitle = ({ children, className }: PageHeaderSlotProps) => (
  <h1 className={cn('font-heading text-2xl font-semibold tracking-tight', className)}>
    {children}
  </h1>
);

export const PageHeaderDescription = ({ children, className }: PageHeaderSlotProps) => (
  <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
);

export const PageHeaderActions = ({ children, className }: PageHeaderSlotProps) => (
  <Flex align={FLEX_ALIGNMENTS.CENTER} gap={2} className={className}>
    {children}
  </Flex>
);
