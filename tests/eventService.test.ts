import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getEventArchiveYears,
  mergeEventCollections,
} from '../src/utils/eventHistoryUtils.ts';
import type { CalendarEvent } from '../src/types/events.ts';

function event(id: string, title: string): CalendarEvent {
  return {
    title,
    start: '2025-01-01T10:00:00',
    end: '2025-01-01T11:00:00',
    extendedProps: {
      category: 'Event',
      article_url: id,
      banner_url: 'https://example.com/banner.png',
    },
  };
}

test('builds a continuous archive year range beginning in 2025', () => {
  assert.deepEqual(getEventArchiveYears(2024), []);
  assert.deepEqual(getEventArchiveYears(2025), [2025]);
  assert.deepEqual(getEventArchiveYears(2027), [2025, 2026, 2027]);
});

test('merges archived and current events with the current version winning', () => {
  const archivedOnly = event('archived', 'Archived event');
  const archivedDuplicate = event('duplicate', 'Old title');
  const currentDuplicate = event('duplicate', 'Updated title');
  const currentOnly = event('current', 'Current event');

  const merged = mergeEventCollections(
    [archivedOnly, archivedDuplicate],
    [currentDuplicate, currentOnly]
  );

  assert.deepEqual(
    merged.map(({ title }) => title),
    ['Archived event', 'Updated title', 'Current event']
  );
});
