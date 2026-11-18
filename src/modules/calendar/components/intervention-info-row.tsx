import { cn, Flex, FLEX_ALIGNMENTS } from '@ui';

import type { InterventionInfoRowProps } from '../types/intervention-card.type';

export const InterventionInfoRow = ({ className, children }: InterventionInfoRowProps) => (
  <Flex
    asChild
    align={FLEX_ALIGNMENTS.CENTER}
    gap={1}
    className={cn('h-4 w-full shrink-0 text-muted-foreground', className)}
  >
    <span>{children}</span>
  </Flex>
);
