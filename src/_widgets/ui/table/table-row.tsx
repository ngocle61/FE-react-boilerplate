import type { TableRowProps } from './types';
import { cn } from '../../lib/cn';

export const TableRow = ({ className, ...props }: TableRowProps) => (
  <tr
    data-slot="table-row"
    className={cn(
      'border-b border-border transition-colors [--table-row-bg:var(--card)] hover:bg-muted/50 hover:[--table-row-bg:color-mix(in_srgb,var(--muted)_50%,var(--card))] has-aria-expanded:bg-muted/50 has-aria-expanded:[--table-row-bg:color-mix(in_srgb,var(--muted)_50%,var(--card))] data-[state=selected]:bg-muted data-[state=selected]:[--table-row-bg:var(--muted)]',
      className,
    )}
    {...props}
  />
);
