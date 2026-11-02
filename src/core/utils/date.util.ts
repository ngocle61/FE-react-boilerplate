export const formatTime = (date: Date, locale: string): string =>
  new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' }).format(date);

export const formatDate = (date: Date, locale: string): string =>
  new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date);
