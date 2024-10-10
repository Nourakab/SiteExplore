export const getActiveFilterCount = (filters: {
  startDate: string | null;
  endDate: string | null;
  tags: string[];
  types: string[];
  countries: string[];
}) => {
  let count = 0;
  if (filters.startDate && filters.endDate) count += 1;
  count += filters.tags.length;
  count += filters.types.length;
  count += filters.countries.length;
  return count;
};

export const getTotalAppliedFilters = (filters: {
  startDate: string | null;
  endDate: string | null;
  tags: string[];
  types: string[];
  countries: string[];
}) => {
  const totalCount = getActiveFilterCount(filters);
  return totalCount > 0 ? `${totalCount} applied` : '';
};
