import { useContext } from 'react';
import { PageFiltersContext } from '../contexts/PageFiltersContext';

export function usePageFiltersContext() {
  const context = useContext(PageFiltersContext);
  if (!context) {
    throw new Error('usePageFiltersContext must be used within a PageFiltersProvider');
  }
  return context;
}
