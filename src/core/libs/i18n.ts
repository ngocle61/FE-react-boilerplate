import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LANGUAGE, DEFAULT_NAMESPACE } from '../constants/language.constant';
import { STORAGE_KEYS } from '../constants/storage-keys.constant';
import type { Language, LocaleBundle } from '../types/language.type';
import { groupByNamespace, parseLocaleFile, toLanguage } from '../utils/i18n.util';

const defaultLocaleFiles = import.meta.glob<LocaleBundle>('../../locale/*/en.json', {
  eager: true,
  import: 'default',
});

const lazyLocaleFiles = import.meta.glob<LocaleBundle>(
  ['../../locale/*/*.json', '!../../locale/*/en.json'],
  { import: 'default' },
);

const defaultResources = groupByNamespace(defaultLocaleFiles);

const loadedLanguages = new Set<Language>([DEFAULT_LANGUAGE]);

export const ensureLanguageLoaded = async (language: Language): Promise<void> => {
  if (loadedLanguages.has(language)) return;

  const files = Object.entries(lazyLocaleFiles).filter(
    ([path]) => parseLocaleFile(path)?.language === language,
  );

  await Promise.all(
    files.map(async ([path, load]) => {
      const info = parseLocaleFile(path);
      if (!info) return;
      i18n.addResourceBundle(language, info.namespace, await load(), true, true);
    }),
  );

  loadedLanguages.add(language);
};

export const changeLanguage = async (language: Language): Promise<void> => {
  await ensureLanguageLoaded(language);
  await i18n.changeLanguage(language);
  localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
  document.documentElement.lang = language;
};

export const restoreStoredLanguage = (): Promise<void> =>
  changeLanguage(toLanguage(localStorage.getItem(STORAGE_KEYS.LANGUAGE))).catch(() =>
    changeLanguage(DEFAULT_LANGUAGE),
  );

export const i18nReady = i18n
  .use(initReactI18next)
  .init({
    resources: { [DEFAULT_LANGUAGE]: defaultResources },
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    defaultNS: DEFAULT_NAMESPACE,
    ns: Object.keys(defaultResources),
    partialBundledLanguages: true,
    interpolation: { escapeValue: false },
  })
  .then(restoreStoredLanguage);

export { i18n };
