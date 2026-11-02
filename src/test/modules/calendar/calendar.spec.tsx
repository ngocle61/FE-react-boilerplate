import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns';
import { vi as viLocale } from 'date-fns/locale';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { INTERVENTION_STATUSES } from '@/core/constants/intervention.constant';
import { LANGUAGES } from '@/core/constants/language.constant';
import { ROLES } from '@/core/constants/roles.constant';
import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';
import { changeLanguage, i18nReady } from '@/core/libs/i18n';
import { queryClient } from '@/core/libs/query-client';
import type { InterventionDto } from '@/core/types/intervention.dto';
import { HttpError } from '@/core/utils/http-error.util';
import { CalendarPage } from '@/modules/calendar/calendar';
import type { InterventionQueryParams } from '@/modules/calendar/types/intervention.type';
import { resetSession, signInAs } from '@/test/fixtures/auth-session.fixture';
import {
  createClientSummary,
  createInterventionDto,
  createTechnicianDto,
  toTechnicianSummary,
} from '@/test/fixtures/intervention.fixture';
import { TooltipProvider } from '@ui';

const { list, createIntervention, listTechnicians, listClients, createClient } = vi.hoisted(() => ({
  list: vi.fn<(params: InterventionQueryParams) => Promise<InterventionDto[]>>(),
  createIntervention: vi.fn(),
  listTechnicians: vi.fn(),
  listClients: vi.fn(),
  createClient: vi.fn(),
}));

vi.mock('@/modules/calendar/services/intervention.service', () => ({
  interventionService: {
    list,
    create: createIntervention,
    update: vi.fn(),
    remove: vi.fn(),
    get: vi.fn(),
  },
}));
vi.mock('@/modules/calendar/services/technician.service', () => ({
  technicianService: { list: listTechnicians },
}));
vi.mock('@/modules/calendar/services/client.service', () => ({
  clientService: { list: listClients, create: createClient },
}));

const DAY = '2026-10-20';
const at = (hours: number, minutes = 0) => new Date(2026, 9, 20, hours, minutes).toISOString();

const ANN = createTechnicianDto('tech-ann', 'Ann Tech');
const BOB = createTechnicianDto('tech-bob', 'Bob Tech');

const SCHEDULED = [
  createInterventionDto('intervention-1', {
    client: createClientSummary('Acme'),
    technician: toTechnicianSummary(ANN),
    startsAt: at(9),
  }),
  createInterventionDto('intervention-2', {
    type: 'Inspection',
    client: createClientSummary('Globex'),
    technician: toTechnicianSummary(ANN),
    startsAt: at(9, 30),
    isUrgent: true,
  }),
  createInterventionDto('intervention-3', {
    client: createClientSummary('Initech', { phone: null }),
    technician: toTechnicianSummary(BOB),
    startsAt: at(14),
    durationMinutes: 90,
  }),
];

const UNSCHEDULED = [
  createInterventionDto('intervention-4', {
    status: INTERVENTION_STATUSES.TO_SCHEDULE,
    client: createClientSummary('Umbrella'),
  }),
];

const renderCalendar = (search = `?date=${DAY}`) => {
  signInAs(ROLES.MEMBER);
  const router = createMemoryRouter([{ path: ROUTE_PATHS.CALENDAR, element: <CalendarPage /> }], {
    initialEntries: [`${ROUTE_PATHS.CALENDAR}${search}`],
  });
  render(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>,
  );
  return router;
};

beforeAll(() => i18nReady);

