import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Metric } from 'web-vitals';

import {
  WEB_VITALS_CONTENT_TYPE,
  WEB_VITALS_LOG_LABEL,
} from '@/core/constants/web-vitals.constant';
import { createWebVitalReporter, toWebVitalReport } from '@/core/utils/web-vitals.util';

const ENDPOINT = '/vitals';

const LCP_METRIC: Metric = {
  name: 'LCP',
  value: 1830,
  delta: 1830,
  rating: 'good',
  id: 'v5-1',
  entries: [],
  navigationType: 'navigate',
  navigationId: 1,
};

describe('web vitals util', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('keeps what a report needs and drops the raw performance entries', () => {
    expect(toWebVitalReport(LCP_METRIC, '/calendar')).toEqual({
      name: 'LCP',
      value: 1830,
      delta: 1830,
      rating: 'good',
      id: 'v5-1',
      navigationType: 'navigate',
      path: '/calendar',
    });
  });

  it('beacons the report as JSON to the configured endpoint', async () => {
    const sendBeacon = vi.fn<(url: string, data?: BodyInit) => boolean>(() => true);
    Object.defineProperty(navigator, 'sendBeacon', { value: sendBeacon, configurable: true });

    createWebVitalReporter({ endpoint: ENDPOINT, log: false })(LCP_METRIC);

    const [url, body] = sendBeacon.mock.calls[0] ?? [];
    expect(url).toBe(ENDPOINT);
    expect(body).toBeInstanceOf(Blob);
    expect((body as Blob).type).toBe(WEB_VITALS_CONTENT_TYPE);
    expect(JSON.parse(await (body as Blob).text())).toMatchObject({ name: 'LCP', value: 1830 });
  });

  it('only logs when no endpoint is configured', () => {
    const sendBeacon = vi.fn(() => true);
    Object.defineProperty(navigator, 'sendBeacon', { value: sendBeacon, configurable: true });
    const info = vi.spyOn(console, 'info').mockImplementation(() => undefined);

    createWebVitalReporter({ log: true })(LCP_METRIC);

    expect(info).toHaveBeenCalledWith(WEB_VITALS_LOG_LABEL, 'LCP', 1830, 'good');
    expect(sendBeacon).not.toHaveBeenCalled();
  });
});
