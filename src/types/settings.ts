export type ThemeMode = 'light' | 'dark';
export type ThemeSetting = ThemeMode | 'auto';
export type CalendarView = 'dayGridMonth' | 'listWeek';
export type CalendarViewSetting = 'auto' | CalendarView;

export interface Settings {
  theme: ThemeSetting;
  firstDay: number;
  timezone: string;
  hour12: boolean;
  showPokemonSprites: boolean;
  rotatePokemonSprites: boolean;
  showEventTimes: boolean;
  showEventHistory: boolean;
  defaultCalendarView: CalendarViewSetting;
}

export interface Timezone {
  value: string;
  text: string;
}
