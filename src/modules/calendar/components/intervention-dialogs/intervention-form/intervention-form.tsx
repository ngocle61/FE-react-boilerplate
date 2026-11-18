import { Sheet, SheetContent } from '@ui';

import { InterventionFormBody } from './intervention-form-body/intervention-form-body';
import { CREATE_FORM_KEY } from '../../../constants/intervention-form.constant';
import type { InterventionFormProps } from '../../../types/intervention-form.type';

export const InterventionForm = ({
  open,
  onOpenChange,
  intervention,
  technicians,
  onDeleteRequest,
}: InterventionFormProps) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent className="w-full gap-0 sm:max-w-md">
      <InterventionFormBody
        key={intervention?.id ?? CREATE_FORM_KEY}
        intervention={intervention}
        technicians={technicians}
        onDeleteRequest={onDeleteRequest}
        onOpenChange={onOpenChange}
      />
    </SheetContent>
  </Sheet>
);
