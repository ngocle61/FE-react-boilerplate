import type { Accordion as AccordionPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

export type AccordionProps = ComponentProps<typeof AccordionPrimitive.Root>;

export type AccordionItemProps = ComponentProps<typeof AccordionPrimitive.Item>;

export type AccordionTriggerProps = ComponentProps<typeof AccordionPrimitive.Trigger>;

export type AccordionContentProps = ComponentProps<typeof AccordionPrimitive.Content>;
