import { useEffect, useState } from 'react';
import { Site } from '../types/Site';

// Hook to extract unique countries from sites data
export function useExtractCountries(sites: Site[]) {
  const [allCountries, setAllCountries] = useState<string[]>([]);

  useEffect(() => {
    const countries = sites
      .map((site) => site.address?.country) // Ensure address and country exist
      .filter((country): country is string => Boolean(country)); // Filter out undefined or null values

    const uniqueCountries = Array.from(new Set(countries)); // Remove duplicates
    setAllCountries(uniqueCountries); // Set the unique countries
  }, [sites]);

  return allCountries; // Return the list of unique countries
}
