import type { InterventionRow } from './intervention-row.type';

export interface InterventionDeleteDialogProps {
  intervention: Nullable<InterventionRow>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
}
