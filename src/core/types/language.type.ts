import type { ParseKeys } from 'i18next';

import type { DEFAULT_NAMESPACE, I18N_NAMESPACES, LANGUAGES } from '../constants/language.constant';

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

export type I18nNamespace = (typeof I18N_NAMESPACES)[keyof typeof I18N_NAMESPACES];

export type TranslationKey<TNamespace extends I18nNamespace = typeof DEFAULT_NAMESPACE> =
  ParseKeys<TNamespace>;

export type LocaleBundle = Record<string, unknown>;

export interface LocaleFileInfo {
  namespace: string;
  language: string;
}
