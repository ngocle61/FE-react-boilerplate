import { ClockIcon, MapPinIcon, UserIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { cn, Flex, FLEX_ALIGNMENTS } from '@ui';

import { InterventionInfoRow } from './intervention-info-row';
import { InterventionStatusBadge } from './intervention-status-badge';
import {
  INTERVENTION_CARD_TITLE_ACTION_INSETS,
  INTERVENTION_CARD_VARIANTS,
} from '../constants/intervention-card.constant';
import { INTERVENTION_STATUS_DOT_COLOR } from '../constants/intervention-status.constant';
import type { InterventionCardBodyProps } from '../types/intervention-card.type';

export const InterventionCardBody = ({
  row,
  variant,
  timeRange,
  technicianLabel,
  actionCount,
}: InterventionCardBodyProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.CALENDAR);

  const titleRow = (
    <Flex
      align={FLEX_ALIGNMENTS.CENTER}
      className={cn('h-5 w-full shrink-0', INTERVENTION_CARD_TITLE_ACTION_INSETS[actionCount])}
    >
      <span className={cn('truncate font-medium text-foreground', row.isUrgent && 'ps-3.5')}>
        {row.type}
      </span>
    </Flex>
  );

  const timeRow = timeRange && (
    <InterventionInfoRow>
      <ClockIcon className="size-3 shrink-0" aria-hidden />
      <span className="truncate">{timeRange}</span>
    </InterventionInfoRow>
  );

  const technicianRow = technicianLabel && (
    <InterventionInfoRow>
      <UserIcon className="size-3 shrink-0" aria-hidden />
      <span className="truncate">{technicianLabel}</span>
    </InterventionInfoRow>
  );

  const clientRow = (
    <span className="h-4 w-full shrink-0 truncate font-medium text-foreground">
      {row.clientName}
    </span>
  );

  const statusRow = (
    <InterventionInfoRow className="gap-1.5">
      <span
        className={cn('size-1.5 shrink-0 rounded-full', INTERVENTION_STATUS_DOT_COLOR[row.status])}
        aria-hidden
      />
      <span className="truncate">{t(`status.${row.status}`)}</span>
    </InterventionInfoRow>
  );

  const addressRow = (
    <InterventionInfoRow>
      {row.clientAddress && (
        <>
          <MapPinIcon className="size-3 shrink-0" aria-hidden />
          <span className="truncate">{row.clientAddress}</span>
        </>
      )}
    </InterventionInfoRow>
  );

  switch (variant) {
    case INTERVENTION_CARD_VARIANTS.GRID:
      return (
        <>
          {titleRow}
          {timeRow}
          {technicianRow}
          {clientRow}
          {statusRow}
          {addressRow}
        </>
      );
    case INTERVENTION_CARD_VARIANTS.LIST:
      return (
        <>
          {titleRow}
          <InterventionStatusBadge status={row.status} />
          {timeRow}
          {clientRow}
          {addressRow}
          {technicianRow}
        </>
      );
  }
};
