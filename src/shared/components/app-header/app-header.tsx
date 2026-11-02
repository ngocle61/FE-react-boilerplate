import { Flex, FLEX_ALIGNMENTS, Separator, SEPARATOR_ORIENTATIONS, SidebarTrigger } from '@ui';

import { AppBreadcrumb } from './app-breadcrumb';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher';

export const AppHeader = () => (
  <Flex
    asChild
    align={FLEX_ALIGNMENTS.CENTER}
    gap={2}
    className="sticky top-0 h-14 shrink-0 border-b bg-background/80 px-4 backdrop-blur"
  >
    <header>
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation={SEPARATOR_ORIENTATIONS.VERTICAL}
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <AppBreadcrumb />
      <Flex align={FLEX_ALIGNMENTS.CENTER} gap={1} className="ml-auto">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </Flex>
    </header>
  </Flex>
);
