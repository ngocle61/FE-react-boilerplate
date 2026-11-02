import { Accordion as AccordionPrimitive } from 'radix-ui';

import type { AccordionContentProps } from './types';
import { cn } from '../../lib/cn';

export const AccordionContent = ({ className, children, ...props }: AccordionContentProps) => (
  <AccordionPrimitive.Content
    data-slot="accordion-content"
    className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
    {...props}
  >
    <div
      className={cn(
        'h-(--radix-accordion-content-height) pt-0 pb-3 text-muted-foreground [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4',
        className,
      )}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
);
