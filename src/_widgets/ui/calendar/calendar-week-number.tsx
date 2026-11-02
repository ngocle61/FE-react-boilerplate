import type { CalendarWeekNumberProps } from './types';
import { TABLE_HEAD_SCOPES } from '../table/constants';

export const CalendarWeekNumber = ({
  children,
  week: _week,
  ...props
}: CalendarWeekNumberProps) => (
  <th scope={TABLE_HEAD_SCOPES.ROW} {...props}>
    <div className="flex size-(--cell-size) items-center justify-center text-center">
      {children}
    </div>
  </th>
);
