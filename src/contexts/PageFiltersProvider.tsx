import { useMemo } from 'react';
import {
  countEggPoolFilters,
  countRaidBossFilters,
  countResearchTaskFilters,
  countRocketLineupFilters,
  defaultEggPoolFilters,
  defaultRaidBossFilters,
  defaultResearchTaskFilters,
  defaultRocketLineupFilters,
  emptyEggPoolOptions,
  emptyRaidBossOptions,
  emptyResearchTaskOptions,
  emptyRocketLineupOptions,
  usePageFilterState,
} from '../hooks/usePageFilters';
import { PageFiltersContext } from './PageFiltersContext';

export function PageFiltersProvider({ children }: { children: React.ReactNode }) {
  const eggPool = usePageFilterState(defaultEggPoolFilters, countEggPoolFilters, emptyEggPoolOptions);
  const raidBoss = usePageFilterState(defaultRaidBossFilters, countRaidBossFilters, emptyRaidBossOptions);
  const researchTask = usePageFilterState(
    defaultResearchTaskFilters,
    countResearchTaskFilters,
    emptyResearchTaskOptions
  );
  const rocketLineup = usePageFilterState(
    defaultRocketLineupFilters,
    countRocketLineupFilters,
    emptyRocketLineupOptions
  );

  const value = useMemo(
    () => ({ eggPool, raidBoss, researchTask, rocketLineup }),
    [eggPool, raidBoss, researchTask, rocketLineup]
  );

  return <PageFiltersContext.Provider value={value}>{children}</PageFiltersContext.Provider>;
}
