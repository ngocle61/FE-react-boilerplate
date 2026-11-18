import { describe, expect, it } from 'vitest';

const ERROR_LOCALE_DIR = '../../locale/errors';

const errorLocales = import.meta.glob<Record<string, string>>('../../locale/errors/*.json', {
  eager: true,
  import: 'default',
});

const keysOf = (language: string) =>
  Object.keys(errorLocales[`${ERROR_LOCALE_DIR}/${language}.json`] ?? {}).sort();

describe('errors locale', () => {
  it('translates every English error key into Vietnamese', () => {
    expect(keysOf('en').length).toBeGreaterThan(0);
    expect(keysOf('vi')).toEqual(keysOf('en'));
  });
});
