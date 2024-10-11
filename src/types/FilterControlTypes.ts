export interface FilterControlProps {
  allTags: string[];
  allCountries: string[];
  allSites?: any[];
  loading?: boolean;
  onFilterChange: (filters: {
    startDate: string | null;
    endDate: string | null;
    tags: string[];
    types: string[];
    countries: string[];
  }) => void;
}
