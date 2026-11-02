import { LinkIcon, XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import {
  Button,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  Flex,
  FLEX_ALIGNMENTS,
  FLEX_JUSTIFICATIONS,
  ICON_PLACEMENTS,
} from '@ui';

import type { ChatContextBannerProps } from '../types/chat-context-banner.type';

export const ChatContextBanner = ({ label, onClear }: ChatContextBannerProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.CHAT);

  return (
    <Flex
      align={FLEX_ALIGNMENTS.CENTER}
      justify={FLEX_JUSTIFICATIONS.BETWEEN}
      gap={2}
      className="border-b border-border bg-muted/40 px-4 py-2 text-sm"
    >
      <Flex
        asChild
        align={FLEX_ALIGNMENTS.CENTER}
        gap={1.5}
        className="min-w-0 truncate text-muted-foreground"
      >
        <span>
          <LinkIcon className="size-3.5 shrink-0" aria-hidden />
          {t('contextLabel', { label })}
        </span>
      </Flex>
      <Button variant={BUTTON_VARIANTS.GHOST} size={BUTTON_SIZES.SM} onClick={onClear}>
        <XIcon data-icon={ICON_PLACEMENTS.INLINE_START} />
        {t('clearContext')}
      </Button>
    </Flex>
  );
};
