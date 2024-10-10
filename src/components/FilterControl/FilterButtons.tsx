import React from 'react';

interface FilterButtonsProps {
  onCancel: () => void;
  onApply: () => void;
}

function FilterButtons({ onCancel, onApply }: FilterButtonsProps) {
  return (
    <div className="filter-buttons">
      <button onClick={onCancel} className="cancel-button">
        Clear Filters
      </button>
      <button onClick={onApply} className="apply-button">
        Apply Filters
      </button>
    </div>
  );
}

export default FilterButtons;
