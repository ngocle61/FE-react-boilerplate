import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useTranslation } from 'react-i18next';
import { RouterProvider } from 'react-router/dom';

import { useApplyTheme } from '@/core/hooks/use-apply-theme';
import { queryClient } from '@/core/libs/query-client';
import { router } from '@/router/router';
import { Toaster, TOASTER_POSITIONS, TooltipProvider } from '@ui';

export const App = () => {
  const resolvedTheme = useApplyTheme();
  const { t } = useTranslation();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RouterProvider router={router} />
        <Toaster
          theme={resolvedTheme}
          position={TOASTER_POSITIONS.TOP_RIGHT}
          expand
          visibleToasts={5}
          closeLabel={t('actions.close')}
        />
      </TooltipProvider>
      {import.meta.env.DEV && <ReactQueryDevtools buttonPosition="bottom-left" />}
    </QueryClientProvider>
  );
};
