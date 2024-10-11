import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientList from '../../components/ClientList';
import ClientDropdown from '../../components/ClientDropdown';
import SortControl from '../../components/SortControl';
import { useFetchData } from '../../hooks/useFetchData';
import { Client } from '../../types/Client';
import '../../styles/BackButtonSharedStyles.css';
import './AllClientsPage.css';

const AllClientsPage = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { clients, sites, loading, error } = useFetchData(page, limit);
  const [filteredClients, setFilteredClients] = useState(clients);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedField, setSelectedField] = useState('givenName');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();

  useEffect(() => {
    if (clients) {
      setFilteredClients(clients);
    }
  }, [clients]);

  const handleClientChange = (clientId: string | null) => {
    setSelectedClientId(clientId);
    if (clientId) {
      const filtered = clients.filter((client) => client.id === clientId);
      setFilteredClients(filtered);
    } else {
      setFilteredClients(clients);
    }
  };

  const handleSortChange = (field: string, newOrder: 'asc' | 'desc') => {
    setSelectedField(field);
    setOrder(newOrder);

    const sorted = [...filteredClients].sort((a, b) => {
      const aValue = a[field as keyof Client];
      const bValue = b[field as keyof Client];
      if (aValue < bValue) return newOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return newOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredClients(sorted);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="all-clients-page">
      <button onClick={() => navigate('/')} className="back-home-button">
        ← Back to Home
      </button>
      <h1>All Clients</h1>

      <div className="controls-container">
        <ClientDropdown
          clients={clients}
          selectedClientId={selectedClientId}
          handleClientChange={handleClientChange}
        />
        <SortControl
          fields={[
            { label: 'Name', value: 'givenName' },
            { label: 'Created At', value: 'createdAt' },
            { label: 'Updated At', value: 'updatedAt' },
          ]}
          selectedField={selectedField}
          order={order}
          onSortChange={handleSortChange}
        />
      </div>

      <ClientList clients={filteredClients} sites={sites} />
    </div>
  );
};

export default AllClientsPage;
