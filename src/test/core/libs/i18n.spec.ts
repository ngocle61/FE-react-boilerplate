import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { I18N_NAMESPACES, LANGUAGES } from '@/core/constants/language.constant';
import { STORAGE_KEYS } from '@/core/constants/storage-keys.constant';
import { changeLanguage, i18n, i18nReady, restoreStoredLanguage } from '@/core/libs/i18n';

beforeAll(() => i18nReady);

describe('i18n', () => {
  afterEach(async () => {
    vi.restoreAllMocks();
    await changeLanguage(LANGUAGES.EN);
  });

  it('switches language, loads its bundle, and remembers the choice', async () => {
    await changeLanguage(LANGUAGES.VI);

    expect(i18n.language).toBe(LANGUAGES.VI);
    expect(i18n.hasResourceBundle(LANGUAGES.VI, I18N_NAMESPACES.COMMON)).toBe(true);
    expect(localStorage.getItem(STORAGE_KEYS.LANGUAGE)).toBe(LANGUAGES.VI);
    expect(document.documentElement.lang).toBe(LANGUAGES.VI);
  });

  it('falls back to the default language when the stored one cannot be applied', async () => {
    const applyLanguage = i18n.changeLanguage.bind(i18n);
    vi.spyOn(i18n, 'changeLanguage').mockImplementation((language, ...rest) =>
      language === LANGUAGES.VI
        ? Promise.reject(new Error('chunk failed'))
        : applyLanguage(language, ...rest),
    );
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, LANGUAGES.VI);

    await restoreStoredLanguage();

    expect(i18n.language).toBe(LANGUAGES.EN);
    expect(localStorage.getItem(STORAGE_KEYS.LANGUAGE)).toBe(LANGUAGES.EN);
  });
});
