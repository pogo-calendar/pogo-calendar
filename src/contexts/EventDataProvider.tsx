import { useMemo, useState } from 'react';
import { useEventData } from '../hooks/useEventData';
import { useEventNotes } from '../hooks/useEventNotes';
import { useSettingsContext } from '../hooks/useSettingsContext';
import type { CalendarEvent } from '../types/events';
import { EventDataContext } from './EventDataContext';

export function EventDataProvider({ children }: { children: React.ReactNode }) {
  const { settings } = useSettingsContext();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const {
    allEvents: apiEvents,
    loading,
    error,
    historyLoading,
    historyError,
    refetch: refetchEvents,
    refetchHistory,
  } = useEventData(settings.timezone, settings.showEventHistory);
  const { eventNotes, updateNote } = useEventNotes();

  const value = useMemo(
    () => ({
      loading,
      error,
      historyLoading,
      historyError,
      allEvents: apiEvents,
      eventNotes,
      selectedEvent,
      setSelectedEvent,
      refetchEvents,
      refetchHistory,
      updateNote,
    }),
    [
      loading,
      error,
      historyLoading,
      historyError,
      apiEvents,
      eventNotes,
      selectedEvent,
      refetchEvents,
      refetchHistory,
      updateNote,
    ]
  );

  return (
    <EventDataContext.Provider value={value}>
      {children}
    </EventDataContext.Provider>
  );
}
