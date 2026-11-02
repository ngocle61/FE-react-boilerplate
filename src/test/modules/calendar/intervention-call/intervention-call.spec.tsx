import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { generatePath, MemoryRouter, Route, Routes } from 'react-router';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';
import { i18nReady } from '@/core/libs/i18n';
import type { InterventionDto } from '@/core/types/intervention.dto';
import { InterventionCallPage } from '@/modules/calendar/intervention-call/intervention-call';
import {
  createClientSummary,
  createInterventionDto,
  createTechnicianDto,
  toTechnicianSummary,
} from '@/test/fixtures/intervention.fixture';

const { get, toastSuccess, toastError } = vi.hoisted(() => ({
  get: vi.fn<(id: string) => Promise<InterventionDto>>(),
  toastSuccess: vi.fn(),
  toastError: vi.fn(),
}));

vi.mock('@/modules/calendar/services/intervention.service', () => ({
  interventionService: { get },
}));
vi.mock('sonner', () => ({ toast: { success: toastSuccess, error: toastError } }));

const renderCallPage = () =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter
        initialEntries={[
          generatePath(ROUTE_PATHS.INTERVENTION_CALL, { interventionId: 'intervention-1' }),
        ]}
      >
        <Routes>
          <Route path={ROUTE_PATHS.INTERVENTION_CALL} element={<InterventionCallPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );

beforeAll(() => i18nReady);

describe('InterventionCallPage', () => {
  beforeEach(() => {
    get.mockReset();
    toastSuccess.mockReset();
    toastError.mockReset();
  });

  it('shows the number to call with the schedule and the assigned technician', async () => {
    get.mockResolvedValue(
      createInterventionDto('intervention-1', {
        isUrgent: true,
        startsAt: new Date(2026, 9, 20, 9).toISOString(),
        technician: toTechnicianSummary(createTechnicianDto('tech-ann', 'Ann Tech')),
      }),
    );
    renderCallPage();

    expect(await screen.findByRole('link', { name: 'Call now' })).toHaveAttribute(
      'href',
      'tel:0901234567',
    );
    expect(screen.getByText('Urgent')).toBeInTheDocument();
    expect(screen.getByText('1 Main St, 70000, Saigon')).toBeInTheDocument();
    expect(screen.getByText('Ann Tech')).toBeInTheDocument();
    expect(screen.getByText(/09:00/)).toBeInTheDocument();
    expect(get).toHaveBeenCalledWith('intervention-1', expect.any(AbortSignal));
  });

  it('says when the intervention is not scheduled or assigned yet', async () => {
    get.mockResolvedValue(
      createInterventionDto('intervention-1', {
        client: createClientSummary('Acme', { addressLine: null, postalCode: null, city: null }),
      }),
    );
    renderCallPage();

    expect(await screen.findByText('Not scheduled yet')).toBeInTheDocument();
    expect(screen.getByText('Unassigned')).toBeInTheDocument();
  });

  it('copies the number and confirms it, or says when copying fails', async () => {
    get.mockResolvedValue(createInterventionDto('intervention-1'));
    const user = userEvent.setup();
    renderCallPage();
    const copyButton = await screen.findByRole('button', { name: 'Copy number' });

    await user.click(copyButton);
    expect(toastSuccess).toHaveBeenCalledWith('Phone number copied.');
    await expect(navigator.clipboard.readText()).resolves.toBe('0901 234 567');

    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('denied'));
    await user.click(copyButton);
    expect(toastError).toHaveBeenCalledWith('Could not copy the phone number.');
  });

  it('explains that there is nothing to call when the client has no phone', async () => {
    get.mockResolvedValue(
      createInterventionDto('intervention-1', {
        client: createClientSummary('Acme', { phone: null }),
      }),
    );
    renderCallPage();

    expect(await screen.findByText('No phone number')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Call now' })).not.toBeInTheDocument();
  });
});
