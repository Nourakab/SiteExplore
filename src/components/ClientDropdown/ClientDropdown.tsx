import React from 'react';
import { Client } from '../../types/Client';
import './ClientDropdown.css';

interface ClientDropdownProps {
  clients: Client[];
  selectedClientId: string | null;
  handleClientChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ClientDropdown = ({
  clients,
  selectedClientId,
  handleClientChange,
}: ClientDropdownProps) => {
  return (
    <select
      className="client-dropdown-select"
      value={selectedClientId || ''}
      onChange={handleClientChange}
    >
      <option value="" disabled>
        Choose a client
      </option>
      {clients.map((client) => (
        <option key={client.id} value={client.id}>
          {client.givenName}
        </option>
      ))}
    </select>
  );
};

export default ClientDropdown;
