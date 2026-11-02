import { StarIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { Flex, FLEX_ALIGNMENTS } from '@ui';

import type { InterventionCardTooltipBodyProps } from '../types/intervention-card.type';

export const InterventionCardTooltipBody = ({
  row,
  timeRange,
  technicianLabel,
}: InterventionCardTooltipBodyProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.CALENDAR);

  return (
    <>
      {row.isUrgent && (
        <Flex asChild align={FLEX_ALIGNMENTS.CENTER} gap={1} className="font-semibold">
          <span>
            <StarIcon className="size-3 fill-urgent text-urgent" aria-hidden />
            {t('card.urgent')}
          </span>
        </Flex>
      )}
      <span className="font-semibold">{row.type}</span>
      <span className="text-background/80">{t(`status.${row.status}`)}</span>
      {timeRange && <span className="text-background/80">{timeRange}</span>}
      {technicianLabel && <span className="text-background/80">{technicianLabel}</span>}
      <span className="text-background/80">{row.clientName}</span>
      {row.clientPhone && <span className="text-background/80">{row.clientPhone}</span>}
    </>
  );
};
