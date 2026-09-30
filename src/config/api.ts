export const GITHUB_EVENTS_API_URL =
  'https://raw.githubusercontent.com/pogo-calendar/leak-duck/data/events.json';

export const getEventArchiveApiUrl = (year: number) =>
  `https://raw.githubusercontent.com/pogo-calendar/leak-duck/data/archives/archive_${year}.json`;

export const GITHUB_LAST_UPDATED_API_URL =
  'https://api.github.com/repos/pogo-calendar/leak-duck/commits?sha=data&path=events.json&page=1&per_page=1';

export const TIMEZONES_API_URL =
  'https://raw.githubusercontent.com/dmfilipenko/timezones.json/master/timezones.json';
