import type { CalendarViewMode } from './calendar-view.type';

export interface CalendarToolbarProps {
  view: CalendarViewMode;
  onViewChange: (view: CalendarViewMode) => void;
  currentDate: Date;
  onNavigate: (direction: 1 | -1) => void;
  onToday: () => void;
  onNewClick: () => void;
  isCombinedView: boolean;
  onToggleCombinedView: () => void;
  unscheduledCount: number;
  isUnscheduledOpen: boolean;
  onToggleUnscheduled: () => void;
}
