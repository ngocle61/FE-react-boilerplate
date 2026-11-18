import type { ReactNode } from 'react';

import type { InterventionRow } from './intervention-row.type';
import type { INTERVENTION_CARD_VARIANTS } from '../constants/intervention-card.constant';

export type InterventionCardVariant =
  (typeof INTERVENTION_CARD_VARIANTS)[keyof typeof INTERVENTION_CARD_VARIANTS];

export interface InterventionCardProps {
  row: InterventionRow;
  onSelect: (row: InterventionRow) => void;
  className?: string;
  draggable?: boolean;
  technicianLabel?: string;
  variant?: InterventionCardVariant;
  displayStart?: Date;
}

export interface InterventionCardBodyProps {
  row: InterventionRow;
  variant: InterventionCardVariant;
  timeRange: Nullable<string>;
  technicianLabel?: string;
  actionCount: number;
}

export interface InterventionCardTooltipBodyProps {
  row: InterventionRow;
  timeRange: Nullable<string>;
  technicianLabel?: string;
}

export interface InterventionInfoRowProps {
  className?: string;
  children?: ReactNode;
}

export interface InterventionCallLinkProps {
  interventionId: string;
}

export interface InterventionChatLinkProps {
  row: InterventionRow;
}

export interface TimeRangeParts {
  start: string;
  end: string;
}
