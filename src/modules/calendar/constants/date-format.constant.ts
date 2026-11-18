export const CALENDAR_DAY_LABEL_FORMAT: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

export const CALENDAR_WEEK_RANGE_FORMAT: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
};

export const CALENDAR_MONTH_LABEL_FORMAT: Intl.DateTimeFormatOptions = {
  month: 'long',
  year: 'numeric',
};

export const CLOCK_TIME_FORMAT: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
};

export const WEEKDAY_SHORT_FORMAT: Intl.DateTimeFormatOptions = { weekday: 'short' };

export const DAY_OF_MONTH_FORMAT: Intl.DateTimeFormatOptions = { day: 'numeric' };

export const WEEK_RANGE_SEPARATOR = ' – ';

export const DATE_PARAM_FORMAT = 'yyyy-MM-dd';

export const TIME_INPUT_FORMAT = 'HH:mm';
