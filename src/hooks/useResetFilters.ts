import { useState } from 'react';

function useResetFilters(defaultFilters: {
  startDate: string | null;
  endDate: string | null;
  tags: string[];
  types: string[];
  countries: string[];
}) {
  const [startDate, setStartDate] = useState<string | null>(
    defaultFilters.startDate,
  );
  const [endDate, setEndDate] = useState<string | null>(defaultFilters.endDate);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    defaultFilters.tags,
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    defaultFilters.types,
  );
  const [selectedCountries, setSelectedCountries] = useState<string[]>(
    defaultFilters.countries,
  );

  const resetFilters = () => {
    setStartDate(defaultFilters.startDate);
    setEndDate(defaultFilters.endDate);
    setSelectedTags(defaultFilters.tags);
    setSelectedTypes(defaultFilters.types);
    setSelectedCountries(defaultFilters.countries);
  };

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedTags,
    setSelectedTags,
    selectedTypes,
    setSelectedTypes,
    selectedCountries,
    setSelectedCountries,
    resetFilters,
  };
}

export default useResetFilters;