describe('CalendarPage', () => {
  beforeEach(() => {
    list
      .mockReset()
      .mockImplementation((params) =>
        Promise.resolve(params.unscheduled ? UNSCHEDULED : SCHEDULED),
      );
    listTechnicians.mockReset().mockResolvedValue([ANN, BOB]);
    listClients.mockReset().mockResolvedValue([]);
    createClient.mockReset();
    createIntervention.mockReset();
  });

  afterEach(() => {
    resetSession();
  });

  it('shows one column per technician with their interventions for the day', async () => {
    renderCalendar();

    expect(await screen.findByText('Ann Tech')).toBeInTheDocument();
    expect(screen.getByText('Bob Tech')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Acme/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Globex/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Initech/ })).toBeInTheDocument();
    expect(list).toHaveBeenCalledWith(
      expect.objectContaining({ from: new Date(2026, 9, 20).toISOString() }),
      expect.anything(),
    );
  });

  it('merges every technician into one column in the combined view', async () => {
    const user = userEvent.setup();
    renderCalendar();
    expect(await screen.findAllByText('Ann Tech')).toHaveLength(1);

    await user.click(screen.getByRole('button', { name: 'Combined view' }));

    expect(screen.getAllByText('Ann Tech')).toHaveLength(2);
    expect(screen.getByRole('button', { name: /Initech/ })).toHaveTextContent('Bob Tech');
  });

  it('lists the interventions of each weekday in the week view', async () => {
    renderCalendar(`?date=${DAY}&view=week`);

    expect(await screen.findByRole('button', { name: /Acme/ })).toBeInTheDocument();
    expect(screen.getAllByText('No interventions')).toHaveLength(6);
  });

  it('opens an intervention from the month view for editing, then asks before deleting it', async () => {
    const user = userEvent.setup();
    renderCalendar(`?date=${DAY}&view=month`);

    await user.click(await screen.findByRole('button', { name: /Globex/ }));

    const sheet = await screen.findByRole('dialog', { name: 'Edit intervention' });
    expect(within(sheet).getByLabelText('Type')).toHaveValue('Inspection');
    expect(within(sheet).getByText('Status')).toBeInTheDocument();

    await user.click(within(sheet).getByRole('button', { name: 'Delete' }));

    expect(
      await screen.findByRole('alertdialog', { name: 'Delete intervention?' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/remove the intervention for Globex/)).toBeInTheDocument();
  });

  it('moves the date with the toolbar and goes back to today', async () => {
    const user = userEvent.setup();
    const router = renderCalendar();
    await screen.findByText('Ann Tech');

    await user.click(screen.getByRole('button', { name: 'Next' }));
    await waitFor(() => expect(router.state.location.search).toBe('?date=2026-10-21'));

    await user.click(screen.getByRole('button', { name: 'Previous' }));
    await waitFor(() => expect(router.state.location.search).toBe(`?date=${DAY}`));

    await user.click(screen.getByRole('button', { name: 'Today' }));
    await waitFor(() => expect(router.state.location.search).toBe(''));
  });

  it('shows the interventions waiting for a slot in the side panel', async () => {
    const user = userEvent.setup();
    renderCalendar();
    await screen.findByText('Ann Tech');

    await user.click(screen.getByRole('button', { name: /To schedule/ }));

    const panel = await screen.findByRole('dialog', { name: /To schedule/ });
    expect(within(panel).getByRole('button', { name: /Umbrella/ })).toBeInTheDocument();
  });

  it('drops the client error once the user switches to a new client and back', async () => {
    const user = userEvent.setup();
    renderCalendar();
    await screen.findByText('Ann Tech');

    await user.click(screen.getByRole('button', { name: 'New intervention' }));
    const sheet = await screen.findByRole('dialog', { name: 'New intervention' });
    await user.click(within(sheet).getByRole('button', { name: 'Create intervention' }));
    expect(
      await within(sheet).findByText('Select a client or create a new one.'),
    ).toBeInTheDocument();

    await user.click(within(sheet).getByRole('button', { name: 'Create a new client' }));
    await user.click(
      within(sheet).getByRole('button', { name: 'Choose an existing client instead' }),
    );

    expect(
      within(sheet).queryByText('Select a client or create a new one.'),
    ).not.toBeInTheDocument();
  });

  it('shows the intervention date in the language the user picked', async () => {
    const user = userEvent.setup();
    await changeLanguage(LANGUAGES.VI);
    renderCalendar(`?date=${DAY}&view=month`);

    try {
      await user.click(await screen.findByRole('button', { name: /Globex/ }));
      const sheet = await screen.findByRole('dialog');

      expect(
        within(sheet).getByText(format(new Date(2026, 9, 20), 'PP', { locale: viLocale })),
      ).toBeInTheDocument();
    } finally {
      await changeLanguage(LANGUAGES.EN);
    }
  });

  it('creates an intervention for a new client', async () => {
    const user = userEvent.setup();
    createClient.mockResolvedValue(createClientSummary('Hooli'));
    createIntervention.mockResolvedValue(createInterventionDto('intervention-5'));
    renderCalendar();
    await screen.findByText('Ann Tech');

    await user.click(screen.getByRole('button', { name: 'New intervention' }));
    const sheet = await screen.findByRole('dialog', { name: 'New intervention' });
    await user.click(within(sheet).getByRole('button', { name: 'Create intervention' }));

    expect(await within(sheet).findByText('Enter a type of intervention.')).toBeInTheDocument();
    expect(within(sheet).getByText('Select a client or create a new one.')).toBeInTheDocument();

    await user.click(within(sheet).getByRole('button', { name: 'Create a new client' }));
    await user.type(within(sheet).getByLabelText('Client name'), 'Hooli');
    await user.type(within(sheet).getByLabelText('Type'), 'Install');
    await user.click(within(sheet).getByRole('button', { name: 'Create intervention' }));

    await waitFor(() => expect(createIntervention).toHaveBeenCalledTimes(1));
    expect(createClient).toHaveBeenCalledWith(
      { name: 'Hooli', phone: undefined, email: undefined },
      expect.anything(),
    );
    expect(createIntervention.mock.calls[0]?.[0]).toMatchObject({
      clientId: 'client-hooli',
      type: 'Install',
      technicianId: null,
      startsAt: null,
    });
  });

  it('shows an error with a retry when the interventions cannot load', async () => {
    const user = userEvent.setup();
    list.mockRejectedValue(new HttpError({ messageKey: 'badRequest', status: 400 }));
    renderCalendar();

    expect(await screen.findByText('Unable to load data')).toBeInTheDocument();

    list.mockImplementation((params) =>
      Promise.resolve(params.unscheduled ? UNSCHEDULED : SCHEDULED),
    );
    await user.click(screen.getByRole('button', { name: 'Try again' }));

    expect(await screen.findByRole('button', { name: /Acme/ })).toBeInTheDocument();
  });
});
