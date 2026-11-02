import type authentication from '../../locale/authentication/en.json';
import type calendar from '../../locale/calendar/en.json';
import type chat from '../../locale/chat/en.json';
import type common from '../../locale/common/en.json';
import type dashboard from '../../locale/dashboard/en.json';
import type errors from '../../locale/errors/en.json';
import type userManagement from '../../locale/user-management/en.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      authentication: typeof authentication;
      calendar: typeof calendar;
      chat: typeof chat;
      common: typeof common;
      dashboard: typeof dashboard;
      errors: typeof errors;
      'user-management': typeof userManagement;
    };
  }
}
