import type { Metric } from 'web-vitals';

import { WEB_VITALS_CONTENT_TYPE, WEB_VITALS_LOG_LABEL } from '../constants/web-vitals.constant';
import type { WebVitalReport, WebVitalReporterOptions } from '../types/web-vitals.type';

export const toWebVitalReport = (
  { name, value, delta, rating, id, navigationType }: Metric,
  path: string,
): WebVitalReport => ({ name, value, delta, rating, id, navigationType, path });

export const createWebVitalReporter =
  ({ endpoint, log }: WebVitalReporterOptions) =>
  (metric: Metric): void => {
    const report = toWebVitalReport(metric, window.location.pathname);

    if (log) console.info(WEB_VITALS_LOG_LABEL, report.name, report.value, report.rating);

    if (endpoint) {
      navigator.sendBeacon(
        endpoint,
        new Blob([JSON.stringify(report)], { type: WEB_VITALS_CONTENT_TYPE }),
      );
    }
  };
