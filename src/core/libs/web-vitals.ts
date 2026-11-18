import { ENV } from '../constants/env.constant';
import { createWebVitalReporter } from '../utils/web-vitals.util';

export const startWebVitalsReporting = async (): Promise<void> => {
  if (!ENV.WEB_VITALS_URL && !ENV.IS_DEV) return;

  const { onCLS, onFCP, onINP, onLCP, onTTFB } = await import('web-vitals');
  const report = createWebVitalReporter({ endpoint: ENV.WEB_VITALS_URL, log: ENV.IS_DEV });

  [onCLS, onFCP, onINP, onLCP, onTTFB].forEach((observe) => observe(report));
};
