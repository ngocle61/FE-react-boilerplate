import { FIELD_LEGEND_VARIANTS } from './constants';
import type { FieldLegendProps } from './types';
import { cn } from '../../lib/cn';

export const FieldLegend = ({
  className,
  variant = FIELD_LEGEND_VARIANTS.LEGEND,
  ...props
}: FieldLegendProps) => (
  <legend
    data-slot="field-legend"
    data-variant={variant}
    className={cn(
      'mb-1.5 font-medium text-foreground data-[variant=label]:text-sm data-[variant=legend]:text-base',
      className,
    )}
    {...props}
  />
);
