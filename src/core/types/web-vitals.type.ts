import type { Metric } from 'web-vitals';

export interface WebVitalReport {
  name: Metric['name'];
  value: number;
  delta: number;
  rating: Metric['rating'];
  id: string;
  navigationType: Metric['navigationType'];
  path: string;
}

export interface WebVitalReporterOptions {
  endpoint?: string;
  log: boolean;
}
