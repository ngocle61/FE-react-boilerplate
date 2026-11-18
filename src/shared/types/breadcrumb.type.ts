import type { TranslationKey } from '@/core/types/language.type';

export interface BreadcrumbEntry {
  id: string;
  pathname: string;
  labelKey: TranslationKey;
}
