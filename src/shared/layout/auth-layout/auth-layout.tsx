import { Outlet } from 'react-router';

import { LanguageSwitcher } from '@/shared/components/language-switcher/language-switcher';
import { ThemeSwitcher } from '@/shared/components/theme-switcher/theme-switcher';
import { Flex, FLEX_ALIGNMENTS, FLEX_DIRECTIONS, FLEX_JUSTIFICATIONS, Grid } from '@ui';

import { AuthBrandPanel } from './auth-brand-panel';

export const AuthLayout = () => (
  <Flex direction={FLEX_DIRECTIONS.COL} className="flex-1 bg-muted">
    <Flex
      asChild
      align={FLEX_ALIGNMENTS.CENTER}
      justify={FLEX_JUSTIFICATIONS.END}
      gap={1}
      className="p-4"
    >
      <header>
        <LanguageSwitcher />
        <ThemeSwitcher />
      </header>
    </Flex>
    <Flex
      asChild
      align={FLEX_ALIGNMENTS.CENTER}
      justify={FLEX_JUSTIFICATIONS.CENTER}
      className="flex-1 px-4 pb-10 sm:px-6 md:px-10"
    >
      <main>
        <Grid className="w-full max-w-5xl overflow-hidden rounded-card border border-border bg-card shadow-card md:min-h-150 md:grid-cols-[5fr_6fr]">
          <AuthBrandPanel />
          <Flex
            direction={FLEX_DIRECTIONS.COL}
            justify={FLEX_JUSTIFICATIONS.CENTER}
            className="px-6 py-10 sm:px-10 md:px-14"
          >
            <Outlet />
          </Flex>
        </Grid>
      </main>
    </Flex>
  </Flex>
);
