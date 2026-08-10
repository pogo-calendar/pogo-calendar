import type { CalendarEvent } from '../types/events';

export const EVENT_ARCHIVE_START_YEAR = 2025;

export function getEventArchiveYears(
  currentYear = new Date().getFullYear()
): number[] {
  if (currentYear < EVENT_ARCHIVE_START_YEAR) return [];
  return Array.from(
    { length: currentYear - EVENT_ARCHIVE_START_YEAR + 1 },
    (_, index) => EVENT_ARCHIVE_START_YEAR + index
  );
}

export function mergeEventCollections(
  archivedEvents: CalendarEvent[],
  currentEvents: CalendarEvent[]
): CalendarEvent[] {
  const eventsById = new Map<string, CalendarEvent>();

  archivedEvents.forEach((event) => {
    eventsById.set(event.extendedProps.article_url, event);
  });
  currentEvents.forEach((event) => {
    eventsById.set(event.extendedProps.article_url, event);
  });

  return Array.from(eventsById.values());
}
