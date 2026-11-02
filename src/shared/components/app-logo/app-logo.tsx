import { BoxesIcon } from 'lucide-react';
import type { ComponentProps } from 'react';

import { cn, Flex, FLEX_ALIGNMENTS, FLEX_JUSTIFICATIONS } from '@ui';

export const AppLogo = ({ className }: Pick<ComponentProps<'div'>, 'className'>) => (
  <Flex
    aria-hidden
    align={FLEX_ALIGNMENTS.CENTER}
    justify={FLEX_JUSTIFICATIONS.CENTER}
    className={cn('size-8 shrink-0 rounded-lg bg-primary text-primary-foreground', className)}
  >
    <BoxesIcon className="size-4" />
  </Flex>
);
