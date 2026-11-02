import type { UseFormSetError } from 'react-hook-form';
import type { z } from 'zod';

import type { ClientDto } from '@/core/types/client.dto';

import type { InterventionRow } from './intervention-row.type';
import type { Technician } from './technician.type';
import type { createInterventionFormSchema } from '../schema/intervention-form.schema';

export type InterventionFormValues = z.infer<ReturnType<typeof createInterventionFormSchema>>;

export interface InterventionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  intervention?: InterventionRow;
  technicians: Technician[];
  onDeleteRequest: (intervention: InterventionRow) => void;
}

export interface InterventionFormBodyProps {
  intervention?: InterventionRow;
  technicians: Technician[];
  onDeleteRequest: (intervention: InterventionRow) => void;
  onOpenChange: (open: boolean) => void;
}

export interface UseSubmitInterventionFormParams {
  interventionId?: string;
  setError: UseFormSetError<InterventionFormValues>;
  onClientCreated: (client: ClientDto) => void;
  onSuccess: () => void;
}
