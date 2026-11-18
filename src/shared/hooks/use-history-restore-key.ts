import { useState } from 'react';
import { NavigationType, useLocation, useNavigationType } from 'react-router';

export const useHistoryRestoreKey = (): Nullable<string> => {
  const [restoreKey, setRestoreKey] = useState<Nullable<string>>(null);

  const { key } = useLocation();
  const navigationType = useNavigationType();

  if (navigationType === NavigationType.Pop && restoreKey !== key) setRestoreKey(key);

  return restoreKey;
};
