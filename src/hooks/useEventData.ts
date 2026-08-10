import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  fetchEventHistory,
  fetchEvents,
} from '../services/eventService';
import type { CalendarEvent } from '../types/events';
import { mergeEventCollections } from '../utils/eventHistoryUtils';

/**
 * Custom hook to fetch and manage calendar event data with loading and error states.
 *
 * @returns A custom hook to fetch and manage calendar event data with loading and error states.
 */
export function useEventData(timezone: string, showEventHistory: boolean) {
  const [currentEvents, setCurrentEvents] = useState<CalendarEvent[]>([]);
  const [archivedEvents, setArchivedEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const currentRequestIdRef = useRef(0);
  const historyRequestIdRef = useRef(0);

  const refetchCurrentEvents = useCallback(async () => {
    const requestId = ++currentRequestIdRef.current;
    setLoading(true);
    setError(null);
    try {
      const eventData = await fetchEvents(timezone);
      if (requestId === currentRequestIdRef.current) setCurrentEvents(eventData);
    } catch (err) {
      console.error('Error fetching events:', err);
      if (requestId === currentRequestIdRef.current) {
        setError('Failed to load event data. Please try again later.');
      }
      throw err;
    } finally {
      if (requestId === currentRequestIdRef.current) setLoading(false);
    }
  }, [timezone]);

  const refetchHistory = useCallback(async () => {
    if (!showEventHistory) return;

    const requestId = ++historyRequestIdRef.current;
    setHistoryLoading(true);
    setHistoryError(null);
    try {
      const eventData = await fetchEventHistory(timezone);
      if (requestId === historyRequestIdRef.current) {
        setArchivedEvents(eventData);
      }
    } catch (err) {
      console.error('Error fetching event history:', err);
      if (requestId === historyRequestIdRef.current) {
        setHistoryError('Historical events could not be loaded.');
      }
      throw err;
    } finally {
      if (requestId === historyRequestIdRef.current) setHistoryLoading(false);
    }
  }, [showEventHistory, timezone]);

  const refetch = useCallback(async () => {
    const requests: Promise<void>[] = [refetchCurrentEvents()];
    if (showEventHistory) requests.push(refetchHistory());
    await Promise.all(requests);
  }, [refetchCurrentEvents, refetchHistory, showEventHistory]);

  useEffect(() => {
    void refetchCurrentEvents().catch(() => undefined);
    return () => {
      currentRequestIdRef.current += 1;
    };
  }, [refetchCurrentEvents]);

  useEffect(() => {
    if (showEventHistory) {
      void refetchHistory().catch(() => undefined);
    } else {
      historyRequestIdRef.current += 1;
      setHistoryLoading(false);
      setHistoryError(null);
    }
    return () => {
      historyRequestIdRef.current += 1;
    };
  }, [refetchHistory, showEventHistory]);

  const allEvents = useMemo(
    () =>
      showEventHistory
        ? mergeEventCollections(archivedEvents, currentEvents)
        : currentEvents,
    [archivedEvents, currentEvents, showEventHistory]
  );

  return {
    allEvents,
    loading,
    error,
    historyLoading,
    historyError,
    refetch,
    refetchHistory,
  };
}
