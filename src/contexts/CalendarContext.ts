import { createContext } from 'react';
import type { CalendarEvent, NewEventData } from '../types/events';
import type { Filters } from '../types/filters';

export interface CalendarContextType {
  loading: boolean;
  error: string | null;
  historyLoading: boolean;
  historyError: string | null;
  filters: Filters;
  setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
  handleResetFilters: () => void;
  setCurrentView: (view: string) => void;
  activeFilterCount: number;
  filteredEvents: CalendarEvent[];
  allEvents: CalendarEvent[];
  savedEventIds: string[];
  eventNotes: Record<string, string>;
  allCategories: string[];
  allPokemon: string[];
  allBonuses: string[];
  selectedEvent: CalendarEvent | null;
  setSelectedEvent: (event: CalendarEvent | null) => void;
  refetchEvents: () => Promise<void>;
  refetchHistory: () => Promise<void>;
  handleToggleSaveEvent: (eventId: string) => void;
  addEvent: (eventData: NewEventData) => void;
  updateEvent: (eventId: string, eventData: NewEventData) => void;
  deleteEvent: (eventId: string) => void;
  updateNote: (eventId: string, noteText: string) => void;
}

export const CalendarContext = createContext<CalendarContextType | undefined>(undefined);
