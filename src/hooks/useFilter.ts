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

  // Function to apply the filters to allSites
  const applyFilters = () => {
    let filtered = [...allSites];

    if (filters.startDate && filters.endDate) {
      filtered = filtered.filter((site) => {
        const createdAt = new Date(site.createdAt);
        const updatedAt = new Date(site.updatedAt);

        // Only convert to Date if filters.startDate and filters.endDate are not null
        const start = filters.startDate ? new Date(filters.startDate) : null;
        const end = filters.endDate ? new Date(filters.endDate) : null;

        const isWithinCreatedDateRange =
          start && end && createdAt >= start && createdAt <= end;
        const isWithinUpdatedDateRange =
          start && end && updatedAt >= start && updatedAt <= end;

        return isWithinCreatedDateRange || isWithinUpdatedDateRange;
      });
    }

    // Additional filtering logic for tags, type, country
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

    if (filters.country) {
      filtered = filtered.filter(
        (site) => site.address?.country === filters.country,
      );
    }

    return filtered;
  };

  // Only set filtered sites once allSites has been loaded
  useEffect(() => {
    if (!loading && allSites.length > 0) {
      setFilteredSites(applyFilters());
    }
  }, [allSites, loading]);

  // Update filteredSites when filters change (excluding allSites to avoid re-trigger)
  useEffect(() => {
    if (!loading) {
      const result = applyFilters();
      setFilteredSites(result);
    }
  }, [filters, loading]);

  return { filters, setFilters, filteredSites };
}
