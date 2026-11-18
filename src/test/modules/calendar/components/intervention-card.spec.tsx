import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { INTERVENTION_STATUSES } from '@/core/constants/intervention.constant';
import { ROLES } from '@/core/constants/roles.constant';
import { i18nReady } from '@/core/libs/i18n';
import { queryClient } from '@/core/libs/query-client';
import type { Role } from '@/core/types/access.type';
import { toChatPath } from '@/core/utils/chat-route.util';
import { InterventionCard } from '@/modules/calendar/components/intervention-card';
import type { InterventionRow } from '@/modules/calendar/types/intervention-row.type';
import { signInAs } from '@/test/fixtures/auth-session.fixture';
import { TooltipProvider } from '@ui';

const ROW = {
  id: 'intervention-1',
  type: 'Repair',
  status: INTERVENTION_STATUSES.SCHEDULED,
  startsAt: null,
  endsAt: null,
  durationMinutes: 60,
  isUrgent: false,
  notes: null,
  clientName: 'Acme',
  clientPhone: '0901 234 567',
  clientAddress: null,
  technicianId: null,
  technicianName: null,
} as InterventionRow;

const CHAT_LINK_NAME = 'Discuss in AI Chat';
const CALL_LINK_NAME = 'Call client (opens in a new tab)';

const renderCard = (role: Role) => {
  signInAs(role);
  const onSelect = vi.fn();
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <TooltipProvider>
          <InterventionCard row={ROW} onSelect={onSelect} />
        </TooltipProvider>
      </MemoryRouter>
    </QueryClientProvider>,
  );
  return { onSelect, card: screen.getByRole('button', { name: /Repair/ }) };
};

beforeAll(() => i18nReady);

describe('InterventionCard', () => {
  it('keeps its links outside the selectable card', () => {
    const { card } = renderCard(ROLES.MEMBER);

    expect(within(card).queryAllByRole('link')).toHaveLength(0);
    expect(screen.getByRole('link', { name: CALL_LINK_NAME })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: CHAT_LINK_NAME })).toHaveAttribute(
      'href',
      toChatPath({ interventionId: ROW.id, label: 'Repair · Acme' }),
    );
  });

  it('selects the intervention with a click or the keyboard', async () => {
    const user = userEvent.setup();
    const { card, onSelect } = renderCard(ROLES.MEMBER);

    await user.click(card);
    card.focus();
    await user.keyboard('{Enter}');

    expect(onSelect).toHaveBeenCalledTimes(2);
    expect(onSelect).toHaveBeenCalledWith(ROW);
  });

  it('hides the chat link from roles without chat access', () => {
    renderCard(ROLES.VIEWER);

    expect(screen.queryByRole('link', { name: CHAT_LINK_NAME })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: CALL_LINK_NAME })).toBeInTheDocument();
  });
});
