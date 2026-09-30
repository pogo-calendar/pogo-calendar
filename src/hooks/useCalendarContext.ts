import { useContext } from 'react';
import { CalendarContext } from '../contexts/CalendarContext';

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendarContext must be used within a CalendarProvider');
  }
  return context;
}
