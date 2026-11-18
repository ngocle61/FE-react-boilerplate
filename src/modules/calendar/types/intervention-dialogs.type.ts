import type { InterventionRow } from './intervention-row.type';
import type { INTERVENTION_DIALOG_MODES } from '../constants/intervention-dialog.constant';

export type InterventionDialogTarget =
  | { mode: typeof INTERVENTION_DIALOG_MODES.CREATE }
  | { mode: typeof INTERVENTION_DIALOG_MODES.EDIT; intervention: InterventionRow };

export interface InterventionDialogsProps {
  target: Nullable<InterventionDialogTarget>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
