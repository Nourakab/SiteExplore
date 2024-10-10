import React, { useState, useEffect } from 'react';
import ClientList from '../../components/ClientList';
import ClientDropdown from '../../components/ClientDropdown'; // Import ClientDropdown
import { useFetchData } from '../../hooks/useFetchData';

const AllClientsPage = () => {
  const [page, setpage] = useState(1);
  const [limit] = useState(10);
  const { clients, sites, loading, error } = useFetchData(page, limit);
  const [filteredClients, setFilteredClients] = useState(clients); // Store filtered clients
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null); // Track selected client

  useEffect(() => {
    // Initialize the filtered clients with all clients on the first load
    if (clients) {
      setFilteredClients(clients);
    }
  }, [clients]);

  // Handle client change in the dropdown
  const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClientId = event.target.value;
    setSelectedClientId(selectedClientId);

    // Filter clients by selected clientId
    if (selectedClientId) {
      const filtered = clients.filter(
        (client) => client.id === selectedClientId,
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients(clients); // Show all clients if no filter is applied
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="all-clients-page">
      <h1>All Clients</h1>

      {/* Client Dropdown */}
      <ClientDropdown
        clients={clients}
        selectedClientId={selectedClientId}
        handleClientChange={handleClientChange}
      />

      {/* Use ClientList component to display clients and their sites */}
      <ClientList clients={filteredClients} sites={sites} />
    </div>
  );
};

export default AllClientsPage;
