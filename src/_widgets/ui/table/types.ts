import type { ComponentProps } from 'react';

export interface TableProps extends ComponentProps<'table'> {
  containerClassName?: string;
}

export type TableHeaderProps = ComponentProps<'thead'>;

export type TableBodyProps = ComponentProps<'tbody'>;

export type TableFooterProps = ComponentProps<'tfoot'>;

export type TableRowProps = ComponentProps<'tr'>;

export type TableHeadProps = ComponentProps<'th'>;

export type TableCellProps = ComponentProps<'td'>;

export type TableCaptionProps = ComponentProps<'caption'>;

export type TableActionsHeadProps = ComponentProps<'th'>;

export type TableActionsCellProps = ComponentProps<'td'>;
