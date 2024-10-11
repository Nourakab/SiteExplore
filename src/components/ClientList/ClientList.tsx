import React from 'react';
import ListView from '../ListView';
import { Client } from '../../types/Client';
import { Site } from '../../types/Site';
import './ClientList.css';

interface ClientListProps {
  clients: Client[];
  sites: Site[];
}

const ClientList = ({ clients, sites }: ClientListProps) => {
  return (
    <ul className="client-list">
      {clients.map((client) => {
        const clientSites = sites.filter((site) => site.clientId === client.id);

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
  );
};

export default ClientList;
