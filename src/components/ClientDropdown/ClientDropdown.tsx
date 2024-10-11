import React, { useState, useEffect, useRef } from 'react';
import { Client } from '../../types/Client';
import './ClientDropdown.css';
import '../../styles/DropdownSharedStyles.css';

interface ClientDropdownProps {
  clients: Client[];
  selectedClientId: string | null;
  handleClientChange: (id: string | null) => void;
}

const ClientDropdown = ({
  clients,
  selectedClientId,
  handleClientChange,
}: ClientDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedClient = clients.find(
    (client) => client.id === selectedClientId,
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectClient = (id: string | null) => {
    handleClientChange(id);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks on the document
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="dropdown-button">
        {selectedClient ? selectedClient.givenName : 'Choose a client'}
      </button>

      {isOpen && (
        <ul className="dropdown-menu">
          {clients.map((client) => (
            <li
              key={client.id}
              onClick={() => selectClient(client.id)}
              className={`dropdown-item ${
                selectedClientId === client.id ? 'selected' : ''
              }`}
            >
              {client.givenName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientDropdown;
