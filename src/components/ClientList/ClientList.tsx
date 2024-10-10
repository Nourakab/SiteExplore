import React from 'react';
import ListView from '../ListView/ListView';
import SortControl from '../SortControl';
import { useSort } from '../../hooks/useSort';
import { Client } from '../../types/Client';
import { Site } from '../../types/Site';
import './ClientList.css';

interface ClientListProps {
  clients: Client[];
  sites: Site[];
}

const ClientList = ({ clients, sites }: ClientListProps) => {
  const {
    sortedItems: sortedClients,
    selectedField,
    order,
    handleSortChange,
  } = useSort(clients, 'givenName', 'asc');

  return (
    <div>
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
      <ul className="client-list">
        {sortedClients.map((client) => {
          const clientSites = sites.filter(
            (site) => site.clientId === client.id,
          );

          return (
            <li key={client.id} className="client-list-item">
              <div className="client-header">
                <img
                  src={client.logo}
                  alt={`${client.givenName} logo`}
                  className="client-logo"
                />
                <h2>{client.givenName}</h2>
              </div>
              {clientSites.length > 0 ? (
                <ListView sites={clientSites} />
              ) : (
                <p>No sites available for this client.</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ClientList;
