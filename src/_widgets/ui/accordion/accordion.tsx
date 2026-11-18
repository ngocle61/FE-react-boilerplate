import { Accordion as AccordionPrimitive } from 'radix-ui';

import type { AccordionProps } from './types';
import { cn } from '../../lib/cn';

export const Accordion = ({ className, ...props }: AccordionProps) => (
  <AccordionPrimitive.Root
    data-slot="accordion"
    className={cn('flex w-full flex-col', className)}
    {...props}
  />
);
