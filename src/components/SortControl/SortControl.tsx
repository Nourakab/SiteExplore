import React from 'react';
import { BiSortDown, BiSortUp } from 'react-icons/bi';
import './SortControl.css';

interface SortControlProps {
  fields: { label: string; value: string }[]; // Array of sorting fields
  selectedField: string;
  order: 'asc' | 'desc'; // Sorting order
  onSortChange: (field: string, order: 'asc' | 'desc') => void; // Callback for sorting change
}

const SortControl = ({
  fields,
  selectedField,
  order,
  onSortChange,
}: SortControlProps) => {
  // Toggles the sorting order between ascending and descending
  const toggleOrder = () => {
    const newOrder = order === 'asc' ? 'desc' : 'asc';
    onSortChange(selectedField, newOrder);
  };

  return (
    <div className="sort-control">
      <label htmlFor="sort-field">Sort by:</label>
      <select
        id="sort-field"
        value={selectedField}
        onChange={(e) => {
          onSortChange(e.target.value, order);
        }}
      >
        {fields.map((field) => (
          <option key={field.value} value={field.value}>
            {field.label}
          </option>
        ))}
      </select>

      {/* Sort toggle button with icons */}
      <button onClick={toggleOrder}>
        {order === 'asc' ? <BiSortUp /> : <BiSortDown />}
      </button>
    </div>
  );
};

export default SortControl;
