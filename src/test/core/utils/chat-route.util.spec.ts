import { describe, expect, it } from 'vitest';

import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';
import { readChatRouteContext, toChatPath } from '@/core/utils/chat-route.util';

describe('chat route context', () => {
  it('round-trips the intervention context through the chat URL', () => {
    const path = toChatPath({ interventionId: 'intervention-1', label: 'Repair · Acme & Co' });
    const url = new URL(path, 'http://localhost');

    expect(url.pathname).toBe(ROUTE_PATHS.CHAT);
    expect(readChatRouteContext(url.searchParams)).toEqual({
      interventionId: 'intervention-1',
      label: 'Repair · Acme & Co',
    });
  });

  it('reads an empty context from a plain chat URL', () => {
    expect(readChatRouteContext(new URLSearchParams())).toEqual({
      interventionId: undefined,
      label: undefined,
    });
  });
});
