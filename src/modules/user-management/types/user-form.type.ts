import type { z } from 'zod';

import type { createUserFormSchema } from '../schema/create-user-form.schema';
import type { editUserFormSchema } from '../schema/edit-user-form.schema';

export type CreateUserFormValues = z.infer<ReturnType<typeof createUserFormSchema>>;

export type EditUserFormValues = z.infer<ReturnType<typeof editUserFormSchema>>;
