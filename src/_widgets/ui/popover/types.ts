import type { Popover as PopoverPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

export type PopoverProps = ComponentProps<typeof PopoverPrimitive.Root>;

export type PopoverTriggerProps = ComponentProps<typeof PopoverPrimitive.Trigger>;

export type PopoverAnchorProps = ComponentProps<typeof PopoverPrimitive.Anchor>;

export type PopoverContentProps = ComponentProps<typeof PopoverPrimitive.Content>;

export type PopoverHeaderProps = ComponentProps<'div'>;

export type PopoverTitleProps = ComponentProps<'h2'>;

export type PopoverDescriptionProps = ComponentProps<'p'>;
