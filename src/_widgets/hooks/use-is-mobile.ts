import { useSyncExternalStore } from 'react';

import { getIsMobileServerSnapshot, getIsMobileSnapshot, subscribeToMobileQuery } from './utils';

export const useIsMobile = () =>
  useSyncExternalStore(subscribeToMobileQuery, getIsMobileSnapshot, getIsMobileServerSnapshot);
