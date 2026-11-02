import { format, parse, parseISO, setHours, startOfDay } from 'date-fns';

import { DEFAULT_INTERVENTION_START_HOUR } from '../constants/calendar.constant';
import { TIME_INPUT_FORMAT } from '../constants/date-format.constant';

export const combineDateAndTime = (date: Maybe<Date>, time: string): Nullable<string> => {
  if (!date) return null;

  const combined = time
    ? parse(time, TIME_INPUT_FORMAT, startOfDay(date))
    : setHours(startOfDay(date), DEFAULT_INTERVENTION_START_HOUR);
  return combined.toISOString();
};

export const splitDateAndTime = (iso: Nullable<string>): { date: Maybe<Date>; time: string } => {
  if (!iso) return { date: undefined, time: '' };

  const date = parseISO(iso);
  return { date, time: format(date, TIME_INPUT_FORMAT) };
};
