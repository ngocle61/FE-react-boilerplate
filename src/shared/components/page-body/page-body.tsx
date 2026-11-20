import { cn, Flex, FLEX_DIRECTIONS } from '@ui';

import type { PageBodyProps } from './page-body.type';

export const PageBody = ({ children, className }: PageBodyProps) => (
  <Flex direction={FLEX_DIRECTIONS.COL} gap={4} className={cn('min-h-0 flex-1', className)}>
    {children}
  </Flex>
);
