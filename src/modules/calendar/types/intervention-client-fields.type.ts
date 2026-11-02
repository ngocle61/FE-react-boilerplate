import type { ClientOptionSource } from './client.type';
import type { CLIENT_FIELDS_MODES } from '../constants/intervention-client-fields.constant';

export type ClientFieldsMode = (typeof CLIENT_FIELDS_MODES)[keyof typeof CLIENT_FIELDS_MODES];

export interface InterventionClientFieldsProps {
  pinnedClients: readonly ClientOptionSource[];
  mode: ClientFieldsMode;
  onModeChange: (mode: ClientFieldsMode) => void;
}
