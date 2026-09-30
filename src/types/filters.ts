export interface Filters {
  searchTerm: string;
  selectedCategories: string[];
  startDate: Date | null;
  endDate: Date | null;
  timeRange: number[];
  showActiveOnly: boolean;
  pokemonSearch: string[];
  bonusSearch: string[];
}
