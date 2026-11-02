import type { Select as SelectPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import type { SELECT_TRIGGER_SIZES } from './constants';

export type SelectProps = ComponentProps<typeof SelectPrimitive.Root>;

export type SelectGroupProps = ComponentProps<typeof SelectPrimitive.Group>;

export type SelectValueProps = ComponentProps<typeof SelectPrimitive.Value>;

export interface SelectTriggerProps extends ComponentProps<typeof SelectPrimitive.Trigger> {
  size?: (typeof SELECT_TRIGGER_SIZES)[keyof typeof SELECT_TRIGGER_SIZES];
}

export type SelectContentProps = ComponentProps<typeof SelectPrimitive.Content>;

export type SelectLabelProps = ComponentProps<typeof SelectPrimitive.Label>;

export type SelectItemProps = ComponentProps<typeof SelectPrimitive.Item>;

export type SelectSeparatorProps = ComponentProps<typeof SelectPrimitive.Separator>;

export type SelectScrollUpButtonProps = ComponentProps<typeof SelectPrimitive.ScrollUpButton>;

export type SelectScrollDownButtonProps = ComponentProps<typeof SelectPrimitive.ScrollDownButton>;
