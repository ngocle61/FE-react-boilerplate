import { useEffect, useState } from 'react';

import { DEFAULT_DEBOUNCE_MS } from '../constants/debounce.constant';

export const useDebouncedValue = <TValue>(value: TValue, delay = DEFAULT_DEBOUNCE_MS): TValue => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
