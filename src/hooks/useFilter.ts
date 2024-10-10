import { useState, useEffect } from 'react';

export function useFilters(allSites: any[], loading: boolean) {
  const [filters, setFilters] = useState({
    startDate: null as string | null,
    endDate: null as string | null,
    tags: [] as string[],
    type: null as string | null,
    country: null as string | null,
  });

  const [filteredSites, setFilteredSites] = useState(allSites);

  // Define a filtering function
  const applyFilters = () => {
    let filtered = [...allSites];

    // Filter by date range
    if (filters.startDate || filters.endDate) {
      filtered = filtered.filter((site) => {
        const createdAt = new Date(site.createdAt);
        const start = filters.startDate ? new Date(filters.startDate) : null;
        const end = filters.endDate ? new Date(filters.endDate) : null;
        return (!start || createdAt >= start) && (!end || createdAt <= end);
      });
    }

    // Filter by tags
    if (filters.tags.length > 0) {
      filtered = filtered.filter((site) => {
        const siteTags = site.tags
          ? site.tags.map((tag: string) => tag.toLowerCase())
          : [];
        return filters.tags.some((filterTag) =>
          siteTags.includes(filterTag.toLowerCase()),
        );
      });
    }

    // Filter by type
    if (filters.type) {
      filtered = filtered.filter((site) => {
        const siteTags = site.tags
          ? site.tags.map((tag: string) => tag.toLowerCase())
          : [];
        return filters.type
          ? siteTags.includes(filters.type.toLowerCase())
          : false;
      });
    }

    // Filter by country
    if (filters.country) {
      filtered = filtered.filter(
        (site) => site.address?.country === filters.country,
      );
    }

    return filtered;
  };

  useEffect(() => {
    if (!loading) {
      const result = applyFilters();
      setFilteredSites(result);
    }
  }, [allSites, filters]);

  return { filters, setFilters, filteredSites };
}
