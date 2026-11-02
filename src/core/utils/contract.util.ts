import type { z } from 'zod';

import { toContractHttpError } from './http-error.util';

export const parseContract = <TSchema extends z.ZodType>(
  schema: TSchema,
  data: unknown,
  status: number,
): z.output<TSchema> => {
  const result = schema.safeParse(data);
  if (!result.success) throw toContractHttpError(status, result.error);
  return result.data;
};
