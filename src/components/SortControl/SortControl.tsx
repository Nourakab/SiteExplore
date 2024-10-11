import React, { useState, useEffect, useRef } from 'react';
import { BiSortDown, BiSortUp } from 'react-icons/bi';
import './SortControl.css';
import '../../styles/DropdownSharedStyles.css';

interface SortControlProps {
  fields: { label: string; value: string }[];
  selectedField: string;
  order: 'asc' | 'desc';
  onSortChange: (field: string, order: 'asc' | 'desc') => void;
}

const SortControl = ({
  fields,
  selectedField,
  order,
  onSortChange,
}: SortControlProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleOrder = () => {
    const newOrder = order === 'asc' ? 'desc' : 'asc';
    onSortChange(selectedField, newOrder);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="sort-control" ref={menuRef}>
      <button onClick={toggleMenu} className="sort-toggle">
        Sort by: {fields.find((field) => field.value === selectedField)?.label}
      </button>

      {isMenuOpen && (
        <div className="sort-menu">
          {fields.map((field) => (
            <div
              key={field.value}
              className={`sort-option ${
                field.value === selectedField ? 'selected' : ''
              }`}
              onClick={() => {
                onSortChange(field.value, order);
                setIsMenuOpen(false);
              }}
            >
              {field.label}
            </div>
          ))}
        </div>
      )}

      <button onClick={toggleOrder} className="order-toggle">
        {order === 'asc' ? <BiSortUp /> : <BiSortDown />}
      </button>
    </div>
  );
};

export default SortControl;
