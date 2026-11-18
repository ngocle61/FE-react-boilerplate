import { generatePath } from 'react-router';

import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';
import { toChatPath } from '@/core/utils/chat-route.util';

import { CHAT_CONTEXT_LABEL_SEPARATOR } from '../constants/intervention-card.constant';
import type { InterventionRow } from '../types/intervention-row.type';

export const buildInterventionCallPath = (interventionId: string): string =>
  generatePath(ROUTE_PATHS.INTERVENTION_CALL, { interventionId });

export const buildInterventionChatPath = ({
  id,
  type,
  clientName,
}: Pick<InterventionRow, 'id' | 'type' | 'clientName'>): string =>
  toChatPath({ interventionId: id, label: [type, clientName].join(CHAT_CONTEXT_LABEL_SEPARATOR) });
