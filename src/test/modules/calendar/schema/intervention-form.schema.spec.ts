import { beforeAll, describe, expect, it } from 'vitest';

import { INTERVENTION_STATUSES } from '@/core/constants/intervention.constant';
import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { i18n, i18nReady } from '@/core/libs/i18n';
import { INTERVENTION_FORM_DEFAULT_VALUES } from '@/modules/calendar/constants/intervention-form.constant';
import { createInterventionFormSchema } from '@/modules/calendar/schema/intervention-form.schema';

const createSchema = () =>
  createInterventionFormSchema(i18n.getFixedT(null, I18N_NAMESPACES.CALENDAR));

const VALID_VALUES = {
  ...INTERVENTION_FORM_DEFAULT_VALUES,
  clientId: 'client-1',
  type: 'Repair',
};

beforeAll(() => i18nReady);

describe('createInterventionFormSchema', () => {
  it('requires a date for a scheduled intervention', () => {
    const result = createSchema().safeParse({
      ...VALID_VALUES,
      status: INTERVENTION_STATUSES.SCHEDULED,
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(['startsAtDate']);
  });

  it('accepts a scheduled intervention with a date', () => {
    const result = createSchema().safeParse({
      ...VALID_VALUES,
      status: INTERVENTION_STATUSES.SCHEDULED,
      startsAtDate: new Date('2026-10-21T00:00:00.000Z'),
    });

    expect(result.success).toBe(true);
  });

  it('rejects a status the API does not know', () => {
    const result = createSchema().safeParse({ ...VALID_VALUES, status: 'ARCHIVED' });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(['status']);
  });

  it('asks for a client when neither an existing nor a new one is given', () => {
    const result = createSchema().safeParse({ ...VALID_VALUES, clientId: '' });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(['clientId']);
  });
});
