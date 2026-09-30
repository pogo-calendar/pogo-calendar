import { createContext } from 'react';
import type { PageFilterState } from '../hooks/usePageFilters';
import type {
  EggPoolFilterOptions,
  EggPoolFilters,
  RaidBossFilterOptions,
  RaidBossFilters,
  ResearchTaskFilterOptions,
  ResearchTaskFilters,
  RocketLineupFilterOptions,
  RocketLineupFilters,
} from '../types/pageFilters';

export interface PageFiltersContextType {
  eggPool: PageFilterState<EggPoolFilters, EggPoolFilterOptions>;
  raidBoss: PageFilterState<RaidBossFilters, RaidBossFilterOptions>;
  researchTask: PageFilterState<ResearchTaskFilters, ResearchTaskFilterOptions>;
  rocketLineup: PageFilterState<RocketLineupFilters, RocketLineupFilterOptions>;
}

export const PageFiltersContext = createContext<PageFiltersContextType | undefined>(undefined);
