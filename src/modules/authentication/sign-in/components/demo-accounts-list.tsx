import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import {
  Button,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  Flex,
  FLEX_DIRECTIONS,
  Grid,
  ICON_PLACEMENTS,
  Spinner,
} from '@ui';

import { DEMO_ACCOUNTS } from '../../constants/sign-in.constant';
import { useSignIn } from '../../hooks/use-sign-in';

export const DemoAccountsList = () => {
  const { t } = useTranslation([I18N_NAMESPACES.AUTHENTICATION, I18N_NAMESPACES.COMMON]);
  const headingId = useId();
  const { mutate: signIn, isPending, variables } = useSignIn();

  return (
    <Flex asChild direction={FLEX_DIRECTIONS.COL} gap={3} className="border-t border-border pt-6">
      <section aria-labelledby={headingId}>
        <Flex direction={FLEX_DIRECTIONS.COL} gap={1}>
          <h2 id={headingId} className="text-sm font-semibold text-foreground">
            {t('signIn.demo.title')}
          </h2>
          <p className="text-xs text-muted-foreground">{t('signIn.demo.description')}</p>
        </Flex>
        <Grid gap={2} className="sm:grid-cols-3">
          {DEMO_ACCOUNTS.map(({ role, email, password }) => (
            <Button
              key={email}
              variant={BUTTON_VARIANTS.OUTLINE}
              size={BUTTON_SIZES.SM}
              title={email}
              aria-label={t('signIn.demo.signInAs', { role: t(`common:roles.${role}`) })}
              disabled={isPending}
              onClick={() => signIn({ email, password })}
            >
              {isPending && variables?.email === email && (
                <Spinner data-icon={ICON_PLACEMENTS.INLINE_START} />
              )}
              {t(`common:roles.${role}`)}
            </Button>
          ))}
        </Grid>
      </section>
    </Flex>
  );
};
