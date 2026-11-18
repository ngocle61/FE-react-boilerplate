import type { Avatar as AvatarPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import type { AVATAR_SIZES } from './constants';

export interface AvatarProps extends ComponentProps<typeof AvatarPrimitive.Root> {
  size?: (typeof AVATAR_SIZES)[keyof typeof AVATAR_SIZES];
}

export type AvatarImageProps = ComponentProps<typeof AvatarPrimitive.Image>;

export type AvatarFallbackProps = ComponentProps<typeof AvatarPrimitive.Fallback>;

export type AvatarBadgeProps = ComponentProps<'span'>;

export type AvatarGroupProps = ComponentProps<'div'>;

export type AvatarGroupCountProps = ComponentProps<'div'>;
