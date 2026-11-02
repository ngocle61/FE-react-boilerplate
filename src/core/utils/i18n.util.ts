import { DEFAULT_LANGUAGE, LANGUAGES } from '../constants/language.constant';
import type { Language, LocaleBundle, LocaleFileInfo } from '../types/language.type';

const LOCALE_FILE_PATTERN = /\/locale\/([^/]+)\/([^/]+)\.json$/;

export const parseLocaleFile = (path: string): Nullable<LocaleFileInfo> => {
  const match = LOCALE_FILE_PATTERN.exec(path);
  return match ? { namespace: match[1], language: match[2] } : null;
};

export const groupByNamespace = (
  files: Record<string, LocaleBundle>,
): Record<string, LocaleBundle> =>
  Object.fromEntries(
    Object.entries(files).flatMap(([path, bundle]) => {
      const info = parseLocaleFile(path);
      return info ? [[info.namespace, bundle] as const] : [];
    }),
  );

export const isLanguage = (value: Nillable<string>): value is Language =>
  Object.values<string>(LANGUAGES).includes(value ?? '');

export const toLanguage = (value: Nillable<string>): Language =>
  isLanguage(value) ? value : DEFAULT_LANGUAGE;
