import { LockKeyholeIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { SHOW_DEMO_ACCOUNTS } from '@/core/constants/env.constant';
import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { SESSION_END_REASONS } from '@/core/constants/session.constant';
import { useSessionEndReason } from '@/core/store/auth.store';
import { Flex, FLEX_ALIGNMENTS, FLEX_DIRECTIONS, FLEX_JUSTIFICATIONS } from '@ui';

import { DemoAccountsList } from './components/demo-accounts-list';
import { SessionExpiredBanner } from './components/session-expired-banner';
import { SignInForm } from './components/sign-in-form';

export const SignInPage = () => {
  const { t } = useTranslation(I18N_NAMESPACES.AUTHENTICATION);
  const endReason = useSessionEndReason();

  return (
    <Flex direction={FLEX_DIRECTIONS.COL} gap={8} className="mx-auto w-full max-w-md">
      <Flex asChild direction={FLEX_DIRECTIONS.COL} gap={2}>
        <header>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            {t('signIn.title')}
          </h1>
          <p className="text-sm text-muted-foreground">{t('signIn.description')}</p>
        </header>
      </Flex>
      {endReason === SESSION_END_REASONS.EXPIRED && <SessionExpiredBanner />}
      <SignInForm />
      <Flex
        asChild
        align={FLEX_ALIGNMENTS.CENTER}
        justify={FLEX_JUSTIFICATIONS.CENTER}
        gap={2}
        className="text-xs text-muted-foreground"
      >
        <p>
          <LockKeyholeIcon aria-hidden className="size-3.5 shrink-0" />
          {t('signIn.secureNote')}
        </p>
      </Flex>
      {SHOW_DEMO_ACCOUNTS && <DemoAccountsList />}
    </Flex>
  );
};
