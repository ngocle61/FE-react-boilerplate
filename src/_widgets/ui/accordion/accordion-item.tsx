import { Accordion as AccordionPrimitive } from 'radix-ui';

import type { AccordionItemProps } from './types';
import { cn } from '../../lib/cn';

export const AccordionItem = ({ className, ...props }: AccordionItemProps) => (
  <AccordionPrimitive.Item
    data-slot="accordion-item"
    className={cn('border-border not-last:border-b', className)}
    {...props}
  />
);
