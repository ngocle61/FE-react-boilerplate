import { CARD_SIZES } from './constants';
import type { CardProps } from './types';
import { cn } from '../../lib/cn';

export const Card = ({ className, size = CARD_SIZES.DEFAULT, ...props }: CardProps) => (
  <div
    data-slot="card"
    data-size={size}
    className={cn(
      'group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-card border border-border bg-card py-(--card-spacing) text-sm text-card-foreground shadow-card [--card-spacing:--spacing(6)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(4)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-card *:[img:last-child]:rounded-b-card',
      className,
    )}
    {...props}
  />
);
