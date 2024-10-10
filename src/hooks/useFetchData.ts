import { useState, useEffect } from 'react';
import {
  getSitesWithPagination,
  getAllSites,
  getClients,
} from '../services/api';
import { Site } from '../types/Site';
import { Client } from '../types/Client';

export function useFetchData(page: number, limit: number) {
  const [clients, setClients] = useState<Client[]>([]); // Fetch and store clients
  const [sites, setSites] = useState<Site[]>([]);
  const [allSites, setAllSites] = useState<Site[]>([]); // Store all sites for global data
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch paginated data for sites
        const { data: sitesData, totalPages } = await getSitesWithPagination(
          page,
          limit,
        );
        setSites(sitesData); // Set paginated sites
        setTotalPages(totalPages);

        // Fetch all sites (for tags, countries, etc.)
        const allSitesData = await getAllSites();
        setAllSites(allSitesData); // Set all available sites

        // Fetch clients
        const clientsData = await getClients(); // Fetch all clients
        setClients(clientsData); // Store clients

        setLoading(false);
      } catch (error: unknown) {
        setError(
          error instanceof Error
            ? 'There was an issue loading the data. Please try again.'
            : 'An unexpected error occurred.',
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  return { clients, sites, allSites, totalPages, loading, error };
}
