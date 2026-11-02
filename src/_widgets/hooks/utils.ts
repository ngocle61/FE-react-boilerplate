import { MOBILE_MEDIA_QUERY } from './constants';

export const subscribeToMobileQuery = (onChange: () => void) => {
  const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
  mediaQuery.addEventListener('change', onChange);
  return () => mediaQuery.removeEventListener('change', onChange);
};

export const getIsMobileSnapshot = () => window.matchMedia(MOBILE_MEDIA_QUERY).matches;

export const getIsMobileServerSnapshot = () => false;
